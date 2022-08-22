// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  buildAdmNativeMessage,
  buildAppleNativeMessage,
  buildFirebaseLegacyNativeMessage,
  buildWindowsBadgeNativeMessage,
} from "../../../src/models/notificationBuilder.js";
import { assert } from "@azure/test-utils";

describe("buildAdmNativeMessage", () => {
  it("should build a data message", () => {
    const message = buildAdmNativeMessage({
      data: {
        data1: "DATA1",
        data2: "DATA2",
      },
    });

    const parsed = JSON.parse(message.body);

    assert.equal(parsed.data.data1, "DATA1");
    assert.equal(parsed.data.data2, "DATA2");
  });

  it("should build a notification", () => {
    const message = buildAdmNativeMessage({
      notification: {
        title: "TITLE",
        body: "BODY",
        icon: "ICON",
        color: "COLOR",
      },
    });

    const parsed = JSON.parse(message.body);

    assert.equal(parsed.notification.title, "TITLE");
    assert.equal(parsed.notification.body, "BODY");
    assert.equal(parsed.notification.icon, "ICON");
    assert.equal(parsed.notification.color, "COLOR");
  });
});

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

describe("buildFirebaseLegacyNativeMessage", () => {
  it("should handle snake_case properties", () => {
    const message = buildFirebaseLegacyNativeMessage({
      registrationIds: ["one", "two", "three"],
      collapseKey: "1",
      timeToLive: 123,
      dryRun: true,
    });

    const parsed = JSON.parse(message.body);

    assert.equal(parsed.collapse_key, "1");
    assert.deepEqual(parsed.registration_ids, ["one", "two", "three"]);
    assert.equal(parsed.time_to_live, 123);
    assert.equal(parsed.dry_run, true);
  });

  it("should handle a notification object", () => {
    const message = buildFirebaseLegacyNativeMessage({
      notification: {
        title: "TITLE",
        body: "BODY",
        clickAction: "CLICK",
      },
    });

    const parsed = JSON.parse(message.body);

    assert.equal(parsed.notification.title, "TITLE");
    assert.equal(parsed.notification.body, "BODY");
    assert.equal(parsed.notification.click_action, "CLICK");
  });

  it("should handle a data object", () => {
    const message = buildFirebaseLegacyNativeMessage({
      data: {
        data1: "DATA1",
        data2: "DATA2",
      },
    });

    const parsed = JSON.parse(message.body);

    assert.equal(parsed.data.data1, "DATA1");
    assert.equal(parsed.data.data2, "DATA2");
  });
});

describe("buildWindowsBadgeNativeMessage", () => {
  it("should handle a notification count", () => {
    const message = buildWindowsBadgeNativeMessage({
      value: 99,
    });

    assert.equal(
      message.body,
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><badge value="99"/>`
    );
  });

  it("should handle a glyph", () => {
    const message = buildWindowsBadgeNativeMessage({
      value: "newMessage",
    });

    assert.equal(
      message.body,
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><badge value="newMessage"/>`
    );
  });
});
