// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * List rooms in a Chat-enabled hub using asynchronous iteration.
 * @summary List rooms in a hub.
 */
async function main(): Promise<void> {
  const endpoint = process.env.WPS_CHAT_ENDPOINT;
  const hub = process.env.WPS_CHAT_HUB;
  if (!endpoint || !hub) {
    throw new Error("Set WPS_CHAT_ENDPOINT and WPS_CHAT_HUB.");
  }
  const client = new WebPubSubChatServiceClient(endpoint, new DefaultAzureCredential(), hub);
  for await (const room of client.listRooms({ maxPageSize: 10 })) {
    console.log(`${room.id}: ${room.title}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
