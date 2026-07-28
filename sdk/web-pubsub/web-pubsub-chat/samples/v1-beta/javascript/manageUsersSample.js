// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChatRoles, WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to create, get, and delete a user profile.
 *
 * @summary manage chat users.
 */
async function manageUsers() {
  const endpoint = process.env.WPS_CHAT_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WPS_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);

  // Create or replace a user (HumanChatUser)
  const userId = "user1";
  const user = await client.createOrReplaceUser(userId, {
    kind: "Human",
    nickname: "Alice",
    roleName: ChatRoles.UserNormal,
  });
  console.log(`Created user: ${user.id}, nickname: ${user.nickname}, kind: ${user.kind}`);

  // Get a user by ID
  const fetchedUser = await client.getUser(userId);
  console.log(`Fetched user: ${fetchedUser.id}, nickname: ${fetchedUser.nickname}`);

  // Delete the user
  await client.deleteUser(userId);
  console.log(`Deleted user: ${userId}`);
}

async function main() {
  await manageUsers();
}

main().catch(console.error);
