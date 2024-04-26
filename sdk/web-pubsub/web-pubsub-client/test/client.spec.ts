// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, expect } from "@azure-tools/test-utils";
import { WebPubSubClientOptions } from "../src/models";
import { WebPubSubJsonProtocol } from "../src/protocols";
import { WebPubSubClient } from "../src/webPubSubClient";
import { WebPubSubClientCredential } from "../src/webPubSubClientCredential";

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
          getClientAccessUrl: async (_) => "wss://service.com",
        } as WebPubSubClientCredential);
      });
    });

    it("take options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubClient(
          { getClientAccessUrl: async (_) => "wss://service.com" } as WebPubSubClientCredential,
          { protocol: WebPubSubJsonProtocol(), autoReconnect: false } as WebPubSubClientOptions,
        );
      });
    });

    it("protocol is missing", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient(
          { getClientAccessUrl: async (_) => "wss://service.com" } as WebPubSubClientCredential,
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
          { getClientAccessUrl: async (_) => "wss://service.com" } as WebPubSubClientCredential,
          {} as WebPubSubClientOptions,
        );
        const options = client["_options"];
        assert.isTrue(options.autoReconnect);
      });
    });

    it("client start with a non-string client url", async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const client = new WebPubSubClient({ getClientAccessUrl: async (_) => new { obj: "val" }() });
      await expect(client.start()).to.be.rejectedWith(Error);
    });
  });
});
