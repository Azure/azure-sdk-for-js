// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Node.js-only tests that verify realtime notification APIs throw appropriate errors.
 * These tests are excluded from browser test runs via vitest config.
 */

import type { ChatClient } from "../../../src/index.js";
import { createChatClient } from "../utils/mockClient.js";
import { describe, it, expect, beforeAll } from "vitest";

describe("[Mocked] ChatClient Realtime Notifications in Node", () => {
  let chatClient: ChatClient;
  const listener = (): void => {};

  beforeAll(() => {
    chatClient = createChatClient();
  });

  it("should throw an error to start real time notifications in node", async () => {
    await expect(chatClient.startRealtimeNotifications()).rejects.toThrow(
      "Realtime notifications are not supported in node js.",
    );
  });

  it("should throw an error to stop real time notifications in node", async () => {
    await expect(chatClient.stopRealtimeNotifications()).rejects.toThrow(
      "Realtime notifications are not supported in node js.",
    );
  });

  it("should throw an error to unsubscribe an event in node", () => {
    expect(() => chatClient.off("chatMessageReceived", listener)).toThrow(
      "Realtime notifications are only supported in the browser.",
    );
  });

  it("should throw an error to subscribe chatMessageReceived event in node", () => {
    expect(() => chatClient.on("chatMessageReceived", listener)).toThrow(
      "Realtime notifications are only supported in the browser.",
    );
  });

  it("should throw an error to subscribe chatMessageEdited event in node", () => {
    expect(() => chatClient.on("chatMessageEdited", listener)).toThrow(
      "Realtime notifications are only supported in the browser.",
    );
  });

  it("should throw an error to subscribe chatMessageDeleted event in node", () => {
    expect(() => chatClient.on("chatMessageDeleted", listener)).toThrow(
      "Realtime notifications are only supported in the browser.",
    );
  });

  it("should throw an error to subscribe typingIndicatorReceived event in node", () => {
    expect(() => chatClient.on("typingIndicatorReceived", listener)).toThrow(
      "Realtime notifications are only supported in the browser.",
    );
  });

  it("should throw an error to subscribe readReceiptReceived event in node", () => {
    expect(() => chatClient.on("readReceiptReceived", listener)).toThrow(
      "Realtime notifications are only supported in the browser.",
    );
  });

  it("should throw an error to subscribe chatThreadCreated event in node", () => {
    expect(() => chatClient.on("chatThreadCreated", listener)).toThrow(
      "Realtime notifications are only supported in the browser.",
    );
  });

  it("should throw an error to subscribe chatThreadDeleted event in node", () => {
    expect(() => chatClient.on("chatThreadDeleted", listener)).toThrow(
      "Realtime notifications are only supported in the browser.",
    );
  });

  it("should throw an error to subscribe chatThreadPropertiesUpdated event in node", () => {
    expect(() => chatClient.on("chatThreadPropertiesUpdated", listener)).toThrow(
      "Realtime notifications are only supported in the browser.",
    );
  });

  it("should throw an error to subscribe participantsAdded event in node", () => {
    expect(() => chatClient.on("participantsAdded", listener)).toThrow(
      "Realtime notifications are only supported in the browser.",
    );
  });

  it("should throw an error to subscribe participantsRemoved event in node", () => {
    expect(() => chatClient.on("participantsRemoved", listener)).toThrow(
      "Realtime notifications are only supported in the browser.",
    );
  });
});
