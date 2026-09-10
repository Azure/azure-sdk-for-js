// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Uses the separate `@azure/web-pubsub-chat-client` WebSocket client to seed a
 * message in the service for the current `@azure/web-pubsub-chat` package to
 * query, update, and delete through its REST APIs.
 *
 * Live and record modes call this helper because they reach the service.
 * Playback mode replays the recorded HTTP responses and does not need the
 * WebSocket operation, so the dynamic import avoids loading that dependency.
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
