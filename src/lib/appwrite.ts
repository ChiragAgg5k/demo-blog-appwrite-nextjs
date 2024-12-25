import { env } from "@/lib/env";
import { Account, Client, Databases } from "appwrite";
import { APPWRITE_CLOUD_ENDPOINT } from "./constants";
const client = new Client();

client.setEndpoint(APPWRITE_CLOUD_ENDPOINT);
client.setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const database = new Databases(client);

export { account, database };
