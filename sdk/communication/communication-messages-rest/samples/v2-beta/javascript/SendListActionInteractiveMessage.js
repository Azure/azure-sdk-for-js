// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send a interactive message
 */

const { AzureKeyCredential } = require("@azure/core-auth");
const NotificationClient = require("@azure-rest/communication-messages").default,
  { isUnexpected } = require("@azure-rest/communication-messages");
// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const credential = new AzureKeyCredential(process.env.ACS_ACCESS_KEY || "");
  const endpoint = process.env.ACS_URL || "";
  const client = NotificationClient(endpoint, credential);

  const interactiveMessage = {
    body: {
      kind: "text",
      text: "Do you want to proceed?",
    },
    action: {
      kind: "whatsAppListAction",
      content: {
        kind: "group",
        title: "Shipping Options",
        groups: [
          {
            title: "Express Delivery",
            items: [
              {
                id: "priority_mail_express",
                title: "Priority Mail Express",
                description: "Delivered on same day!",
              },
              {
                id: "priority_mail",
                title: "Priority Mail",
                description: "Delivered in 1-2 days",
              },
            ],
          },
          {
            title: "Normal Delivery",
            items: [
              {
                id: "usps_ground_advantage",
                title: "USPS Ground Advantage",
                description: "Delivered in 2-5 days",
              },
              {
                id: "usps_mail",
                title: "Normal Mail",
                description: "Delivered in 5-8 days",
              },
            ],
          },
        ],
      },
    },
  };

  console.log("Sending message...");
  const result = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
      channelRegistrationId: process.env.CHANNEL_ID || "",
      to: [process.env.RECIPIENT_PHONE_NUMBER || ""],
      kind: "interactive",
      interactiveMessage: interactiveMessage,
    },
  });

  console.log("Response: " + JSON.stringify(result, null, 2));

  if (isUnexpected(result)) {
    throw new Error("Failed to send message");
  }

  const response = result;
  response.body.receipts.forEach((receipt) => {
    console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
  });
}

main().catch((error) => {
  console.error("Encountered an error while sending message: ", error);
  throw error;
});
