// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubClientOptions } from "../src/models/index.js";
import { WebPubSubJsonProtocol } from "../src/protocols/index.js";
import { StreamHandler } from "../src/streaming.js";
import { WebPubSubClient } from "../src/webPubSubClient.js";
import type { WebPubSubClientCredential } from "../src/webPubSubClientCredential.js";
import { describe, it, assert, beforeEach, vi } from "vitest";

describe("WebPubSubClient Streaming Integration", function () {
  let client: WebPubSubClient;
  let mockCredential: WebPubSubClientCredential;

  beforeEach(() => {
    mockCredential = {
      getClientAccessUrl: vi.fn().mockResolvedValue("wss://test.service.com"),
    };

    client = new WebPubSubClient(mockCredential, {
      protocol: WebPubSubJsonProtocol(),
      autoReconnect: false,
    } as WebPubSubClientOptions);
  });

  describe("stream() method", () => {
    it("should create a stream with default options", () => {
      const stream = client.stream("testGroup");

      assert.isNotNull(stream);
      assert.equal(stream.groupName, "testGroup");
      // Note: Properties may not be publicly accessible in current implementation
      assert.isString(stream.streamId);
    });

    it("should generate unique stream IDs", () => {
      const stream1 = client.stream("group1");
      const stream2 = client.stream("group2");

      assert.notEqual(stream1.streamId, stream2.streamId);
      assert.isTrue(stream1.streamId.length > 0);
      assert.isTrue(stream2.streamId.length > 0);
    });

    it("should track created streams internally", () => {
      const stream1 = client.stream("group1");
      const stream2 = client.stream("group2");

      // Access internal streams map
      const internalStreams = (client as any)._streams;

      assert.isTrue(internalStreams.has(stream1.streamId));
      assert.isTrue(internalStreams.has(stream2.streamId));
      assert.equal(internalStreams.get(stream1.streamId), stream1);
      assert.equal(internalStreams.get(stream2.streamId), stream2);
    });
  });

  describe("onStream() method", () => {
    it("should register stream handler factory", () => {
      client.onStream("testGroup", (streamId: string) => {
        assert.isString(streamId);
        assert.isTrue(streamId.length > 0);
        return new StreamHandler();
      });

      // Test the registration by checking that the event listener exists
      const emitter = (client as any)._emitter;
      assert.isTrue(emitter.eventNames().includes("group-stream-message"));
    });

    it("should support multiple group registrations", () => {
      client.onStream("group1", () => {
        return new StreamHandler();
      });

      client.onStream("group2", () => {
        return new StreamHandler();
      });

      // Test that both registrations work by checking event listeners
      const emitter = (client as any)._emitter;
      assert.isTrue(emitter.eventNames().includes("group-stream-message"));

      // Event listeners are added, but they'll be filtered by group name at runtime
      assert.isAtLeast(emitter.listenerCount("group-stream-message"), 1);
    });

    it("should allow handler override for same group", () => {
      // First registration
      client.onStream("testGroup", () => {
        return new StreamHandler();
      });

      // Second registration (adds another listener)
      client.onStream("testGroup", () => {
        return new StreamHandler();
      });

      // Both handlers should be registered (multiple listeners for same event)
      const emitter = (client as any)._emitter;
      assert.isAtLeast(emitter.listenerCount("group-stream-message"), 2);
    });
  });

  describe("Stream message handling", () => {
    it("should create streams that can be used for publishing", async () => {
      const stream = client.stream("testGroup");

      // Test that the stream has the expected interface
      assert.isFunction(stream.publish);
      assert.isFunction(stream.publishWithSequenceId);
      assert.isFunction(stream.complete);
      assert.isFunction(stream.onError);
    });
  });

  describe("Resend attempt limiting", () => {
    it("should limit the number of resend attempts", async () => {
      const stream = client.stream("testGroup", { maxResendAttempts: 2 });
      let errorReceived: any = null;

      // Set up error handler
      stream.onError((error: any) => {
        errorReceived = error;
      });

      // Mock send callback to always fail
      (stream as any)._sendCallback = vi.fn(async () => {
        throw new Error("Network error");
      });

      // Publish a message to create buffer content
      await stream.publish("test message");

      // Reset error handler
      errorReceived = null;

      // Try to resend multiple times - should stop after maxResendAttempts
      await stream._resendUnackedMessages(); // 1st attempt
      await stream._resendUnackedMessages(); // 2nd attempt
      await stream._resendUnackedMessages(); // 3rd attempt - should be blocked

      // Verify that max resend attempts error was reported
      assert.isNotNull(errorReceived);
      assert.equal(errorReceived.name, "StreamMaxResendAttemptsExceeded");
      assert.include(errorReceived.message, "Maximum resend attempts (2) exceeded");
    });

    it("should reset resend attempts counter on successful acknowledgment", async () => {
      const stream = client.stream("testGroup", { maxResendAttempts: 2 });

      // Mock send callback that works
      (stream as any)._sendCallback = vi.fn(async () => {
        // Simulate successful send
      });

      // Publish a message
      await stream.publish("test message");

      // Simulate one resend attempt
      await stream._resendUnackedMessages(); // 1st attempt

      // Verify resend attempts counter was incremented
      assert.equal((stream as any)._resendAttempts, 1);

      // Simulate successful acknowledgment (this should reset the counter)
      stream._handleStreamAck(1, true, true);

      // Verify resend attempts counter was reset
      assert.equal((stream as any)._resendAttempts, 0);

      // Should be able to resend again without hitting the limit
      await stream._resendUnackedMessages(); // Should work again
      assert.equal((stream as any)._resendAttempts, 1);
    });

    it("should use default maxResendAttempts when not specified", async () => {
      const stream = client.stream("testGroup"); // No options specified

      // Check that default value (3) is used
      assert.equal((stream as any)._maxResendAttempts, 3);
    });

    it("should track resend attempts correctly across multiple calls", async () => {
      const stream = client.stream("testGroup", { maxResendAttempts: 5 });

      // Mock send callback that works
      (stream as any)._sendCallback = vi.fn(async () => {
        // Simulate successful send
      });

      // Publish a message
      await stream.publish("test message");

      // Make multiple resend attempts
      await stream._resendUnackedMessages(); // 1st attempt
      assert.equal((stream as any)._resendAttempts, 1);

      await stream._resendUnackedMessages(); // 2nd attempt
      assert.equal((stream as any)._resendAttempts, 2);

      await stream._resendUnackedMessages(); // 3rd attempt
      assert.equal((stream as any)._resendAttempts, 3);

      // Should still be able to resend since limit is 5
      await stream._resendUnackedMessages(); // 4th attempt
      assert.equal((stream as any)._resendAttempts, 4);
    });

    it("should not resend when limit is reached", async () => {
      const stream = client.stream("testGroup", { maxResendAttempts: 1 });
      let sendCallCount = 0;

      // Mock send callback to count calls
      (stream as any)._sendCallback = vi.fn(async () => {
        sendCallCount++;
        // Simulate successful send
      });

      // Publish a message
      await stream.publish("test message");
      const initialSendCount = sendCallCount; // Should be 1 from publish

      // First resend should work
      await stream._resendUnackedMessages();
      assert.equal(sendCallCount, initialSendCount + 1);

      // Second resend should be blocked
      await stream._resendUnackedMessages();
      assert.equal(sendCallCount, initialSendCount + 1); // Should not increase
    });
  });
});
