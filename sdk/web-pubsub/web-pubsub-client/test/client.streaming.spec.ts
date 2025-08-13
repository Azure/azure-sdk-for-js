// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubClientOptions } from "../src/models/index.js";
import { WebPubSubJsonProtocol } from "../src/protocols/index.js";
import { WebPubSubClient } from "../src/webPubSubClient.js";
import type { WebPubSubClientCredential } from "../src/webPubSubClientCredential.js";
import { StreamHandler } from "../src/streaming.js";
import { describe, it, assert, beforeEach, vi } from "vitest";

describe("WebPubSubClient Streaming Integration", function () {
  let client: WebPubSubClient;
  let mockCredential: WebPubSubClientCredential;

  beforeEach(() => {
    mockCredential = {
      getClientAccessUrl: vi.fn().mockResolvedValue("wss://test.service.com")
    };
    
    client = new WebPubSubClient(mockCredential, {
      protocol: WebPubSubJsonProtocol(),
      autoReconnect: false
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
});
