// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send a video message
 */

import { AzureKeyCredential } from "@azure/core-auth";
import NotificationClient, { isUnexpected } from "@azure-rest/communication-messages";
// Load the .env file if it exists
import "dotenv/config";

async function main(): Promise<void> {
  const credential = new AzureKeyCredential(process.env.ACS_ACCESS_KEY || "");
  const endpoint = process.env.ACS_URL || "";
  const client = NotificationClient(endpoint, credential);
  console.log("Sending message...");
  const result = await client.path("/messages/notifications:send").post({
    contentType: "application/json",
    body: {
      channelRegistrationId: process.env.CHANNEL_ID || "",
      to: [process.env.RECIPIENT_PHONE_NUMBER || ""],
      kind: "video",
      mediaUri: "https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4",
      caption: "happy time!!",
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
