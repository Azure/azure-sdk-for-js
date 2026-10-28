// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get role information.
 *
 * @summary get role information.
 * x-ms-original-file: 2026-02-01-preview/GetRole.json
 */
async function getRole(): Promise<void> {
  const endpoint = process.env.WPS_CHAT_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WPS_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  const result = await client.getRole("room.operator");
  console.log(result);
}

async function main(): Promise<void> {
  await getRole();
}

main().catch(console.error);
