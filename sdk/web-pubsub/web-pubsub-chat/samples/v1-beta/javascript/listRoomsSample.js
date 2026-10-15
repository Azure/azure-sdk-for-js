// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * List rooms in a Chat-enabled hub using asynchronous iteration.
 * @summary List rooms in a hub.
 */
async function main() {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT;
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB;
  if (!endpoint || !hub) {
    throw new Error("Set WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT and WEB_PUB_SUB_CHAT_HUB.");
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
