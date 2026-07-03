// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChatPermissions, WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create, get, list, and delete chat roles.
 *
 * @summary manage chat roles.
 */
async function manageRoles(): Promise<void> {
  const endpoint = "<endpoint>";
  const credential = new DefaultAzureCredential();
  const hub = "chat-hub";
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

async function main(): Promise<void> {
  await manageRoles();
}

main().catch(console.error);
