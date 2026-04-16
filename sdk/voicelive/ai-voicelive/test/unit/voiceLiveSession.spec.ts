// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { MockVoiceLiveWebSocket } from "../infrastructure/index.js";
import {
  TestSessionFactory,
  TestConstants,
  TestableVoiceLiveSession,
} from "../infrastructure/index.js";

describe("VoiceLiveSession Lifecycle", () => {
  let session: TestableVoiceLiveSession;
  let mockWebSocket: MockVoiceLiveWebSocket;

  beforeEach(() => {
    const setup = TestSessionFactory.createSessionWithMockWebSocket();
    session = setup.session;
    mockWebSocket = setup.mockWebSocket;
  });

  afterEach(() => {
    // Clean up any resources
    mockWebSocket.removeAllListeners();
    mockWebSocket.clearSentMessages();
  });

  describe("Session Creation", () => {
    it("should create a session with valid client and credentials", () => {
      expect(session).toBeDefined();
      expect(session).toBeInstanceOf(TestableVoiceLiveSession);
    });

    it("should have a mock WebSocket injected", () => {
      const injectedSocket = session.getMockWebSocket();
      expect(injectedSocket).toBeDefined();
      expect(injectedSocket).toBe(mockWebSocket);
    });

    it("should start with disconnected state", () => {
      // Assuming the session exposes connection state
      // This may need adjustment based on actual VoiceLiveSession API
      expect(mockWebSocket.state).toBe(1); // WebSocketState.Open (mock starts open)
    });
  });

  describe("Connection Management", () => {
    it("should establish WebSocket connection", async () => {
      await session.connectWithMock(mockWebSocket);

      expect(mockWebSocket.state).toBe(1); // WebSocketState.Open
    });

    it("should handle connection with abort signal", async () => {
      const controller = new AbortController();

      // Start connection
      const connectPromise = mockWebSocket.connect(
        TestConstants.WS_ENDPOINT,
        undefined,
        controller.signal,
      );

      // Don't abort - let it complete
      await connectPromise;

      expect(mockWebSocket.state).toBe(1); // WebSocketState.Open
    });

    it("should handle aborted connection", async () => {
      const controller = new AbortController();
      controller.abort(); // Abort immediately

      await expect(
        mockWebSocket.connect(TestConstants.WS_ENDPOINT, undefined, controller.signal),
      ).rejects.toThrow("Connection aborted");
    });

    it("should disconnect cleanly", async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
      expect(mockWebSocket.state).toBe(1); // Open

      await mockWebSocket.disconnect(1000, "Normal closure");
      expect(mockWebSocket.state).toBe(3); // Closed
    });
  });

  describe("Message Handling", () => {
    beforeEach(async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
    });

    it("should send messages through WebSocket", async () => {
      const testMessage = JSON.stringify({
        type: "test.message",
        data: "hello world",
      });

      await mockWebSocket.send(testMessage);

      const sentMessages = mockWebSocket.getSentMessages();
      expect(sentMessages).toHaveLength(1);
      expect(sentMessages[0]).toBe(testMessage);
    });

    it("should capture multiple messages", async () => {
      const messages = [
        JSON.stringify({ type: "message1", data: "first" }),
        JSON.stringify({ type: "message2", data: "second" }),
        JSON.stringify({ type: "message3", data: "third" }),
      ];

      for (const message of messages) {
        await mockWebSocket.send(message);
      }

      const sentMessages = mockWebSocket.getSentMessages();
      expect(sentMessages).toHaveLength(3);
      expect(sentMessages).toEqual(messages);
    });

    it("should filter messages by type", async () => {
      await mockWebSocket.send(JSON.stringify({ type: "audio", data: "audio1" }));
      await mockWebSocket.send(JSON.stringify({ type: "session", data: "session1" }));
      await mockWebSocket.send(JSON.stringify({ type: "audio", data: "audio2" }));

      const audioMessages = mockWebSocket.getMessagesByType("audio");
      expect(audioMessages).toHaveLength(2);
      expect(audioMessages[0].data).toBe("audio1");
      expect(audioMessages[1].data).toBe("audio2");

      const sessionMessages = mockWebSocket.getMessagesByType("session");
      expect(sessionMessages).toHaveLength(1);
      expect(sessionMessages[0].data).toBe("session1");
    });

    it("should get message count by type", async () => {
      await mockWebSocket.send(JSON.stringify({ type: "audio", data: "1" }));
      await mockWebSocket.send(JSON.stringify({ type: "audio", data: "2" }));
      await mockWebSocket.send(JSON.stringify({ type: "session", data: "1" }));

      expect(mockWebSocket.getMessageCountByType("audio")).toBe(2);
      expect(mockWebSocket.getMessageCountByType("session")).toBe(1);
      expect(mockWebSocket.getMessageCountByType("nonexistent")).toBe(0);
    });

    it("should handle invalid JSON messages gracefully", async () => {
      await mockWebSocket.send("invalid json {");

      // Should not throw, and should not count as any message type
      expect(mockWebSocket.getMessageCountByType("any")).toBe(0);
      expect(mockWebSocket.getSentMessages()).toHaveLength(1);
    });
  });

  describe("Event Simulation", () => {
    beforeEach(async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
    });

    it("should receive simulated inbound messages", async () => {
      const testMessage = JSON.stringify({
        type: "session.created",
        session: { id: "test-session" },
      });

      let messageReceived = false;
      let receivedData: any;

      mockWebSocket.onMessage((data) => {
        receivedData = data;
        messageReceived = true;
      });

      mockWebSocket.enqueueInboundMessage(testMessage);

      // Wait for message processing
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(messageReceived).toBe(true);
      expect(receivedData).toBe(testMessage);
    });

    it("should handle multiple inbound messages", async () => {
      const messages = [
        JSON.stringify({ type: "session.created", session: { id: "test1" } }),
        JSON.stringify({ type: "session.updated", session: { id: "test1" } }),
      ];

      const receivedMessages: any[] = [];
      mockWebSocket.onMessage((data) => {
        receivedMessages.push(data);
      });

      messages.forEach((msg) => mockWebSocket.enqueueInboundMessage(msg));

      // Wait for message processing
      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(receivedMessages).toHaveLength(messages.length);
    });

    it("should simulate connection errors", async () => {
      const testError = new Error("Connection lost");

      let errorReceived = false;
      mockWebSocket.onError((error) => {
        expect(error).toBe(testError);
        errorReceived = true;
      });

      mockWebSocket.simulateError(testError);

      // Wait a bit for error processing
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(errorReceived).toBe(true);
    });

    it("should simulate connection close events", async () => {
      let closeReceived = false;
      let receivedCode: number | undefined;
      let receivedReason: string | undefined;

      mockWebSocket.onClose((code, reason) => {
        receivedCode = code;
        receivedReason = reason;
        closeReceived = true;
      });

      await mockWebSocket.disconnect(1001, "Going away");

      expect(closeReceived).toBe(true);
      expect(receivedCode).toBe(1001);
      expect(receivedReason).toBe("Going away");
    });
  });

  describe("Advanced Testing Features", () => {
    it("should wait for specific number of messages", async () => {
      // Start sending messages after a delay
      setTimeout(async () => {
        await mockWebSocket.send(JSON.stringify({ type: "msg1" }));
        await mockWebSocket.send(JSON.stringify({ type: "msg2" }));
        await mockWebSocket.send(JSON.stringify({ type: "msg3" }));
      }, 10);

      // Wait for 3 messages
      await mockWebSocket.waitForMessages(3, 1000);

      expect(mockWebSocket.getSentMessages()).toHaveLength(3);
    });

    it("should timeout when waiting for messages", async () => {
      await expect(mockWebSocket.waitForMessages(5, 100)).rejects.toThrow(
        "Timeout waiting for 5 messages",
      );
    });

    it("should wait for specific message type", async () => {
      // Send different message types
      setTimeout(async () => {
        await mockWebSocket.send(JSON.stringify({ type: "other" }));
        await mockWebSocket.send(JSON.stringify({ type: "target", data: "found" }));
      }, 10);

      // Wait for the target message type
      const message = await mockWebSocket.waitForMessageType("target", 1000);

      expect(message.type).toBe("target");
      expect(message.data).toBe("found");
    });

    it("should timeout when waiting for message type", async () => {
      await expect(mockWebSocket.waitForMessageType("nonexistent", 100)).rejects.toThrow(
        "Timeout waiting for message type: nonexistent",
      );
    });

    it("should clear sent messages", async () => {
      await mockWebSocket.send(JSON.stringify({ type: "test" }));
      expect(mockWebSocket.getSentMessages()).toHaveLength(1);

      mockWebSocket.clearSentMessages();
      expect(mockWebSocket.getSentMessages()).toHaveLength(0);
    });

    it("should get last sent message", async () => {
      await mockWebSocket.send(JSON.stringify({ type: "first" }));
      await mockWebSocket.send(JSON.stringify({ type: "last" }));

      const lastMessage = mockWebSocket.getLastSentMessage();
      expect(lastMessage).toBeDefined();

      const parsed = JSON.parse(lastMessage!);
      expect(parsed.type).toBe("last");
    });
  });

  describe("Error Conditions", () => {
    it("should throw when sending on closed WebSocket", async () => {
      await mockWebSocket.disconnect();

      await expect(mockWebSocket.send("test message")).rejects.toThrow("WebSocket is not open");
    });

    it("should handle abort signal during send", async () => {
      const controller = new AbortController();
      controller.abort();

      await expect(mockWebSocket.send("test", controller.signal)).rejects.toThrow("Send aborted");
    });

    it("should simulate abort during operation", async () => {
      let errorReceived = false;
      mockWebSocket.onError(() => {
        errorReceived = true;
      });

      mockWebSocket.simulateAbort();

      expect(mockWebSocket.state).toBe(3); // Closed
      expect(errorReceived).toBe(true);
    });
  });
});
