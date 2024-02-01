import NotificationClient from "../src/generated/src";
import { AzureKeyCredential } from "@azure/core-auth";
import { MessagesServiceClient, Send202Response } from "../src/generated/src";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const credential = new AzureKeyCredential(process.env["ACS_ACCESS_KEY"] || "");
    const endpoint = process.env["ACS_URL"] || "";
    const client:MessagesServiceClient = NotificationClient(endpoint, credential);
    console.log("Sending message...");
    const  result = await client.path("/messages/notifications:send").post({
        contentType: "application/json",
        body: {
            channelRegistrationId: "<CHANNEl_ID>",
            to: ["<PHONE_NUMBER>"],
            kind: "image",
            mediaUri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        }
    });

    console.log("Response: " + JSON.stringify(result, null, 2));

    if (result.status === "202") {
        const response:Send202Response = result as Send202Response;
        response.body.receipts.forEach((receipt) => {
            console.log("Message sent to:"+receipt.to+" with message id:"+receipt.messageId);
        });
    } else {
        throw new Error("Failed to send message");
    }

}

main().catch((error) => {
    console.error("Encountered an error while sending message: ", error);
    process.exit(1);
});
