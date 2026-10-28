// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * List user profiles in a Chat-enabled hub.
 * @summary List users in a hub.
 */
async function main(): Promise<void> {
  const endpoint = process.env.WPS_CHAT_ENDPOINT;
  const hub = process.env.WPS_CHAT_HUB;
  if (!endpoint || !hub) {
    throw new Error("Set WPS_CHAT_ENDPOINT and WPS_CHAT_HUB.");
  }
  const client = new WebPubSubChatServiceClient(endpoint, new DefaultAzureCredential(), hub);
  for await (const user of client.listUsers({ maxPageSize: 10 })) {
    console.log(`${user.id}: ${user.nickname} (${user.kind})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
