import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // Make sure fetch is available in your Node.js environment
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";

dotenv.config();
const __dirname = path.resolve();


const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

class LangflowClient {
    constructor(baseURL, applicationToken) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }

    async post(endpoint, body, headers = {"Content-Type": "application/json"}) {
        headers["Authorization"] = `Bearer ${this.applicationToken}`;
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            const responseMessage = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
            }
            return responseMessage;
        } catch (error) {
            console.error('Request Error:', error.message);
            throw error;
        }
    }

    async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
    }

    handleStream(streamUrl, onUpdate, onClose, onError) {
        const eventSource = new EventSource(streamUrl);

        eventSource.onmessage = event => {
            const data = JSON.parse(event.data);
            onUpdate(data);
        };

        eventSource.onerror = event => {
            console.error('Stream Error:', event);
            onError(event);
            eventSource.close();
        };

        eventSource.addEventListener("close", () => {
            onClose('Stream closed');
            eventSource.close();
        });

        return eventSource;
    }

    async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false, onUpdate, onClose, onError) {
        try {
            const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
            // console.log('Init Response:', initResponse);
            if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
                const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
                // console.log(`Streaming from: ${streamUrl}`);
                this.handleStream(streamUrl, onUpdate, onClose, onError);
            }
            return initResponse;
        } catch (error) {
            console.error('Error running flow:', error);
            onError('Error initiating session');
        }
    }
}

// Express server setup
const port = 5000;
const applicationToken = process.env.LANGCHAIN_TOKEN ; 
const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Define the POST route to handle the LangFlow interaction
app.post('/chat', async (req, res) => {
    const { query, stream } = req.body;
    
    if (!query) {
        return res.status(400).send({ error: 'Query is required' });
    }

    try {
        const flowIdOrName = 'b9e142b6-2031-40ac-a12c-f22fd3680bf0';
        const langflowId = '1dbdd9dc-9e1d-411e-a9aa-3eb891276039';

        const tweaks = {
            "Prompt-NxzqU": {},
            "AstraDBToolComponent-MUCwM": {},
            "Agent-ocJVl": {},
            "ChatOutput-cO64w": {},
            "TextOutput-rIwnV": {},
            "ParseData-7zfn2": {},
            "TextInput-S4PT9": {},
            "ChatInput-VMlW5": {}
        };

        const response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            query, // inputValue
            'chat', // inputType
            'chat', // outputType
            tweaks,
            stream === 'true', // stream should be true/false
            (data) => {
                // console.log('Stream update:', data.chunk);
                res.write(JSON.stringify(data.chunk)); // streaming output
            },
            (message) => {
                // console.log('Stream closed:', message);
                res.end(); // close response after stream
            },
            (error) => {
                console.log('Stream error:', error);
                res.status(500).send({ error: 'Stream error' });
            }
        );
        // console.log(response.outputs[0].outputs); 
        res.send(response.outputs[0].outputs);
        // if (!stream && response && response.outputs) {
        //     const flowOutputs = response.outputs[0];
        //     const firstComponentOutputs = flowOutputs.outputs[0];
        //     const output = firstComponentOutputs.outputs.message;
        //     res.json({ message: output.message.text });
        // }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Error during processing' });
    }
});


if (process.env.NODE_ENV === "production"){
    console.log(process.env.NODE_ENV);
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
