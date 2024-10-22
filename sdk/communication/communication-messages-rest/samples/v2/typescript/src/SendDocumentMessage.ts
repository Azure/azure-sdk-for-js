// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send a document message
 */

import { AzureKeyCredential } from "@azure/core-auth";
import NotificationClient, { isUnexpected, Send202Response } from "@azure-rest/communication-messages";
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main(): Promise<void> {
    const credential = new AzureKeyCredential(process.env.ACS_ACCESS_KEY || "");
    const endpoint = process.env.ACS_URL || "";
    const client = NotificationClient(endpoint, credential);
    console.log("Sending message...");
    const  result = await client.path("/messages/notifications:send").post({
        contentType: "application/json",
        body: {
            channelRegistrationId: process.env.CHANNEL_ID || "",
            to: [process.env.RECIPIENT_PHONE_NUMBER || ""],
            kind: "document",
            mediaUri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            caption: "important!!"
        }
    });

    console.log("Response: " + JSON.stringify(result, null, 2));

    if(isUnexpected(result)) {
        throw new Error("Failed to send message");
    }

    const response:Send202Response = result as Send202Response;
    response.body.receipts.forEach((receipt) => {
        console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
    });

}

main().catch((error) => {
    console.error("Encountered an error while sending message: ", error);
    throw error;
});
