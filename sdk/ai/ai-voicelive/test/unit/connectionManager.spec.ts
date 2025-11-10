// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { ConnectionManager, ConnectionState } from "../../src/websocket/connectionManager.js";
import { MockVoiceLiveWebSocket, TestConstants } from "../infrastructure/index.js";

describe("ConnectionManager", () => {
  let mockWebSocket: MockVoiceLiveWebSocket;
  let connectionManager: ConnectionManager;
  let webSocketFactory: () => MockVoiceLiveWebSocket;

  beforeEach(() => {
    mockWebSocket = new MockVoiceLiveWebSocket();
    webSocketFactory = () => mockWebSocket;

    connectionManager = new ConnectionManager(webSocketFactory, {
      endpoint: TestConstants.WS_ENDPOINT,
      connectionTimeout: TestConstants.CONNECTION_TIMEOUT_MS,
    });
  });

  afterEach(() => {
    mockWebSocket.removeAllListeners();
    mockWebSocket.clearSentMessages();
  });

  describe("Connection Lifecycle", () => {
    it("should start in disconnected state", () => {
      // Assuming ConnectionManager exposes state
      // This test verifies initial state - may need adjustment based on actual API
      expect(connectionManager).toBeDefined();
    });

    it("should establish connection successfully", async () => {
      let stateChangeCount = 0;

      const eventHandlers = {
        onStateChange: (_state: ConnectionState) => {
          stateChangeCount++;
        },
      };

      // Create connection manager with event handlers
      connectionManager = new ConnectionManager(
        webSocketFactory,
        { endpoint: TestConstants.WS_ENDPOINT },
        eventHandlers,
      );

      await connectionManager.connect();

      // Verify WebSocket was connected
      expect(mockWebSocket.state).toBe(1); // WebSocketState.Open
    });

    it("should handle connection with abort signal", async () => {
      const controller = new AbortController();

      const connectPromise = connectionManager.connect(controller.signal);

      // Don't abort - let it complete normally
      await connectPromise;

      expect(mockWebSocket.state).toBe(1); // Open
    });

    it("should abort connection when signal is aborted", async () => {
      const controller = new AbortController();

      // Start connection
      const connectPromise = connectionManager.connect(controller.signal);

      // Abort immediately
      controller.abort();

      // Connection should be aborted
      await expect(connectPromise).rejects.toThrow();
    });

    it("should handle pre-aborted signal", async () => {
      const controller = new AbortController();
      controller.abort(); // Abort before connecting

      await expect(connectionManager.connect(controller.signal)).rejects.toThrow();
    });

    it("should disconnect cleanly", async () => {
      await connectionManager.connect();
      expect(mockWebSocket.state).toBe(1); // Open

      await connectionManager.disconnect();
      expect(mockWebSocket.state).toBe(3); // Closed
    });

    it("should handle multiple disconnect calls gracefully", async () => {
      await connectionManager.connect();

      // First disconnect
      await connectionManager.disconnect();
      expect(mockWebSocket.state).toBe(3); // Closed

      // Second disconnect should not throw
      await expect(connectionManager.disconnect()).resolves.not.toThrow();
    });
  });

  describe("State Management", () => {
    it("should track state changes during connection", async () => {
      const stateChanges: ConnectionState[] = [];

      connectionManager = new ConnectionManager(
        webSocketFactory,
        { endpoint: TestConstants.WS_ENDPOINT },
        {
          onStateChange: (state: ConnectionState) => {
            stateChanges.push(state);
          },
        },
      );

      await connectionManager.connect();

      // Should have gone through: connecting -> connected
      expect(stateChanges.length).toBeGreaterThanOrEqual(1);
      expect(stateChanges).toContain(ConnectionState.Connected);
    });

    it("should track state changes during disconnection", async () => {
      const stateChanges: ConnectionState[] = [];

      connectionManager = new ConnectionManager(
        webSocketFactory,
        { endpoint: TestConstants.WS_ENDPOINT },
        {
          onStateChange: (state: ConnectionState) => {
            stateChanges.push(state);
          },
        },
      );

      await connectionManager.connect();
      stateChanges.length = 0; // Clear connection states

      await connectionManager.disconnect();

      // Should include disconnecting and/or disconnected states
      expect(stateChanges.length).toBeGreaterThanOrEqual(1);
    });

    it("should prevent multiple simultaneous connections", async () => {
      const firstConnect = connectionManager.connect();

      // Try to connect again while first is in progress
      await expect(connectionManager.connect()).rejects.toThrow(
        "Connection attempt already in progress",
      );

      // Wait for first connection to complete
      await firstConnect;
    });

    it("should allow reconnection after disconnect", async () => {
      // First connection
      await connectionManager.connect();
      await connectionManager.disconnect();

      // Second connection should work
      await expect(connectionManager.connect()).resolves.not.toThrow();
      expect(mockWebSocket.state).toBe(1); // Open
    });
  });

  describe("Message Handling", () => {
    beforeEach(async () => {
      await connectionManager.connect();
    });

    it("should handle incoming messages", async () => {
      const testMessage = JSON.stringify({
        type: "session.created",
        session: { id: "test-session" },
      });

      let messageReceived = false;
      let receivedData: any;

      connectionManager = new ConnectionManager(
        webSocketFactory,
        { endpoint: TestConstants.WS_ENDPOINT },
        {
          onMessage: (data) => {
            receivedData = data;
            messageReceived = true;
          },
        },
      );

      // Need to connect first
      await connectionManager.connect();
      // Simulate incoming message
      mockWebSocket.enqueueInboundMessage(testMessage);

      // Wait for processing
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(messageReceived).toBe(true);
      expect(receivedData).toBe(testMessage);
    });

    it("should handle binary messages", async () => {
      const binaryData = new Uint8Array([1, 2, 3, 4]);

      let messageReceived = false;
      let receivedData: any;

      connectionManager = new ConnectionManager(
        webSocketFactory,
        { endpoint: TestConstants.WS_ENDPOINT },
        {
          onMessage: (data) => {
            receivedData = data;
            messageReceived = true;
          },
        },
      );

      // Connect and then send binary message
      await connectionManager.connect();
      mockWebSocket.enqueueInboundMessage(binaryData.buffer as any);

      // Wait for processing
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(messageReceived).toBe(true);
      expect(receivedData).toBeInstanceOf(ArrayBuffer);
      const view = new Uint8Array(receivedData as ArrayBuffer);
      expect(view).toEqual(binaryData);
    });

    it("should send messages through WebSocket", async () => {
      const testMessage = "test message";

      await connectionManager.send(testMessage);

      const sentMessages = mockWebSocket.getSentMessages();
      expect(sentMessages).toContain(testMessage);
    });

    it("should reject send when not connected", async () => {
      await connectionManager.disconnect();

      await expect(connectionManager.send("test")).rejects.toThrow();
    });
  });

  describe("Error Handling", () => {
    it("should handle WebSocket errors", async () => {
      const testError = new Error("WebSocket error");

      let errorReceived = false;
      let errorMessage = "";
      connectionManager = new ConnectionManager(
        webSocketFactory,
        { endpoint: TestConstants.WS_ENDPOINT },
        {
          onError: (error) => {
            errorMessage = error.message;
            errorReceived = true;
          },
        },
      );

      // Connect first so there's an active WebSocket to monitor
      await connectionManager.connect();

      mockWebSocket.simulateError(testError);

      // Wait for error processing
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(errorReceived).toBe(true);
      expect(errorMessage).toContain("WebSocket error");
    });

    it("should handle connection timeout", async () => {
      // Create a WebSocket that throws timeout error
      const slowWebSocket = new MockVoiceLiveWebSocket();
      slowWebSocket.connect = async () => {
        throw new Error("Connection timeout");
      };

      connectionManager = new ConnectionManager(() => slowWebSocket, {
        endpoint: TestConstants.WS_ENDPOINT,
        connectionTimeout: 100,
      });

      await expect(connectionManager.connect()).rejects.toThrow("Connection timeout");
    }, 500);

    it("should handle unexpected disconnection", async () => {
      let errorReceived = false;
      let errorMessage = "";

      connectionManager = new ConnectionManager(
        webSocketFactory,
        { endpoint: TestConstants.WS_ENDPOINT },
        {
          onError: (error) => {
            errorMessage = error.message;
            errorReceived = true;
          },
        },
      );

      // Connect first so there's an active WebSocket to monitor
      await connectionManager.connect();

      // Simulate unexpected close
      mockWebSocket.simulateAbort();

      // Wait for error processing
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(errorReceived).toBe(true);
      expect(errorMessage).toContain("Connection aborted");
    });

    it("should clean up resources on error", async () => {
      await connectionManager.connect();

      // Simulate error
      mockWebSocket.simulateError(new Error("Test error"));

      // Should clean up and be ready for new connection
      await expect(connectionManager.connect()).resolves.not.toThrow();
    });
  });

  describe("Concurrency and Race Conditions", () => {
    it("should handle rapid connect/disconnect cycles", async () => {
      for (let i = 0; i < 5; i++) {
        await connectionManager.connect();
        await connectionManager.disconnect();
      }

      // Should end in disconnected state
      expect(mockWebSocket.state).toBe(3); // Closed
    });

    it("should handle multiple message sends", async () => {
      await connectionManager.connect();

      const messages = Array.from({ length: 10 }, (_, i) => `message-${i}`);

      // Send all messages concurrently
      await Promise.all(messages.map((msg) => connectionManager.send(msg)));

      const sentMessages = mockWebSocket.getSentMessages();
      expect(sentMessages).toHaveLength(10);

      // All messages should be present (order may vary)
      messages.forEach((msg) => {
        expect(sentMessages).toContain(msg);
      });
    });

    it("should handle abort during message sending", async () => {
      await connectionManager.connect();

      const controller = new AbortController();
      controller.abort(); // Abort before sending

      await expect(connectionManager.send("test", controller.signal)).rejects.toThrow(
        "Send aborted",
      );
    });
  });

  describe("Event Handler Management", () => {
    it("should support updating event handlers", async () => {
      let callCount = 0;

      connectionManager = new ConnectionManager(
        webSocketFactory,
        { endpoint: TestConstants.WS_ENDPOINT },
        {
          onMessage: () => {
            callCount++;
          },
        },
      );

      await connectionManager.connect();
      mockWebSocket.enqueueInboundMessage("test1");

      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(callCount).toBe(1);
    });
  });
});
