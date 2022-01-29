// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { WebPubSubEventHandler } from "../src/webPubSubEventHandler";
import { assert } from "chai";

describe("Can creat event handler", function () {
  it("Can provide default path", function () {
    const dispatcher = new WebPubSubEventHandler("hub");
    assert.equal("/api/webpubsub/hubs/hub/", dispatcher.path);
  });

  it("Supports custom path", function () {
    const dispatcher = new WebPubSubEventHandler("hub", {
      path: "/custom",
    });
    assert.equal("/custom/", dispatcher.path);
  });

  it("Throw with invalid endpoints", function () {
    try {
      new WebPubSubEventHandler("hub", { allowedEndpoints: ["b.com"] });
      assert.fail("Should have thrown ERROR_INVALID_URL");
    } catch (err) {
      assert.isTrue((err as any).message.startsWith("Invalid URL"));
    }
  });
});
