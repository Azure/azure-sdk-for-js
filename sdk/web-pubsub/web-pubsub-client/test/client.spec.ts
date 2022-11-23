// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { WebPubSubClientOptions } from "../src/models";
import { WebPubSubJsonProtocol } from "../src/protocols";
import { WebPubSubClient } from "../src/webPubSubClient";
import { DefaultWebPubSubClientCredential } from "../src/webPubSubClientCredential";

describe("WebPubSubClient", function () {
  describe("Construct a new client and options", () => {
    it("takes a client access url", () => {
      assert.doesNotThrow(() => {
        new WebPubSubClient("wss://service.com");
      });
    });

    it("take client access url as func", () => {
      assert.doesNotThrow(() => {
        new WebPubSubClient(new DefaultWebPubSubClientCredential(async (_) => "wss://service.com"));
      });
    });

    it("take options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubClient(
          new DefaultWebPubSubClientCredential(async (_) => "wss://service.com"),
          { protocol: WebPubSubJsonProtocol(), autoReconnect: false } as WebPubSubClientOptions
        );
      });
    });

    it("protocol is missing", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient(
          new DefaultWebPubSubClientCredential(async (_) => "wss://service.com"),
          { autoReconnect: false } as WebPubSubClientOptions
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
          new DefaultWebPubSubClientCredential(async (_) => "wss://service.com"),
          {} as WebPubSubClientOptions
        );
        const options = client["_options"];
        assert.isTrue(options.autoReconnect);
      });
    });
  });
});
