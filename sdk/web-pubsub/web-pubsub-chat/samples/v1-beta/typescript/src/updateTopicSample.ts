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
  const endpoint = process.env.WPS_CHAT_ENDPOINT;
  const hub = process.env.WPS_CHAT_HUB;
  const roomId = "general";
  const topicId = "announcements";
  if (!endpoint || !hub) {
    throw new Error("Set WPS_CHAT_ENDPOINT and WPS_CHAT_HUB.");
  }
  const client = new WebPubSubChatServiceClient(endpoint, new DefaultAzureCredential(), hub);
  const topic = await client.updateTopic(roomId, topicId, { state: KnownChatTopicState.Archived });
  console.log(`${topic.title}: ${topic.state}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
