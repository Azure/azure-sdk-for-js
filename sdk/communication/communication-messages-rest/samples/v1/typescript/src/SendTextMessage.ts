// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send a text message
 */


import NotificationClient, { Send202Response } from "@azure-rest/communication-messages";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const connectionString = process.env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING || "";
    const client = NotificationClient(connectionString);
    console.log("Sending message...");
    const  result = await client.path("/messages/notifications:send").post({
        contentType: "application/json",
        body: {
            channelRegistrationId: process.env.CHANNEL_ID || "",
            to: [process.env.RECIPIENT_PHONE_NUMBER || ""],
            kind: "text",
            content: "Arif The Great!!!"
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
