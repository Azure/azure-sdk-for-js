// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubClientOptions } from "$internal/models/index.js";
import { WebPubSubJsonProtocol } from "@azure/web-pubsub-client";
import { WebPubSubClient } from "@azure/web-pubsub-client";
import type { WebPubSubClientCredential } from "$internal/webPubSubClientCredential.js";
import { describe, it, assert, expect } from "vitest";

describe("WebPubSubClient", function () {
  describe("Construct a new client and options", () => {
    it("takes a client access url", () => {
      assert.doesNotThrow(() => {
        new WebPubSubClient("wss://service.com");
      });
    });

    it("take client access url as func", () => {
      assert.doesNotThrow(() => {
        new WebPubSubClient({
          getClientAccessUrl: async () => "wss://service.com",
        } as WebPubSubClientCredential);
      });
    });

    it("take options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubClient(
          { getClientAccessUrl: async () => "wss://service.com" } as WebPubSubClientCredential,
          { protocol: WebPubSubJsonProtocol(), autoReconnect: false } as WebPubSubClientOptions,
        );
      });
    });

    it("protocol is missing", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient(
          { getClientAccessUrl: async () => "wss://service.com" } as WebPubSubClientCredential,
          { autoReconnect: false } as WebPubSubClientOptions,
        );
        const protocol = client["_protocol"];
        assert.equal("json.reliable.webpubsub.azure.v1", protocol.name);
        const options = client["_options"];
        assert.isFalse(options.autoReconnect);
      });
    });

    it("reconnectionOptions is missing", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient(
          { getClientAccessUrl: async () => "wss://service.com" } as WebPubSubClientCredential,
          {} as WebPubSubClientOptions,
        );
        const options = client["_options"];
        assert.isTrue(options.autoReconnect);
      });
    });

    it("client start with a non-string client url", async () => {
      const client = new WebPubSubClient({
        getClientAccessUrl: async () => {
          return {
            obj: "val",
          } as any;
        },
      });
      await expect(() => client.start()).rejects.toThrowError(Error);
    });
  });
});
