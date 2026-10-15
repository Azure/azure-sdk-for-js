// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * List rooms associated with an existing user, one page at a time.
 * @summary List a user's rooms with pagination.
 */
async function main() {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT;
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB;
  const userId = process.env.WEB_PUB_SUB_CHAT_USER_ID;
  if (!endpoint || !hub || !userId) {
    throw new Error(
      "Set WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT, WEB_PUB_SUB_CHAT_HUB, and WEB_PUB_SUB_CHAT_USER_ID.",
    );
  }
  const client = new WebPubSubChatServiceClient(endpoint, new DefaultAzureCredential(), hub);
  for await (const page of client.listRoomsForUser(userId, { maxPageSize: 10 }).byPage()) {
    for (const room of page) {
      console.log(`${room.id}: ${room.title}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
