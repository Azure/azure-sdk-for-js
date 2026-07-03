// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create, get, and delete a user profile.
 *
 * @summary manage chat users.
 */
async function manageUsers(): Promise<void> {
  const endpoint = "<endpoint>";
  const credential = new DefaultAzureCredential();
  const hub = "chat-hub";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);

  // Create or replace a user (HumanChatUser)
  const userId = "user1";
  const user = await client.createOrReplaceUser(userId, {
    kind: "Human",
    nickname: "Alice",
    roleName: "user.default",
  });
  console.log(`Created user: ${user.id}, nickname: ${user.nickname}, kind: ${user.kind}`);

  // Get a user by ID
  const fetchedUser = await client.getUser(userId);
  console.log(`Fetched user: ${fetchedUser.id}, nickname: ${fetchedUser.nickname}`);

  // Delete the user
  await client.deleteUser(userId);
  console.log(`Deleted user: ${userId}`);
}

async function main(): Promise<void> {
  await manageUsers();
}

main().catch(console.error);
