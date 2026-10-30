// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * Retrieve an existing topic and its entity tag.
 * @summary Get a room topic.
 */
async function main() {
  const endpoint = process.env.WPS_CHAT_ENDPOINT;
  const hub = process.env.WPS_CHAT_HUB;
  const roomId = "general";
  const topicId = "announcements";
  if (!endpoint || !hub) {
    throw new Error("Set WPS_CHAT_ENDPOINT and WPS_CHAT_HUB.");
  }
  const client = new WebPubSubChatServiceClient(endpoint, new DefaultAzureCredential(), hub);
  const topic = await client.getTopic(roomId, topicId);
  console.log(
    `${topic.title}: ${topic.state}, conversation: ${topic.conversationId}, ETag: ${topic.etag}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
