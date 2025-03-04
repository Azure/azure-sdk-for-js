// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { WebPubSubEventHandler } from "../src/webPubSubEventHandler.js";

describe("Can create event handler", function () {
  it("Can provide default path", () => {
    const dispatcher = new WebPubSubEventHandler("hub");
    assert.equal("/api/webpubsub/hubs/hub/", dispatcher.path);
  });

  it("Supports custom path", () => {
    const dispatcher = new WebPubSubEventHandler("hub", {
      path: "/custom",
    });
    assert.equal("/custom/", dispatcher.path);
  });

  it("Throw with invalid endpoints", () => {
    try {
      new WebPubSubEventHandler("hub", { allowedEndpoints: ["b.com"] });
      assert.fail("Should have thrown ERROR_INVALID_URL");
    } catch (err: any) {
      assert.isTrue((err as any).message.startsWith("Invalid URL"));
    }
  });
});
