// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a room.
 *
 * @summary delete a room.
 * x-ms-original-file: 2026-02-01-preview/DeleteRoom.json
 */
async function deleteRoom() {
  const endpoint = process.env.WPS_CHAT_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WPS_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  await client.deleteRoom("room1");
}

async function main() {
  await deleteRoom();
}

main().catch(console.error);
