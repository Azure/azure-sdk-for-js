import NotificationClient from "../src";
import { KeyCredential, AzureKeyCredential } from "@azure/core-auth";
import { 
    AzureCommunicationMessagesServiceClient,
    Send202Response,
    MessageTemplate,
    MessageTemplateValue,
    MessageTemplateBindings,
} from "../src";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const credential = new AzureKeyCredential(process.env["ACS_ACCESS_KEY"] || "");
    const endpoint = process.env["ACS_URL"] || "";
    const client:AzureCommunicationMessagesServiceClient = NotificationClient(endpoint, credential);

    const nameValue:MessageTemplateValue = {
        kind: "text",
        name: "name",
        text: "Arif"
    };

    const yesAction: MessageTemplateValue = {
        kind: "quickAction",
        name: "Yes",
        payload: "Yes"
    };

    const noAction: MessageTemplateValue = {
        kind: "quickAction",
        name: "No",
        payload: "No"
    };

    const templateBindings:MessageTemplateBindings = {
        kind: "whatsApp",
        body: [
            {
                refValue: "name"
            }
        ],
        buttons: [
            {
                subType: "quickReply",
                refValue: "Yes"
            },
            {
                subType: "quickReply",
                refValue: "No"
            }
        ]
    };

    const template:MessageTemplate = {
        name: "cpmupdateproduct",
        language: "en_US",
        bindings: templateBindings,
        values: [nameValue, yesAction, noAction]
    };

    console.log("Sending message...");
    const  result = await client.path("/messages/notifications:send").post({
        contentType: "application/json",
        body: {
            channelRegistrationId: "<CHANNEl_ID>",
            to: ["<PHONE_NUMBER>"],
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
