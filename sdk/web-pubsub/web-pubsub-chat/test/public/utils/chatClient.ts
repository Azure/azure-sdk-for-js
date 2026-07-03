// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Connects a Chat client via WebSocket and sends a text message to a room.
 * The service persists the message, making it available via the REST
 * `listMessages` / `updateMessage` / `deleteMessage` APIs.
 *
 * Uses dynamic import so playback-mode tests never load the WebSocket
 * dependency.
 */
export async function createChatMessage(
  clientAccessUrl: string,
  roomId: string,
  content: string,
): Promise<void> {
  const { ChatClient } = await import("@azure/web-pubsub-chat-client");
  const chatClient = await ChatClient.start(clientAccessUrl);
  try {
    await chatClient.sendToRoom(roomId, content);
  } finally {
    chatClient.stop();
  }
}
