import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";

dotenv.config();

const { ASTRA_DB_TOKEN } = process.env;


const client = new DataAPIClient(ASTRA_DB_TOKEN);
const db = client.db("https://e2b06105-c13d-4bd5-8207-667797ddd180-us-east-2.apps.astra.datastax.com");
const User = db.collection("users");

export default User;


