import { 
    AzureCommunicationMessagesServiceClient,
} from "../src";
import NotificationClient from "../src";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const credential = new AzureKeyCredential(process.env["ACS_ACCESS_KEY"] || "");
    const endpoint = process.env["ACS_URL"] || "";
    const client:AzureCommunicationMessagesServiceClient = NotificationClient(endpoint, credential);
    console.log("Downloading...");
    await client.path("/messages/streams/{id}", "<MEDIA_ID>").get()
    .asNodeStream().then((resp) => {
        resp.body?.pipe(fs.createWriteStream("downloadedMedia.jpeg"));
        return;
    });
}

main().catch((error) => {
    console.error("Encountered an error while sending message: ", error);
    process.exit(1);
});