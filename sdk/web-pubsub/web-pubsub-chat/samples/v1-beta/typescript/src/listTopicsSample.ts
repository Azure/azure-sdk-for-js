// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * List topics in an existing room.
 * @summary List room topics.
 */
async function main(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT;
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB;
  const roomId = process.env.WEB_PUB_SUB_CHAT_ROOM_ID;
  if (!endpoint || !hub || !roomId) {
    throw new Error(
      "Set WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT, WEB_PUB_SUB_CHAT_HUB, and WEB_PUB_SUB_CHAT_ROOM_ID.",
    );
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
