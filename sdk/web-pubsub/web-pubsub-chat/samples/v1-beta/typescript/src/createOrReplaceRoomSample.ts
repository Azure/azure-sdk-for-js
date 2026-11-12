// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or replace a room with a client-specified ID.
 *
 * @summary create or replace a room with a client-specified ID.
 * x-ms-original-file: 2026-02-01-preview/CreateOrReplaceRoom.json
 */
async function createOrReplaceRoom(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  const result = await client.createOrReplaceRoom("room1", { title: "General Chat" });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceRoom();
}

main().catch(console.error);
