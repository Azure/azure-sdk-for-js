// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * Soft delete an existing topic. Subsequent get requests return HTTP 404.
 * @summary Soft delete a room topic.
 */
async function main(): Promise<void> {
  const endpoint = process.env.WPS_CHAT_ENDPOINT;
  const hub = process.env.WPS_CHAT_HUB;
  const roomId = "general";
  const topicId = "announcements";
  if (!endpoint || !hub) {
    throw new Error("Set WPS_CHAT_ENDPOINT and WPS_CHAT_HUB.");
  }
  const client = new WebPubSubChatServiceClient(endpoint, new DefaultAzureCredential(), hub);
  await client.deleteTopic(roomId, topicId);
  console.log(`Soft deleted topic ${topicId}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
