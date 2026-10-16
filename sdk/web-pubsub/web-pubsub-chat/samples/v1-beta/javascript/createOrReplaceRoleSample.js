// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or replace a role.
 *
 * @summary create or replace a role.
 * x-ms-original-file: 2026-02-01-preview/CreateOrReplaceRole.json
 */
async function createOrReplaceRole() {
  const endpoint = process.env.WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WEB_PUB_SUB_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  const result = await client.createOrReplaceRole("room.moderator", {
    permissions: ["room.history", "room.remove_user", "room.publish_message"],
  });
  console.log(result);
}

async function main() {
  await createOrReplaceRole();
}

main().catch(console.error);
