// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * Soft delete an existing topic. Subsequent get requests return HTTP 404.
 * @summary Soft delete a room topic.
 */
async function main() {
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
  await client.deleteTopic(roomId, topicId);
  console.log(`Soft deleted topic ${topicId}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
