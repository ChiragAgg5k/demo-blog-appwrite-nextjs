import { env } from "@/lib/env";
import { Account, Client, Databases } from "appwrite";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1");
client.setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const database = new Databases(client);

export { account, database };
