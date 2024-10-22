// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 * @summary Use AAD token credentials when sending a whatsapp template message.
 */

import { isNode } from "@azure/core-util";
import { ClientSecretCredential, DefaultAzureCredential, TokenCredential } from "@azure/identity";
import NotificationClient, { 
    Send202Response,
    MessageTemplate,
    MessageTemplateValue,
    MessageTemplateBindings,
} from "@azure-rest/communication-messages";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
    // You will need to set this environment variable or edit the following values
    const endpoint = process.env.ACS_URL || "";

    // Azure AD Credential information is required to run this sample:
    if (
        !process.env.AZURE_TENANT_ID || 
        !process.env.AZURE_CLIENT_ID || 
        !process.env.AZURE_CLIENT_SECRET
    ) {
        console.error("Azure AD authentication information not provided, but it is required to run this sample. Exiting.");
        return;
    }

    // get credentials
    const credential: TokenCredential = isNode ? new DefaultAzureCredential() 
    : new ClientSecretCredential(
        process.env.AZURE_TENANT_ID,
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        );

    const client = NotificationClient(endpoint, credential);

    const DaysTemplateValue:MessageTemplateValue = {
        kind: "text",
        name: "Days",
        text: "5"
    };

    const templateBindings:MessageTemplateBindings = {
        kind: "whatsApp",
        body: [
            {
                refValue: "Days"
            }
        ]
    };

    const template:MessageTemplate = {
        name: "sample_shipping_confirmation",
        language: "en_US",
        bindings: templateBindings,
        values: [DaysTemplateValue]
    };

    const  result = await client.path("/messages/notifications:send").post({
        contentType: "application/json",
        body: {
            channelRegistrationId: process.env.CHANNEL_ID || "",
            to: [process.env.RECIPIENT_PHONE_NUMBER || ""],
            kind: "template",
            template: template
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
