// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubChatServiceClient } = require("@azure/web-pubsub-chat");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to create, get, and delete a chat room.
 *
 * @summary manage chat rooms.
 */
async function manageRooms() {
  const endpoint = process.env.WPS_CHAT_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const hub = process.env.WPS_CHAT_HUB || "";
  const client = new WebPubSubChatServiceClient(endpoint, credential, hub);

  // Create or replace a room
  const roomId = "sample-room";
  const room = await client.createOrReplaceRoom(roomId, { title: "General Chat" });
  console.log(`Created room: ${room.id}, title: ${room.title}`);
  console.log(`Default conversation: ${room.defaultConversation}`);

  // Get a room by ID
  const fetchedRoom = await client.getRoom(roomId);
  console.log(`Fetched room: ${fetchedRoom.id}, title: ${fetchedRoom.title}`);

  // Delete the room
  await client.deleteRoom(roomId);
  console.log(`Deleted room: ${roomId}`);
}

async function main() {
  await manageRooms();
}

main().catch(console.error);
