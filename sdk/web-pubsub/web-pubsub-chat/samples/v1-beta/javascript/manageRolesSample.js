// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChatPermissions, WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to create, get, list, and delete chat roles.
 *
 * @summary manage chat roles.
 */
async function manageRoles() {
  const endpoint = process.env.WPS_CHAT_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WPS_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);
  const roleName = "user.sample_member";

  try {
    const role = await client.createOrReplaceRole(roleName, {
      permissions: [ChatPermissions.UserCreateRoom, ChatPermissions.UserFetchAllRooms],
    });
    console.log(`Created role: ${role.name}`);

    const fetchedRole = await client.getRole(roleName);
    console.log(`Fetched role: ${fetchedRole.name}`);

    for await (const listedRole of client.listRoles()) {
      console.log(`Role: ${listedRole.name}`);
    }
  } finally {
    await client.deleteRole(roleName);
    console.log(`Deleted role: ${roleName}`);
  }
}

async function main() {
  await manageRoles();
}

main().catch(console.error);
