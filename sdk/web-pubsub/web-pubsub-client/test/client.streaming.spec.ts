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
    it("should create a stream with default options (auto-generated streamId)", () => {
      const stream = client.stream("testGroup");

      assert.isNotNull(stream);
      assert.equal(stream.groupName, "testGroup");
      assert.isString(stream.streamId);
      assert.isTrue(stream.streamId.startsWith("stream_"));

      assert.equal((stream as any)._options.maxResendAttempts, 3);
      assert.equal((stream as any)._options.maxBufferSize, 100);
      assert.equal((stream as any)._options.timeToLive, 300000);
      assert.equal((stream as any)._options.resendInterval, 1000);
      assert.equal((stream as any)._options.useExponentialBackoff, false);
      assert.equal((stream as any)._options.bufferWaitTimeout, 30000);
    });

    it("should create a stream with custom streamId", () => {
      const stream = client.stream("testGroup", "testStreamId");

      assert.isNotNull(stream);
      assert.equal(stream.groupName, "testGroup");
      assert.equal(stream.streamId, "testStreamId");

      assert.equal((stream as any)._options.maxResendAttempts, 3);
      assert.equal((stream as any)._options.maxBufferSize, 100);
      assert.equal((stream as any)._options.timeToLive, 300000);
      assert.equal((stream as any)._options.resendInterval, 1000);
      assert.equal((stream as any)._options.useExponentialBackoff, false);
      assert.equal((stream as any)._options.bufferWaitTimeout, 30000);
    });

    it("should generate unique stream IDs when auto-generating", () => {
      const stream1 = client.stream("group1");
      const stream2 = client.stream("group2");

      assert.notEqual(stream1.streamId, stream2.streamId);
      assert.isTrue(stream1.streamId.length > 0);
      assert.isTrue(stream2.streamId.length > 0);
      assert.isTrue(stream1.streamId.startsWith("stream_"));
      assert.isTrue(stream2.streamId.startsWith("stream_"));
    });

    it("should use provided stream IDs", () => {
      const stream1 = client.stream("group1", "streamId1");
      const stream2 = client.stream("group2", "streamId2");

      assert.equal(stream1.streamId, "streamId1");
      assert.equal(stream2.streamId, "streamId2");
      assert.notEqual(stream1.streamId, stream2.streamId);
    });

    it("should track created streams internally", () => {
      const stream1 = client.stream("group1", "streamId1");
      const stream2 = client.stream("group2"); // auto-generated

      // Access internal streams map
      const internalStreams = (client as any)._streams;

      assert.isTrue(internalStreams.has(stream1.streamId));
      assert.isTrue(internalStreams.has(stream2.streamId));
      assert.equal(internalStreams.get(stream1.streamId), stream1);
      assert.equal(internalStreams.get(stream2.streamId), stream2);
    });

    it("should throw error for duplicate stream IDs", () => {
      client.stream("group1", "duplicateStreamId");

      assert.throws(() => {
        client.stream("group2", "duplicateStreamId");
      }, "Stream with ID 'duplicateStreamId' already exists");
    });

    it("should throw error for invalid stream IDs when provided", () => {
      assert.throws(() => {
        client.stream("group1", "");
      }, "Stream ID must be a non-empty string");

      assert.throws(() => {
        client.stream("group1", "   ");
      }, "Stream ID must be a non-empty string");
    });

    it("should support options parameter with auto-generated streamId", () => {
      const customOptions = {
        maxBufferSize: 50,
        timeToLive: 60000,
      };
      const stream = client.stream("testGroup", undefined, customOptions);

      assert.isNotNull(stream);
      assert.equal(stream.groupName, "testGroup");
      assert.isString(stream.streamId);
      assert.isTrue(stream.streamId.startsWith("stream_"));
      assert.equal((stream as any)._options.maxBufferSize, 50);
      assert.equal((stream as any)._options.timeToLive, 60000);
    });

    it("should support options parameter with custom streamId", () => {
      const customOptions = {
        maxBufferSize: 50,
        timeToLive: 60000,
      };
      const stream = client.stream("testGroup", "customStreamId", customOptions);

      assert.isNotNull(stream);
      assert.equal(stream.groupName, "testGroup");
      assert.equal(stream.streamId, "customStreamId");
      assert.equal((stream as any)._options.maxBufferSize, 50);
      assert.equal((stream as any)._options.timeToLive, 60000);
    });

    it("should handle edge cases for streamId parameter", () => {
      // Test with undefined should auto-generate
      const stream1 = client.stream("testGroup", undefined);
      assert.isNotNull(stream1);
      assert.isString(stream1.streamId);
      assert.isTrue(stream1.streamId.startsWith("stream_"));

      // Test with no second parameter should auto-generate
      const stream2 = client.stream("testGroup2");
      assert.isNotNull(stream2);
      assert.isString(stream2.streamId);
      assert.isTrue(stream2.streamId.startsWith("stream_"));

      // Ensure they're different
      assert.notEqual(stream1.streamId, stream2.streamId);
    });

    it("should preserve backward compatibility - auto-generate when only groupName provided", () => {
      const stream = client.stream("testGroup");

      assert.isNotNull(stream);
      assert.equal(stream.groupName, "testGroup");
      assert.isString(stream.streamId);
      assert.isTrue(stream.streamId.startsWith("stream_"));
      assert.isTrue(stream.streamId.includes("_"));

      // Verify default options are applied
      assert.equal((stream as any)._options.maxResendAttempts, 3);
      assert.equal((stream as any)._options.maxBufferSize, 100);
    });

    it("should support new API - custom streamId with options", () => {
      const customOptions = {
        maxBufferSize: 200,
        maxResendAttempts: 5,
      };
      const stream = client.stream("testGroup", "myCustomStream", customOptions);

      assert.isNotNull(stream);
      assert.equal(stream.groupName, "testGroup");
      assert.equal(stream.streamId, "myCustomStream");
      assert.equal((stream as any)._options.maxBufferSize, 200);
      assert.equal((stream as any)._options.maxResendAttempts, 5);
    });

    it("should generate unique streamIds across multiple calls", () => {
      const streams = [];
      const streamIds = new Set();

      // Create 10 streams with auto-generated IDs
      for (let i = 0; i < 10; i++) {
        const stream = client.stream(`group${i}`);
        streams.push(stream);
        streamIds.add(stream.streamId);
      }

      // All streamIds should be unique
      assert.equal(streamIds.size, 10);

      // All should follow the expected pattern
      streams.forEach((stream) => {
        assert.isTrue(stream.streamId.startsWith("stream_"));
        assert.isTrue(stream.streamId.length > 10); // reasonable length check
      });
    });

    it("should validate custom streamIds properly", () => {
      // Valid streamIds should work
      assert.doesNotThrow(() => {
        client.stream("group1", "validStreamId");
      });

      assert.doesNotThrow(() => {
        client.stream("group2", "stream-with-dashes");
      });

      assert.doesNotThrow(() => {
        client.stream("group3", "stream_with_underscores");
      });

      assert.doesNotThrow(() => {
        client.stream("group4", "123numericStart");
      });
    });

    it("should handle concurrent stream creation without collision", () => {
      const promises = [];

      // Create multiple streams concurrently
      for (let i = 0; i < 5; i++) {
        promises.push(Promise.resolve(client.stream(`group${i}`)));
      }

      return Promise.all(promises).then((streams) => {
        const streamIds = streams.map((s) => s.streamId);
        const uniqueIds = new Set(streamIds);

        // All IDs should be unique
        assert.equal(uniqueIds.size, 5);

        // All should be properly formatted
        streams.forEach((stream) => {
          assert.isTrue(stream.streamId.startsWith("stream_"));
        });

        return streams; // Return to satisfy linter
      });
    });

    it("should maintain stream tracking for both auto-generated and custom streamIds", () => {
      const autoStream = client.stream("autoGroup");
      const customStream = client.stream("customGroup", "customId");

      const internalStreams = (client as any)._streams;

      // Both should be tracked
      assert.isTrue(internalStreams.has(autoStream.streamId));
      assert.isTrue(internalStreams.has(customStream.streamId));

      // Should be able to retrieve them
      assert.equal(internalStreams.get(autoStream.streamId), autoStream);
      assert.equal(internalStreams.get(customStream.streamId), customStream);

      // IDs should be different
      assert.notEqual(autoStream.streamId, customStream.streamId);
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
});
