// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KnownChatTopicState, WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * Archive an existing topic without changing its title.
 * @summary Partially update a topic's state.
 */
async function main(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT;
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB;
  const roomId = process.env.WEB_PUB_SUB_CHAT_ROOM_ID;
  const topicId = process.env.WEB_PUB_SUB_CHAT_TOPIC_ID;
  if (!endpoint || !hub || !roomId || !topicId) {
    throw new Error(
      "Set WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT, WEB_PUB_SUB_CHAT_HUB, WEB_PUB_SUB_CHAT_ROOM_ID, and WEB_PUB_SUB_CHAT_TOPIC_ID.",
    );
  }
  const client = new WebPubSubChatServiceClient(endpoint, new DefaultAzureCredential(), hub);
  const topic = await client.updateTopic(roomId, topicId, { state: KnownChatTopicState.Archived });
  console.log(`${topic.title}: ${topic.state}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
