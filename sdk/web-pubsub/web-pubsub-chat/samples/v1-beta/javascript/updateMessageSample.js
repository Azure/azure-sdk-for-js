// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a message.
 *
 * @summary update a message.
 * x-ms-original-file: 2026-02-01-preview/UpdateMessage.json
 */
async function updateMessage() {
  const endpoint = process.env.WPS_CHAT_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WPS_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  const result = await client.updateMessage("c.room1.abcd1234", "123", {
    content: { text: "Updated message text" },
  });
  console.log(result);
}

async function main() {
  await updateMessage();
}

main().catch(console.error);
