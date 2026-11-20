// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a role.
 *
 * @summary delete a role.
 * x-ms-original-file: 2026-02-01-preview/DeleteRole.json
 */
async function deleteRole() {
  const endpoint = process.env.WPS_CHAT_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WPS_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  await client.deleteRole("room.moderator");
}

async function main() {
  await deleteRole();
}

main().catch(console.error);
