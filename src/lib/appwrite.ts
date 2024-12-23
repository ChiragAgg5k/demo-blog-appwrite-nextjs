import { env } from "@/lib/env";
import { Account, Client } from "appwrite";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1");
client.setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

export default account;
