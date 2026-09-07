// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a message.
 *
 * @summary delete a message.
 * x-ms-original-file: 2026-02-01-preview/DeleteMessage.json
 */
async function deleteMessage() {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  await client.deleteMessage("c.room1.abcd1234", "123");
}

async function main() {
  await deleteMessage();
}

main().catch(console.error);
