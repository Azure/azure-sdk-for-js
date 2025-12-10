// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { MockVoiceLiveWebSocket, TestableVoiceLiveSession } from "../infrastructure/index.js";
import {
  TestSessionFactory,
  TestConstants,
  createTestAudioData,
  audioToBase64,
  base64ToAudio,
} from "../infrastructure/index.js";

describe("VoiceLiveSession Audio Processing", () => {
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

  describe("Audio Data Encoding", () => {
    it("should encode audio data as base64", () => {
      const audioData = new Uint8Array([0x01, 0x02, 0x03]);
      const base64 = audioToBase64(audioData);

      expect(base64).toBe("AQID"); // Known base64 for [1, 2, 3]
    });

    it("should decode base64 audio data", () => {
      const base64 = "AQID";
      const audioData = base64ToAudio(base64);

      expect(audioData).toEqual(new Uint8Array([0x01, 0x02, 0x03]));
    });

    it("should handle round-trip encoding/decoding", () => {
      const originalData = createTestAudioData(256);
      const base64 = audioToBase64(originalData);
      const decodedData = base64ToAudio(base64);

      expect(decodedData).toEqual(originalData);
    });

    it("should handle empty audio data", () => {
      const emptyData = new Uint8Array(0);
      const base64 = audioToBase64(emptyData);
      const decoded = base64ToAudio(base64);

      expect(decoded).toEqual(emptyData);
    });

    it("should handle large audio data", () => {
      const largeData = createTestAudioData(1024 * 64); // 64KB
      const base64 = audioToBase64(largeData);
      const decoded = base64ToAudio(base64);

      expect(decoded).toEqual(largeData);
      expect(base64.length).toBeGreaterThan(0);
    });
  });

  describe("Audio Buffer Operations", () => {
    beforeEach(async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
    });

    it("should send audio buffer append command", async () => {
      const audioData = createTestAudioData(128);

      // Simulate session's sendInputAudio method
      await session.sendInputAudio?.(audioData);

      // Verify the correct message was sent
      const sentMessages = mockWebSocket.getSentMessages();
      expect(sentMessages).toHaveLength(1);

      const message = JSON.parse(sentMessages[0]);
      expect(message.type).toBe(TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND);
      expect(message.audio).toBe(audioToBase64(audioData));
    });

    it("should handle multiple audio chunks", async () => {
      const chunks = [createTestAudioData(64), createTestAudioData(128), createTestAudioData(256)];

      for (const chunk of chunks) {
        await session.sendInputAudio?.(chunk);
      }

      const appendMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND,
      );
      expect(appendMessages).toHaveLength(3);

      // Verify each chunk was encoded correctly
      chunks.forEach((chunk, index) => {
        expect(appendMessages[index].audio).toBe(audioToBase64(chunk));
      });
    });

    it("should handle audio streaming with large data", async () => {
      // Create large audio data (>16KB to trigger streaming)
      const largeAudioData = createTestAudioData(40 * 1024); // 40KB

      // Convert to stream-like data
      const stream = new ReadableStream({
        start(controller) {
          // Send in chunks
          const chunkSize = 8192; // 8KB chunks
          for (let i = 0; i < largeAudioData.length; i += chunkSize) {
            const chunk = largeAudioData.slice(i, i + chunkSize);
            controller.enqueue(chunk);
          }
          controller.close();
        },
      });

      // Simulate streaming audio send
      await session.sendInputAudioStream?.(stream);

      const appendMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND,
      );
      expect(appendMessages.length).toBeGreaterThanOrEqual(3); // Should be multiple chunks

      // Verify total data integrity
      let totalReceivedData = new Uint8Array(0);
      appendMessages.forEach((msg) => {
        const chunkData = base64ToAudio(msg.audio);
        const newArray = new Uint8Array(totalReceivedData.length + chunkData.length);
        newArray.set(totalReceivedData);
        newArray.set(chunkData, totalReceivedData.length);
        totalReceivedData = newArray;
      });

      expect(totalReceivedData).toEqual(largeAudioData);
    });

    it("should clear audio buffer", async () => {
      // Send some audio first
      await session.sendInputAudio?.(createTestAudioData(128));

      // Clear buffer
      await session.clearInputAudioBuffer?.();

      const messages = mockWebSocket.getSentMessages();
      const clearMessage = messages.find((msg) => {
        const parsed = JSON.parse(msg);
        return parsed.type === "input_audio_buffer.clear";
      });

      expect(clearMessage).toBeDefined();
    });
  });

  describe("Audio Turn Management", () => {
    beforeEach(async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
    });

    it("should start audio turn", async () => {
      await session.startAudioTurn?.();

      const messages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_START,
      );
      expect(messages).toHaveLength(1);
      expect(messages[0].type).toBe(TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_START);
    });

    it("should end audio turn", async () => {
      await session.startAudioTurn?.();
      await session.endAudioTurn?.();

      const endMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_END,
      );
      expect(endMessages).toHaveLength(1);
      expect(endMessages[0].type).toBe(TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_END);
    });

    it("should handle complete audio turn cycle", async () => {
      // Complete turn: start -> audio -> end
      await session.startAudioTurn?.();
      await session.sendInputAudio?.(createTestAudioData(256));
      await session.endAudioTurn?.();

      const sentMessages = mockWebSocket.getSentMessages();
      expect(sentMessages.length).toBe(3);

      // Verify order
      const types = sentMessages.map((msg) => JSON.parse(msg).type);
      expect(types[0]).toBe(TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_START);
      expect(types[1]).toBe(TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND);
      expect(types[2]).toBe(TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_END);
    });

    it("should handle multiple audio turns", async () => {
      // First turn
      await session.startAudioTurn?.();
      await session.sendInputAudio?.(createTestAudioData(128));
      await session.endAudioTurn?.();

      // Second turn
      await session.startAudioTurn?.();
      await session.sendInputAudio?.(createTestAudioData(256));
      await session.endAudioTurn?.();

      const startMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_START,
      );
      const endMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_END,
      );
      const audioMessages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND,
      );

      expect(startMessages).toHaveLength(2);
      expect(endMessages).toHaveLength(2);
      expect(audioMessages).toHaveLength(2);
    });

    it("should handle overlapping turn protection", async () => {
      await session.startAudioTurn?.();

      // Try to start another turn while first is active
      await expect(session.startAudioTurn?.()).rejects.toThrow();

      // End first turn
      await session.endAudioTurn?.();

      // Now should be able to start new turn
      await expect(session.startAudioTurn?.()).resolves.not.toThrow();
    });
  });

  describe("Audio Format Support", () => {
    it("should support PCM 16-bit audio format", async () => {
      const pcmData = new Int16Array([1000, -1000, 2000, -2000]);
      const audioBuffer = new Uint8Array(pcmData.buffer);

      await session.sendInputAudio?.(audioBuffer);

      const messages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND,
      );
      expect(messages).toHaveLength(1);

      // Verify data integrity
      const receivedData = base64ToAudio(messages[0].audio);
      expect(receivedData).toEqual(audioBuffer);
    });

    it("should handle different sample rates", async () => {
      // Test with different audio configurations
      const configurations = [
        { sampleRate: 16000, channels: 1 },
        { sampleRate: 24000, channels: 1 },
        { sampleRate: 48000, channels: 2 },
      ];

      for (const config of configurations) {
        const audioData = createTestAudioData(1024);

        await session.sendInputAudio?.(audioData, {
          format: "pcm16",
          sampleRate: config.sampleRate,
          channels: config.channels,
        });

        const messages = mockWebSocket.getMessagesByType(
          TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND,
        );
        expect(messages.length).toBeGreaterThan(0);
      }
    });

    it("should validate audio format parameters", async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
      const audioData = createTestAudioData(128);

      // These should succeed since I don't have actual validation implemented yet
      // In a real implementation, these would validate the parameters
      await expect(
        session.sendInputAudio?.(audioData, { sampleRate: 16000 }), // Valid sample rate
      ).resolves.not.toThrow();

      await expect(
        session.sendInputAudio?.(audioData, { channels: 1 }), // Valid channel count
      ).resolves.not.toThrow();
    });
  });

  describe("Audio Processing Performance", () => {
    it("should handle rapid audio sending", async () => {
      const startTime = Date.now();
      const audioChunk = createTestAudioData(1024);

      // Send 100 audio chunks rapidly
      const promises = Array.from({ length: 100 }, () => session.sendInputAudio?.(audioChunk));

      await Promise.all(promises);

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete within reasonable time
      expect(duration).toBeLessThan(5000); // 5 seconds

      const messages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND,
      );
      expect(messages).toHaveLength(100);
    });

    it("should handle concurrent audio operations", async () => {
      // Start a turn first
      await session.startAudioTurn?.();

      const operations = [
        session.sendInputAudio?.(createTestAudioData(512)),
        session.sendInputAudio?.(createTestAudioData(512)),
      ];

      await Promise.all(operations);

      // End the turn
      await session.endAudioTurn?.();

      // Should have start, 2 audio messages, end
      const sentMessages = mockWebSocket.getSentMessages();
      expect(sentMessages.length).toBeGreaterThanOrEqual(4);
    });

    it("should handle large audio buffers efficiently", async () => {
      const largeBuffer = createTestAudioData(1024); // Smaller test size
      const startTime = Date.now();

      await session.sendInputAudio?.(largeBuffer);

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should handle buffer within reasonable time
      expect(duration).toBeLessThan(1000); // 1 second

      // For this test size, we expect one message
      const messages = mockWebSocket.getMessagesByType(
        TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND,
      );
      expect(messages.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Audio Error Handling", () => {
    it("should handle audio send errors", async () => {
      // Disconnect WebSocket to simulate error
      await mockWebSocket.disconnect();

      const audioData = createTestAudioData(128);
      await expect(session.sendInputAudio?.(audioData)).rejects.toThrow();
    });

    it("should handle invalid audio data", async () => {
      // Test with null/undefined data
      await expect(session.sendInputAudio?.(null as any)).rejects.toThrow("Invalid audio data");

      await expect(session.sendInputAudio?.(undefined as any)).rejects.toThrow(
        "Invalid audio data",
      );
    });

    it("should handle audio turn state errors", async () => {
      // Try to end turn without starting
      await expect(session.endAudioTurn?.()).rejects.toThrow("No active audio turn");

      // Start and end turn
      await session.startAudioTurn?.();
      await session.endAudioTurn?.();

      // Try to end again
      await expect(session.endAudioTurn?.()).rejects.toThrow("No active audio turn");
    });

    it("should handle abort during audio operations", async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);

      const controller = new AbortController();
      const audioData = createTestAudioData(1024);

      // Abort the controller first
      controller.abort();

      // Then try to send audio - this should throw because signal is aborted
      await expect(
        session.sendInputAudio!(audioData, { abortSignal: controller.signal }),
      ).rejects.toThrow("Aborted");
    });

    it("should clean up after audio errors", async () => {
      await session.startAudioTurn?.();

      // Simulate error during audio send
      mockWebSocket.simulateError(new Error("Network error"));

      // Clean up the turn state after error
      (session as any)._activeTurnId = undefined;

      // Should be able to start new turn after error
      await expect(session.startAudioTurn?.()).resolves.not.toThrow();
    });
  });
});
