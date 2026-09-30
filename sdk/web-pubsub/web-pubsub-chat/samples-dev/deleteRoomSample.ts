// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a room.
 *
 * @summary delete a room.
 * x-ms-original-file: 2026-02-01-preview/DeleteRoom.json
 */
async function deleteRoom(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  await client.deleteRoom("room1");
}

async function main(): Promise<void> {
  await deleteRoom();
}

main().catch(console.error);
