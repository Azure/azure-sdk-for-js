// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import * as Constants from "../../../src/utils/constants.js";
import {
  createAdmNotification,
  createAppleNotification,
  createBaiduNotification,
  createBrowserNotification,
  createFcmLegacyNotification,
  createFcmV1Notification,
  createTemplateNotification,
  createXiaomiNotification,
  createWindowsBadgeNotification,
  createWindowsRawNotification,
  createWindowsTileNotification,
  createWindowsToastNotification,
} from "../../../src/models/notification.js";

describe("createAppleNotification", () => {
  it("should create an apple message with defaults", () => {
    const notification = createAppleNotification({
      body: `{"aps":{"alert":"Hello"}}`,
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "apple");
    assert.equal(notification.body, `{"aps":{"alert":"Hello"}}`);
  });

  it("should create an apple message with custom object", () => {
    const notification = createAppleNotification({
      body: { aps: { alert: "Hello" } },
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "apple");
    assert.equal(notification.body, `{"aps":{"alert":"Hello"}}`);
  });

  it("should create an apple message with Apple Headers", () => {
    const notification = createAppleNotification({
      body: `{"aps":{"alert":"Hello"}}`,
      headers: {
        "apns-push-type": "alert",
        "apns-id": "1234",
        "apns-expiration": "100",
        "apns-priority": "10",
        "apns-topic": "com.example.myapp",
        "apns-collapse-id": "1234",
      },
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "apple");
    assert.equal(notification.body, `{"aps":{"alert":"Hello"}}`);
    assert.equal(notification.headers!["apns-push-type"], "alert");
    assert.equal(notification.headers!["apns-id"], "1234");
    assert.equal(notification.headers!["apns-expiration"], "100");
    assert.equal(notification.headers!["apns-priority"], "10");
    assert.equal(notification.headers!["apns-topic"], "com.example.myapp");
    assert.equal(notification.headers!["apns-collapse-id"], "1234");
  });
});

describe("createAdmNotification", () => {
  it("should create an ADM message with defaults", () => {
    const notification = createAdmNotification({
      body: `{"data":{"message":"Hello"}}`,
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "adm");
    assert.equal(notification.body, `{"data":{"message":"Hello"}}`);
  });

  it("should create an ADM message with custom object", () => {
    const notification = createAdmNotification({
      body: { data: { message: "Hello" } },
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "adm");
    assert.equal(notification.body, `{"data":{"message":"Hello"}}`);
  });
});

describe("createBaiduNotification", () => {
  it("should create a Baidu message with defaults", () => {
    const notification = createBaiduNotification({
      body: `{"title":"(Hello title)","description":"Hello"}`,
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "baidu");
    assert.equal(notification.body, `{"title":"(Hello title)","description":"Hello"}`);
  });

  it("should create a Baidu message with custom object", () => {
    const notification = createBaiduNotification({
      body: { title: "(Hello title)", description: "Hello" },
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "baidu");
    assert.equal(notification.body, `{"title":"(Hello title)","description":"Hello"}`);
  });
});

describe("createBrowserNotification", () => {
  it("should create a Web Push message with defaults", () => {
    const notification = createBrowserNotification({
      body: `{"title":"(Hello title)","body":"Hello"}`,
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "browser");
    assert.equal(notification.body, `{"title":"(Hello title)","body":"Hello"}`);
  });

  it("should create a Web Push message with custom object", () => {
    const notification = createBrowserNotification({
      body: { title: "(Hello title)", body: "Hello" },
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "browser");
    assert.equal(notification.body, `{"title":"(Hello title)","body":"Hello"}`);
  });
});

describe("createFcmV1Notification", () => {
  it("should create a Firebase message with defaults", () => {
    const notification = createFcmV1Notification({
      body: `{"notification":{"title":"TITLE","body":"Hello"}}`,
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "fcmv1");
    assert.equal(notification.body, `{"notification":{"title":"TITLE","body":"Hello"}}`);
  });

  it("should create a Firebase message with custom object", () => {
    const notification = createFcmV1Notification({
      body: { notification: { title: "TITLE", body: "Hello" } },
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "fcmv1");
    assert.equal(notification.body, `{"notification":{"title":"TITLE","body":"Hello"}}`);
  });
});

describe("createFcmLegacyNotification", () => {
  it("should create a Firebase message with defaults", () => {
    const notification = createFcmLegacyNotification({
      body: `{"notification":{"title":"TITLE","body":"Hello"}}`,
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "gcm");
    assert.equal(notification.body, `{"notification":{"title":"TITLE","body":"Hello"}}`);
  });

  it("should create a Firebase message with custom object", () => {
    const notification = createFcmLegacyNotification({
      body: { notification: { title: "TITLE", body: "Hello" } },
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "gcm");
    assert.equal(notification.body, `{"notification":{"title":"TITLE","body":"Hello"}}`);
  });
});

describe("createTemplateNotification", () => {
  it("should create a Template message with defaults", () => {
    const notification = createTemplateNotification({
      body: `{"title":"(Hello title)","body":"Hello"}`,
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "template");
    assert.equal(notification.body, `{"title":"(Hello title)","body":"Hello"}`);
  });

  it("should create a Template message with custom object", () => {
    const notification = createTemplateNotification({
      body: { title: "(Hello title)", body: "Hello" },
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "template");
    assert.equal(notification.body, `{"title":"(Hello title)","body":"Hello"}`);
  });
});

describe("createXiaomiNotification", () => {
  it("should create a Xiaomi message with defaults", () => {
    const notification = createXiaomiNotification({
      body: `{"data":{"message":"Hello"}}`,
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "xiaomi");
    assert.equal(notification.body, `{"data":{"message":"Hello"}}`);
  });

  it("should create a Xiaomi message with custom object", () => {
    const notification = createXiaomiNotification({
      body: { data: { message: "Hello" } },
    });

    assert.equal(notification.contentType, Constants.JSON_CONTENT_TYPE);
    assert.equal(notification.platform, "xiaomi");
    assert.equal(notification.body, `{"data":{"message":"Hello"}}`);
  });
});

describe("createWindowsBadgeNotification", () => {
  it("should create a badge Windows message with defaults", () => {
    const notification = createWindowsBadgeNotification({
      body: `badge WNS Message`,
    });

    assert.equal(notification.contentType, Constants.XML_CONTENT_TYPE);
    assert.equal(notification.platform, "windows");
    assert.equal(notification.body, `badge WNS Message`);
    assert.equal(notification.headers![Constants.WNS_TYPE_NAME], Constants.WNS_BADGE);
  });
});

describe("createWindowsTileNotification", () => {
  it("should create a tile Windows message with defaults", () => {
    const notification = createWindowsTileNotification({
      body: `tile WNS Message`,
    });

    assert.equal(notification.contentType, Constants.XML_CONTENT_TYPE);
    assert.equal(notification.platform, "windows");
    assert.equal(notification.body, `tile WNS Message`);
    assert.equal(notification.headers![Constants.WNS_TYPE_NAME], Constants.WNS_TITLE);
  });
});

describe("createWindowsToastNotification", () => {
  it("should create a toast Windows message with defaults", () => {
    const notification = createWindowsToastNotification({
      body: `toast WNS Message`,
    });

    assert.equal(notification.contentType, Constants.XML_CONTENT_TYPE);
    assert.equal(notification.platform, "windows");
    assert.equal(notification.body, `toast WNS Message`);
    assert.equal(notification.headers![Constants.WNS_TYPE_NAME], Constants.WNS_TOAST);
  });
});

describe("createWindowsRawNotification", () => {
  it("should create a raw Windows message with defaults", () => {
    const notification = createWindowsRawNotification({
      body: `raw WNS Message`,
    });

    assert.equal(notification.contentType, Constants.STREAM_CONTENT_TYPE);
    assert.equal(notification.platform, "windows");
    assert.equal(notification.body, `raw WNS Message`);
    assert.equal(notification.headers![Constants.WNS_TYPE_NAME], Constants.WNS_RAW);
  });
});
