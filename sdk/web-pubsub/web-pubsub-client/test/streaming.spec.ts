// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, vi } from "vitest";
import { Stream, StreamHandler } from "../src/streaming.js";

describe("StreamHandler", () => {
  let streamHandler: StreamHandler;

  beforeEach(() => {
    streamHandler = new StreamHandler();
  });

  describe("Callback setters", () => {
    it("should allow setting onMessage callback", () => {
      let triggered = false;
      streamHandler.onMessage((_message: any) => {
        triggered = true;
      });

      streamHandler._handleMessage({});
      assert.isFunction(streamHandler.onMessage);
      assert.isTrue(triggered);
    });

    it("should allow setting onComplete callback", () => {
      let triggered = false;
      streamHandler.onComplete(() => {
        triggered = true;
      });

      streamHandler._handleComplete();
      assert.isFunction(streamHandler.onComplete);
      assert.isTrue(triggered);
    });

    it("should allow setting onError callback", () => {
      let triggered = false;
      streamHandler.onError((_error: any) => {
        triggered = true;
      });

      streamHandler._handleError(new Error("Test error"));
      assert.isFunction(streamHandler.onError);
      assert.isTrue(triggered);
    });
  });
});

describe("Stream", () => {
  let mockSendFunction: any;
  let stream: Stream;

  beforeEach(() => {
    mockSendFunction = vi.fn().mockResolvedValue(undefined);
    stream = new Stream("testGroup", "stream123", mockSendFunction);
  });

  describe("Construction", () => {
    it("should create stream with required parameters", () => {
      assert.equal(stream.groupName, "testGroup");
      assert.equal(stream.streamId, "stream123");
      assert.isFunction(stream.publish);
      assert.isFunction(stream.publishWithSequenceId);
      assert.isFunction(stream.complete);
      assert.isFunction(stream.onError); // onError is a property, initially undefined
    });

    it("should create stream with custom options", () => {
      const options = { maxBufferSize: 500, timeToLive: 10000 };
      const customStream = new Stream("testGroup", "stream123", mockSendFunction, options);

      assert.equal(customStream.groupName, "testGroup");
      assert.equal(customStream.streamId, "stream123");
    });
  });

  describe("Publishing", () => {
    it("should publish text message", async () => {
      await stream.publish("test message");

      assert.equal(mockSendFunction.mock.calls.length, 1);
      const [group, content, dataType, streamId, sequenceId] = mockSendFunction.mock.calls[0];

      assert.equal(group, "testGroup");
      assert.equal(content, "test message");
      assert.equal(dataType, "text");
      assert.equal(streamId, "stream123");
      assert.isNumber(sequenceId);
    });

    it("should publish JSON message", async () => {
      const jsonData = { key: "value", number: 42 };
      await stream.publish(jsonData);

      assert.equal(mockSendFunction.mock.calls.length, 1);
      const [, content, dataType] = mockSendFunction.mock.calls[0];

      assert.deepEqual(content, jsonData);
      assert.equal(dataType, "json");
    });

    it("should publish binary message", async () => {
      const buffer = new ArrayBuffer(8);
      await stream.publish(buffer);

      assert.equal(mockSendFunction.mock.calls.length, 1);
      const [, content, dataType] = mockSendFunction.mock.calls[0];

      assert.equal(content, buffer);
      assert.equal(dataType, "binary");
    });

    it("should publish with specific sequence ID", async () => {
      await stream.publishWithSequenceId(42, "test");

      assert.equal(mockSendFunction.mock.calls.length, 1);
      const [, , , , sequenceId] = mockSendFunction.mock.calls[0];

      assert.equal(sequenceId, 42);
    });
  });

  describe("Stream completion", () => {
    it("should complete stream", async () => {
      await stream.complete();

      assert.equal(mockSendFunction.mock.calls.length, 1);
      const [group, content, dataType, streamId, sequenceId, endOfStream] =
        mockSendFunction.mock.calls[0];

      assert.equal(group, "testGroup");
      assert.equal(content, "");
      assert.equal(dataType, "text");
      assert.equal(streamId, "stream123");
      assert.equal(endOfStream, true);
      assert.equal(sequenceId, 1); // First sequence ID
    });
  });

  describe("Buffer management", () => {
    it("should handle multiple publish calls", async () => {
      // Test that multiple publishes work
      await stream.publish("message 1");
      await stream.publish("message 2");
      await stream.publish("message 3");

      assert.equal(mockSendFunction.mock.calls.length, 3);

      // Verify each call has incrementing sequence IDs
      const sequenceIds = mockSendFunction.mock.calls.map((call: any) => call[4]);
      assert.equal(sequenceIds[0], 1);
      assert.equal(sequenceIds[1], 2);
      assert.equal(sequenceIds[2], 3);
    });

    it("should handle publishing different data types", async () => {
      await stream.publish("text");
      await stream.publish({ json: true });
      await stream.publish(new ArrayBuffer(4));

      assert.equal(mockSendFunction.mock.calls.length, 3);

      // Verify data types
      assert.equal(mockSendFunction.mock.calls[0][2], "text");
      assert.equal(mockSendFunction.mock.calls[1][2], "json");
      assert.equal(mockSendFunction.mock.calls[2][2], "binary");
    });
  });

  describe("Send function integration", () => {
    it("should pass correct parameters to send function", async () => {
      const testData = "test data";
      await stream.publish(testData);

      const [group, content, dataType, streamId, sequenceId] = mockSendFunction.mock.calls[0];

      assert.equal(group, stream.groupName);
      assert.equal(content, testData);
      assert.equal(dataType, "text");
      assert.equal(streamId, stream.streamId);
      assert.isNumber(sequenceId);
      assert.isAtLeast(sequenceId, 1);
    });

    it("should handle send function errors", async () => {
      const sendError = new Error("Send failed");
      mockSendFunction.mockRejectedValue(sendError);

      let errorReceived: any;
      stream.onError((error: any) => {
        errorReceived = error;
      });

      // The error should be handled via onError callback, not thrown
      await stream.publish("test");

      // Check that error was passed to onError callback
      assert.isNotNull(errorReceived);
      assert.equal(errorReceived.name, "StreamSendError");
      assert.include(errorReceived.message, "Send failed");
    });
  });

  describe("Sequence ID management", () => {
    it("should auto-increment sequence IDs", async () => {
      await stream.publish("msg1");
      await stream.publish("msg2");
      await stream.publish("msg3");

      const calls = mockSendFunction.mock.calls;
      assert.equal(calls[0][4], 1); // First message gets sequence ID 1
      assert.equal(calls[1][4], 2); // Second message gets sequence ID 2
      assert.equal(calls[2][4], 3); // Third message gets sequence ID 3
    });

    it("should use provided sequence ID when specified", async () => {
      await stream.publishWithSequenceId(100, "test");

      const [, , , , sequenceId] = mockSendFunction.mock.calls[0];
      assert.equal(sequenceId, 100);
    });

    it("should continue auto-increment after manual sequence ID", async () => {
      await stream.publish("auto1"); // Should be 1
      await stream.publishWithSequenceId(50, "manual"); // Manual 50
      await stream.publish("auto2"); // Should be 51 (continues from manual sequence)

      const calls = mockSendFunction.mock.calls;
      assert.equal(calls[0][4], 1);
      assert.equal(calls[1][4], 50);
      assert.equal(calls[2][4], 51); // Auto-increment continues from the highest sequence ID
    });
  });

  describe("Data type detection", () => {
    it("should detect string as text", async () => {
      await stream.publish("hello");
      assert.equal(mockSendFunction.mock.calls[0][2], "text");
    });

    it("should detect object as JSON", async () => {
      await stream.publish({ test: true });
      assert.equal(mockSendFunction.mock.calls[0][2], "json");
    });

    it("should detect ArrayBuffer as binary", async () => {
      await stream.publish(new ArrayBuffer(4));
      assert.equal(mockSendFunction.mock.calls[0][2], "binary");
    });

    it("should detect Uint8Array as binary", async () => {
      await stream.publish(new Uint8Array([1, 2, 3]));
      assert.equal(mockSendFunction.mock.calls[0][2], "binary");
    });
  });

  describe("Backpressure simulation", () => {
    it("should handle buffer limits with delayed sends", async () => {
      // Create a mock that simulates slow network/service responses
      const resolveCallbacks: Array<() => void> = [];
      const slowMockSendFunction = vi.fn().mockImplementation(() => {
        return new Promise<void>((resolve) => {
          resolveCallbacks.push(resolve);
        });
      });

      const testStream = new Stream("group", "id", slowMockSendFunction, {
        maxBufferSize: 2,
        bufferWaitTimeout: 100, // Longer timeout for testing
      });

      // Start publishing messages - first 2 should be buffered and sent
      const promise1 = testStream.publish("msg1");
      const promise2 = testStream.publish("msg2");

      // Wait a bit for sends to start
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Verify that 2 sends have been initiated (buffer is full)
      assert.equal(slowMockSendFunction.mock.calls.length, 2);

      // Third message should wait for buffer space
      const promise3Started = Promise.resolve().then(async () => {
        return testStream.publish("msg3");
      });

      // Wait a bit - msg3 should be waiting
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Still only 2 calls (msg3 is waiting for buffer space)
      assert.equal(slowMockSendFunction.mock.calls.length, 2);

      // Simulate acknowledgment by completing the first send
      // In real implementation, this would remove the message from buffer
      resolveCallbacks[0]();
      await promise1;

      // Now we need to manually simulate buffer cleanup
      // In real implementation, this would happen when ack is received
      (testStream as any)._buffer.shift(); // Remove first message
      (testStream as any)._notifyWaitingPublishers(); // Notify waiting publishers

      // Wait for msg3 to be sent
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Now msg3 should have been sent
      assert.equal(slowMockSendFunction.mock.calls.length, 3);

      // Complete remaining sends
      resolveCallbacks[1]();
      resolveCallbacks[2]();
      await Promise.all([promise2, promise3Started]);
    });

    it("should timeout when buffer wait timeout is exceeded", async () => {
      // Create a mock that never resolves (simulating network issues)
      const stuckMockSendFunction = vi.fn().mockImplementation(() => {
        return new Promise<void>(() => {}); // Never resolves
      });

      const testStream = new Stream("group", "id", stuckMockSendFunction, {
        maxBufferSize: 1,
        bufferWaitTimeout: 50, // Very short timeout
      });

      // First message should start sending
      testStream.publish("msg1").catch(() => {}); // Ignore potential errors

      // Wait for send to start
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Second message should timeout waiting for buffer space
      let errorThrown = false;
      try {
        await testStream.publish("msg2");
      } catch (error: any) {
        errorThrown = true;
        assert.include(error.message, "Buffer wait timeout");
      }

      assert.isTrue(errorThrown, "Expected timeout error to be thrown");
      assert.equal(stuckMockSendFunction.mock.calls.length, 1);
    });
  });

  describe("Resend functionality", () => {
    it("should not resend when stream is disposed", async () => {
      const disposedMockSend = vi.fn().mockResolvedValue(undefined);
      const testStream = new Stream("group", "id", disposedMockSend, {
        maxResendAttempts: 3,
        resendInterval: 10,
      });

      // Publish some messages
      await testStream.publish("msg1");

      // Dispose the stream
      (testStream as any)._destroy();

      // Try to resend - should be ignored since stream is disposed
      await (testStream as any)._resendUnackedMessages();

      // Should only have 1 call (msg1)
      assert.equal(disposedMockSend.mock.calls.length, 1);
    });

    it("should respect maxResendAttempts limit", async () => {
      const limitMockSend = vi.fn().mockResolvedValue(undefined);
      const testStream = new Stream("group", "id", limitMockSend, {
        maxResendAttempts: 2,
        resendInterval: 10,
      });

      // Add messages to buffer manually to simulate unacked messages
      (testStream as any)._buffer = [
        { content: "msg1", dataType: "text", sequenceId: 1, endOfStream: false },
      ];

      // First resend attempt
      await (testStream as any)._resendUnackedMessages();
      assert.equal((testStream as any)._resendAttempts, 1);

      // Second resend attempt
      await (testStream as any)._resendUnackedMessages();
      assert.equal((testStream as any)._resendAttempts, 2);

      // Third attempt should be blocked and trigger error
      let errorThrown = false;
      try {
        await (testStream as any)._resendUnackedMessages();
      } catch (error: any) {
        errorThrown = true;
        assert.include(error.message, "Maximum resend attempts exceeded");
      }

      assert.isTrue(errorThrown, "Expected max resend attempts error to be handled");
      assert.equal((testStream as any)._resendAttempts, 2);
    });

    it("should use fixed resend interval when exponential backoff is disabled", async () => {
      const fixedMockSend = vi.fn().mockResolvedValue(undefined);
      const testStream = new Stream("group", "id", fixedMockSend, {
        maxResendAttempts: 3,
        resendInterval: 100,
        useExponentialBackoff: false,
      });

      // Add some messages to buffer
      (testStream as any)._buffer = [
        { content: "msg1", dataType: "text", sequenceId: 1, endOfStream: false },
      ];

      const startTime = Date.now();

      // First resend (no delay)
      await (testStream as any)._resendUnackedMessages();

      // Second resend (should wait ~100ms)
      await (testStream as any)._resendUnackedMessages();

      const elapsed = Date.now() - startTime;

      // Should be approximately 100ms (allowing some tolerance)
      assert.isTrue(elapsed >= 90 && elapsed <= 150, `Expected ~100ms delay, got ${elapsed}ms`);
      assert.equal((testStream as any)._resendAttempts, 2);
    });

    it("should prevent concurrent resend operations", async () => {
      let resolveFirstResend: () => void;
      const firstResendPromise = new Promise<void>((resolve) => {
        resolveFirstResend = resolve;
      });

      const concurrentMockSend = vi.fn().mockImplementation(() => firstResendPromise);
      const testStream = new Stream("group", "id", concurrentMockSend, {
        maxResendAttempts: 3,
        resendInterval: 10,
      });

      // Add some messages to buffer
      (testStream as any)._buffer = [
        { content: "msg1", dataType: "text", sequenceId: 1, endOfStream: false },
      ];

      // Start first resend (will hang until we resolve it)
      const resend1Promise = (testStream as any)._resendUnackedMessages();

      // Wait a bit to ensure first resend is in progress
      await new Promise((resolve) => setTimeout(resolve, 5));

      // Try to start second resend while first is still running
      const resend2Promise = (testStream as any)._resendUnackedMessages();

      // Resolve the first resend
      resolveFirstResend!();

      await Promise.all([resend1Promise, resend2Promise]);

      // Should only have been called once due to race condition prevention
      assert.equal(concurrentMockSend.mock.calls.length, 1);
      assert.equal((testStream as any)._resendAttempts, 1);
    });

    it("should reset resend attempts counter on successful acknowledgment", async () => {
      const ackMockSend = vi.fn().mockResolvedValue(undefined);
      const testStream = new Stream("group", "id", ackMockSend, {
        maxResendAttempts: 3,
        resendInterval: 10,
      });

      // Add messages to buffer and simulate some failed resend attempts
      (testStream as any)._buffer = [
        { content: "msg1", dataType: "text", sequenceId: 1, endOfStream: false },
        { content: "msg2", dataType: "text", sequenceId: 2, endOfStream: false },
      ];
      (testStream as any)._resendAttempts = 2;

      // Simulate acknowledgment that removes messages from buffer
      (testStream as any)._handleStreamAck(2, true);

      // Resend attempts should be reset to 0
      assert.equal((testStream as any)._resendAttempts, 0);

      // Buffer should be empty (both messages acknowledged)
      assert.equal((testStream as any)._buffer.length, 0);
    });
  });
});
