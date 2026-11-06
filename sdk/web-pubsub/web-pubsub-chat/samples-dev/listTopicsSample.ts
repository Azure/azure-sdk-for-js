// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * List topics in an existing room.
 * @summary List room topics.
 */
async function main(): Promise<void> {
  const endpoint = process.env.WPS_CHAT_ENDPOINT;
  const hub = process.env.WPS_CHAT_HUB;
  const roomId = "general";
  if (!endpoint || !hub) {
    throw new Error("Set WPS_CHAT_ENDPOINT and WPS_CHAT_HUB.");
  }
  const client = new WebPubSubChatServiceClient(endpoint, new DefaultAzureCredential(), hub);
  for await (const topic of client.listTopics(roomId, { maxPageSize: 10 })) {
    console.log(
      `${topic.id}: ${topic.title} (${topic.state}), conversation: ${topic.conversationId}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
