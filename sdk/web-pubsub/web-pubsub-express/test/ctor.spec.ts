// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { WebPubSubEventHandler } from "../src/webPubSubEventHandler";
import { assert } from "chai";

describe("Can creat event handler", function() {
  it("Can provide default path", function() {
    const dispatcher = new WebPubSubEventHandler("hub", ["*"]);
    assert.equal("/api/webpubsub/hubs/hub/", dispatcher.path);
  });

  it("Supports custom path", function() {
    const dispatcher = new WebPubSubEventHandler("hub", ["*"], {
      path: "/custom"
    });
    assert.equal("/custom/", dispatcher.path);
  });

  it("Throw with invalid endpoints", function() {
    assert.throws(() => new WebPubSubEventHandler("hub", ["b.com"]), "Invalid URL: b.com");
  });
});
