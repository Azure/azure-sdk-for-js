// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { WebPubSubClient, WebPubSubJsonProtocol } from "../../src/index.js";
import { getWebPubSubClientUrl } from "../utils/injectables.js";
import { assert } from "../utils/vitest.js";
import { createFullRetryOptions } from "../utils/mockRretryOptions.js";

describe("WebPubSubClient", () => {
  const url = getWebPubSubClientUrl();

  it("should connect to the service", async () => {
    const client = new WebPubSubClient(url, { reconnectRetryOptions: createFullRetryOptions() });
    await assert.isFulfilled(client.start());
    client.stop();
  });

  describe("Construct a new client and options", () => {
    it("takes a client access url", () => {
      assert.doesNotThrow(() => {
        new WebPubSubClient(url);
      });
    });

    it("take client access url as func", () => {
      assert.doesNotThrow(() => {
        new WebPubSubClient({
          getClientAccessUrl: async (_) => url,
        });
      });
    });

    it("take options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubClient(
          { getClientAccessUrl: async (_) => url },
          { protocol: WebPubSubJsonProtocol(), autoReconnect: false },
        );
      });
    });

    it("protocol is missing", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient(
          { getClientAccessUrl: async (_) => url },
          { autoReconnect: false },
        );
        const protocol = client["_protocol"];
        assert.equal("json.reliable.webpubsub.azure.v1", protocol.name);
        const options = client["_options"];
        assert.isFalse(options.autoReconnect);
      });
    });

    it("reconnectionOptions is missing", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient({ getClientAccessUrl: async (_) => url }, {});
        const options = client["_options"];
        assert.isTrue(options.autoReconnect);
      });
    });

    it("client start with a non-string client url", async () => {
      const client = new WebPubSubClient({
        getClientAccessUrl: async (_) => {
          throw new Error();
        },
      });
      await assert.isRejected(client.start());
    });
  });
});
