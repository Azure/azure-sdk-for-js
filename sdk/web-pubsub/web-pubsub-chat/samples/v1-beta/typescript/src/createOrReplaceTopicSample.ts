// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * Create a topic in an existing room only if its identifier is not already used.
 * @summary Create a room topic with an ifNoneMatch precondition.
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
  const topic = await client.createOrReplaceTopic(
    roomId,
    topicId,
    { title: "Announcements" },
    { ifNoneMatch: "*" },
  );
  console.log(`Created ${topic.id}; conversation: ${topic.conversationId}, ETag: ${topic.etag}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
