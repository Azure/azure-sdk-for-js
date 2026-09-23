// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get conversation information.
 *
 * @summary get conversation information.
 * x-ms-original-file: 2026-02-01-preview/GetConversation.json
 */
async function getConversation(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  const result = await client.getConversation("c.room1.abcd1234");
  console.log(result);
}

async function main(): Promise<void> {
  await getConversation();
}

main().catch(console.error);
