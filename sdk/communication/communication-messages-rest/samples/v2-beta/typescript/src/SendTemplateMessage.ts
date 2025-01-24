// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send a template message
 */

import { AzureKeyCredential } from "@azure/core-auth";
import type {
  MessagesServiceClient,
  MessageTemplate,
  MessageTemplateValue,
  MessageTemplateBindings
} from "@azure-rest/communication-messages";
import NotificationClient, { isUnexpected } from "@azure-rest/communication-messages";

// Load the .env file if it exists
import "dotenv/config";

async function main(): Promise<void> {
  const credential = new AzureKeyCredential(process.env.ACS_ACCESS_KEY || "");
  const endpoint = process.env.ACS_URL || "";
  const client: MessagesServiceClient = NotificationClient(endpoint, credential);

  const nameValue: MessageTemplateValue = {
    kind: "text",
    name: "name",
    text: "Arif",
  };

  const yesAction: MessageTemplateValue = {
    kind: "quickAction",
    name: "Yes",
    payload: "Yes",
  };

  const noAction: MessageTemplateValue = {
    kind: "quickAction",
    name: "No",
    payload: "No",
  };

  const templateBindings: MessageTemplateBindings = {
    kind: "whatsApp",
    body: [
      {
        refValue: "name",
      },
    ],
    buttons: [
      {
        subType: "quickReply",
        refValue: "Yes",
      },
      {
        subType: "quickReply",
        refValue: "No",
      },
    ],
  };

  const template: MessageTemplate = {
    name: "sample_issue_resolution",
    language: "en_US",
    bindings: templateBindings,
    values: [nameValue, yesAction, noAction],
  };

  console.log("Sending message...");
  const result = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
      channelRegistrationId: process.env.CHANNEL_ID || "",
      to: [process.env.RECIPIENT_PHONE_NUMBER || ""],
      kind: "template",
      template: template,
    },
  });

  console.log("Response: " + JSON.stringify(result, null, 2));

  if (isUnexpected(result)) {
    throw new Error("Failed to send message");
  }

  await result.body.receipts.forEach((receipt) => {
        console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
      });
}

main().catch((error) => {
  console.error("Encountered an error while sending message: ", error);
  throw error;
});
