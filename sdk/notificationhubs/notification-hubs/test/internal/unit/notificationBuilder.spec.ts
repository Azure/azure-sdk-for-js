// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { buildAppleNativeMessage } from "../../../src/models/notificationBuilder.js";

describe("buildAppleNativeMessage", () => {
  it("should handle kebab cased properties", () => {
    const message = buildAppleNativeMessage({
      interruptionLevel: "time-sensitive",
      mutableContent: 1,
      contentAvailable: 1,
      threadId: "123",
      relevanceScore: 1,
      filterCriteria: "foobar",
    });

    const parsed = JSON.parse(message.body);

    assert.equal(parsed.aps["interruption-level"], "time-sensitive");
    assert.equal(parsed.aps["mutable-content"], 1);
    assert.equal(parsed.aps["content-available"], 1);
    assert.equal(parsed.aps["thread-id"], "123");
    assert.equal(parsed.aps["relevance-score"], 1);
    assert.equal(parsed.aps["filter-criteria"], "foobar");
  });

  it("should build an alert object", () => {
    const message = buildAppleNativeMessage({
      alert: {
        title: "TITLE",
        subtitle: "SUBTITLE",
        body: "BODY",
        launchImage: "IMAGE.JPG",
      },
    });

    const parsed = JSON.parse(message.body);

    assert.equal(parsed.aps.alert.title, "TITLE");
    assert.equal(parsed.aps.alert.subtitle, "SUBTITLE");
    assert.equal(parsed.aps.alert.body, "BODY");
    assert.equal(parsed.aps.alert["launch-image"], "IMAGE.JPG");
  });

  it("should build an alert string", () => {
    const message = buildAppleNativeMessage({
      alert: "ALERT",
    });

    const parsed = JSON.parse(message.body);

    assert.equal(parsed.aps.alert, "ALERT");
  });

  it("should build a sound object", () => {
    const message = buildAppleNativeMessage({
      sound: {
        critical: 1,
        name: "SOUND",
        volume: 1,
      },
    });

    const parsed = JSON.parse(message.body);

    assert.equal(parsed.aps.sound.critical, 1);
    assert.equal(parsed.aps.sound.name, "SOUND");
    assert.equal(parsed.aps.sound.volume, 1);
  });

  it("should build a sound string", () => {
    const message = buildAppleNativeMessage({
      sound: "SOUND",
    });

    const parsed = JSON.parse(message.body);

    assert.equal(parsed.aps.sound, "SOUND");
  });
});
