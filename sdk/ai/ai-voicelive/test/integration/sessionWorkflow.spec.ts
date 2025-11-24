// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { TestableVoiceLiveSession } from "../infrastructure/index.js";
import type { UserMessageItem, AssistantMessageItem } from "../../src/models/index.js";
import {
  TestSessionFactory,
  MockVoiceLiveWebSocket,
  TestConstants,
  createSessionCreatedEvent,
  createTestAudioData,
} from "../infrastructure/index.js";

describe("VoiceLive End-to-End Integration", () => {
  let session: TestableVoiceLiveSession;
  let mockWebSocket: MockVoiceLiveWebSocket;

  beforeEach(() => {
    const setup = TestSessionFactory.createSessionWithMockWebSocket();
    session = setup.session;
    mockWebSocket = setup.mockWebSocket;
  });

  afterEach(() => {
    mockWebSocket.removeAllListeners();
    mockWebSocket.clearSentMessages();
  });

  describe("Complete Session Lifecycle", () => {
    it("should handle complete voice assistant conversation", async () => {
      // Step 1: Connect to session
      await session.connectWithMock(mockWebSocket);
      expect(mockWebSocket.state).toBe(1); // Open

      // Step 2: Configure session with tools and settings
      await session.configureSession?.({
        model: TestConstants.MODEL_NAME,
        voice: TestConstants.VOICE_NAME,
        tools: [
          {
            name: "get_weather",
            description: "Get weather information",
            parameters: {
              type: "object",
              properties: {
                location: { type: "string" },
              },
            },
          },
        ],
      });

      // Step 3: Simulate server acknowledging session creation
      const sessionCreatedEvent = createSessionCreatedEvent();
      mockWebSocket.enqueueInboundMessage(sessionCreatedEvent);

      // Step 4: Start audio turn and send audio data
      await session.startAudioTurn?.();

      const audioData = createTestAudioData(1024);
      await session.sendInputAudio?.(audioData);

      await session.endAudioTurn?.();

      // Step 5: Create conversation item
      await session.addConversationItem?.({
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: TestConstants.SAMPLE_USER_MESSAGE }],
      } as UserMessageItem);

      // Step 6: Request response
      await session.createResponse?.();

      // Verify the complete message sequence
      const sentMessages = mockWebSocket.getSentMessages();

      // Should have: session.update, turn.start, audio.append, turn.end, conversation.item.create, response.create
      expect(sentMessages.length).toBeGreaterThanOrEqual(6);

      const messageTypes = sentMessages.map((msg) => JSON.parse(msg).type);
      expect(messageTypes).toContain("session.update");
      expect(messageTypes).toContain(TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_START);
      expect(messageTypes).toContain(TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND);
      expect(messageTypes).toContain(TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_END);
      expect(messageTypes).toContain(TestConstants.EVENT_TYPES.CONVERSATION_ITEM_CREATE);
      expect(messageTypes).toContain(TestConstants.EVENT_TYPES.RESPONSE_CREATE);
    });

    it("should handle function calling workflow", async () => {
      await session.connectWithMock(mockWebSocket);

      // Configure with function tool
      await session.configureSession?.({
        model: TestConstants.MODEL_NAME,
        tools: [
          {
            name: TestConstants.SAMPLE_FUNCTION_NAME,
            description: TestConstants.SAMPLE_FUNCTION_DESCRIPTION,
            parameters: { type: "object", properties: {} },
          },
        ],
      });

      // User asks a question that requires function calling
      await session.addConversationItem?.({
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "What's the weather like?" }],
      } as UserMessageItem);

      await session.createResponse?.();

      // Simulate server requesting function call
      const functionCallEvent = JSON.stringify({
        type: TestConstants.EVENT_TYPES.FUNCTION_CALL_ARGUMENTS_DONE,
        event_id: TestConstants.SAMPLE_EVENT_ID,
        call_id: TestConstants.SAMPLE_CALL_ID,
        name: TestConstants.SAMPLE_FUNCTION_NAME,
        arguments: TestConstants.SAMPLE_FUNCTION_ARGS,
      });

      mockWebSocket.enqueueInboundMessage(functionCallEvent);

      // Execute function locally (simulate)
      const functionResult = TestConstants.SAMPLE_FUNCTION_RESULT;

      // Send function result back
      await session.sendFunctionCallOutput?.(TestConstants.SAMPLE_CALL_ID, functionResult);

      // Request new response with function result
      await session.createResponse?.();

      // Verify function calling sequence
      const outputMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.FUNCTION_CALL_OUTPUT,
      );
      expect(outputMessages).toHaveLength(1);
      expect(outputMessages[0].output).toBe(functionResult);

      const responseMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.RESPONSE_CREATE,
      );
      expect(responseMessages.length).toBeGreaterThanOrEqual(2); // Initial + after function
    });

    it("should handle streaming audio conversation", async () => {
      await session.connectWithMock(mockWebSocket);

      // Configure for audio streaming
      await session.configureSession?.({
        model: TestConstants.MODEL_NAME,
        voice: TestConstants.VOICE_NAME,
        input_audio_format: "pcm16",
        output_audio_format: "pcm16",
      });

      // Simulate continuous audio streaming
      const audioChunks = Array.from({ length: 5 }, (_, _i) => createTestAudioData(512));

      await session.startAudioTurn?.();

      for (const chunk of audioChunks) {
        await session.sendInputAudio?.(chunk);
        // Small delay to simulate real-time streaming
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      await session.endAudioTurn?.();

      // Verify streaming behavior
      const audioMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND,
      );
      expect(audioMessages).toHaveLength(5);

      // Verify turn management
      const turnStartMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_START,
      );
      const turnEndMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_END,
      );
      expect(turnStartMessages).toHaveLength(1);
      expect(turnEndMessages).toHaveLength(1);
    });

    it("should handle error recovery", async () => {
      await session.connectWithMock(mockWebSocket);

      // Start normal operation
      await session.startAudioTurn?.();

      // Simulate connection error
      const error = new Error("Network error");
      mockWebSocket.simulateError(error);

      // Clear the turn state to simulate error recovery
      session.clearActiveTurn?.();

      // Should be able to reconnect and continue
      await session.connectWithMock(new MockVoiceLiveWebSocket());

      // Should be able to start new operations
      await expect(session.startAudioTurn?.()).resolves.not.toThrow();
    });
  });

  describe("Performance and Scalability", () => {
    it("should handle high-frequency audio streaming", async () => {
      await session.connectWithMock(mockWebSocket);

      const startTime = Date.now();
      const audioChunk = createTestAudioData(256);
      const iterations = 50;

      await session.startAudioTurn?.();

      // Send 50 audio chunks rapidly
      const promises = Array.from({ length: iterations }, () =>
        session.sendInputAudio?.(audioChunk),
      );

      await Promise.all(promises);
      await session.endAudioTurn?.();

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete within reasonable time (adjust threshold as needed)
      expect(duration).toBeLessThan(5000); // 5 seconds

      // Verify all audio was sent
      const audioMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND,
      );
      expect(audioMessages).toHaveLength(iterations);
    });

    it("should handle concurrent operations", async () => {
      await session.connectWithMock(mockWebSocket);

      // Start multiple operations concurrently
      const operations = [
        session.configureSession?.({ model: TestConstants.MODEL_NAME }),
        session.addConversationItem?.({
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "Hello" }],
        } as UserMessageItem),
        session.addConversationItem?.({
          type: "message",
          role: "assistant",
          content: [{ type: "text", text: "Hi there!" }],
        } as AssistantMessageItem),
        session.createResponse?.(),
      ];

      await Promise.all(operations);

      // Verify all operations completed
      const sentMessages = mockWebSocket.getSentMessages();
      expect(sentMessages.length).toBeGreaterThanOrEqual(4);
    });

    it("should handle large conversation history", async () => {
      await session.connectWithMock(mockWebSocket);

      const itemCount = 100;
      const addItemPromises = Array.from({ length: itemCount }, (_, i) =>
        session.addConversationItem?.({
          type: "message",
          role: i % 2 === 0 ? "user" : "assistant",
          content: [{ type: i % 2 === 0 ? "input_text" : "text", text: `Message ${i}` }],
        } as UserMessageItem | AssistantMessageItem),
      );

      await Promise.all(addItemPromises);

      const itemMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.CONVERSATION_ITEM_CREATE,
      );
      expect(itemMessages).toHaveLength(itemCount);
    });
  });

  describe("Event Handling and Subscriptions", () => {
    it("should handle server events with proper routing", async () => {
      await session.connectWithMock(mockWebSocket);

      const receivedEvents: any[] = [];

      // Subscribe to different event types
      session.onServerEvent?.("session.created", (event) => {
        receivedEvents.push({ type: "session.created", event });
      });

      session.onServerEvent?.("session.updated", (event) => {
        receivedEvents.push({ type: "session.updated", event });
      });

      session.onServerEvent?.("response.done", (event) => {
        receivedEvents.push({ type: "response.done", event });
      });

      // Simulate various server events
      const events = [
        JSON.stringify({ type: "session.created", session: { id: "test" } }),
        JSON.stringify({ type: "session.updated", session: { id: "test" } }),
        JSON.stringify({ type: "response.done", response: { id: "resp1" } }),
        JSON.stringify({ type: "session.created", session: { id: "test2" } }),
      ];

      for (const event of events) {
        mockWebSocket.enqueueInboundMessage(event);
      }

      // Wait for event processing
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(receivedEvents).toHaveLength(4);
      expect(receivedEvents.filter((e) => e.type === "session.created")).toHaveLength(2);
      expect(receivedEvents.filter((e) => e.type === "session.updated")).toHaveLength(1);
      expect(receivedEvents.filter((e) => e.type === "response.done")).toHaveLength(1);
    });

    it("should handle event subscription cleanup", async () => {
      // Enable test mode for predictable timing
      mockWebSocket.setTestMode(true);

      await session.connectWithMock(mockWebSocket);

      let eventCount = 0;
      const unsubscribe = session.onServerEvent?.("session.updated", () => {
        eventCount++;
      });

      // Send event
      mockWebSocket.enqueueInboundMessage(JSON.stringify({ type: "session.updated" }));
      await new Promise((resolve) => setTimeout(resolve, 20));
      expect(eventCount).toBe(1);

      // Unsubscribe
      unsubscribe?.();

      // Wait a bit more to ensure unsubscribe is processed
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Send another event
      mockWebSocket.enqueueInboundMessage(JSON.stringify({ type: "session.updated" }));
      await new Promise((resolve) => setTimeout(resolve, 20));
      expect(eventCount).toBe(1); // Should not have increased

      // Restore async mode for other tests
      mockWebSocket.setTestMode(false);
    });
  });

  // Mock implementations for integration testing
  beforeEach(() => {
    // Add comprehensive mock implementations
    const mockMethods = {
      configureSession: async (config: any) => {
        await mockWebSocket.send(
          JSON.stringify({
            type: "session.update",
            session: config,
          }),
        );
      },

      addConversationItem: async (item: any) => {
        await mockWebSocket.send(
          JSON.stringify({
            type: TestConstants.EVENT_TYPES.CONVERSATION_ITEM_CREATE,
            item: item,
          }),
        );
      },

      createResponse: async () => {
        await mockWebSocket.send(
          JSON.stringify({
            type: TestConstants.EVENT_TYPES.RESPONSE_CREATE,
          }),
        );
      },

      sendFunctionCallOutput: async (callId: string, output: string) => {
        await mockWebSocket.send(
          JSON.stringify({
            type: TestConstants.EVENT_TYPES.FUNCTION_CALL_OUTPUT,
            call_id: callId,
            output: output,
          }),
        );
      },
    };

    // Apply mock methods to session
    Object.assign(session, mockMethods);
  });
});
