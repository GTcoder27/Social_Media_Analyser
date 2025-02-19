import axios from 'axios';

const API_URL = 'https://datadost.onrender.com';  // Your backend API URL

export const getLangchainResponse = async (inputValue) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { query: inputValue, stream: true });
    const data = response.data[0].results.message.text;
    // data = JSON.parse(data);
    return data;
  } catch (error) {
    console.error('Error fetching data from Langchain:', error);
    throw error;
  }
};
