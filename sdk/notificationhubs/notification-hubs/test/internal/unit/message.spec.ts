// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { 
  createAdmMessage, 
  createAppleMessage, 
  createBaiduMessage, 
  createBrowserMessage, 
  createFirebaseLegacyMessage, 
  createTemplateMessage, 
  createWindowsBadgeMessage, 
  createWindowsRawMessage, 
  createWindowsTileMessage, 
  createWindowsToastMessage, 
  JSON_CONTENT_TYPE, 
  STREAM_CONTENT_TYPE,
  WNS_BADGE,
  WNS_RAW,
  WNS_TITLE,
  WNS_TOAST,
  WNS_TYPE_NAME,
  XML_CONTENT_TYPE
} from "../../../src/models/message";

describe("createAppleMessage", () => {
  it("should create an apple message with defaults", () => {
    const message = createAppleMessage({
      body: `{"aps":{"alert":"Hello"}}`
    });

    assert.equal(message.contentType, JSON_CONTENT_TYPE);
    assert.equal(message.platform, "apple");
    assert.equal(message.body, `{"aps":{"alert":"Hello"}}`);
  });
});

describe("createAdmMessage", () => {
  it("should create an ADM message with defaults", () => {
    const message = createAdmMessage({
      body: `{"data":{"message":"Hello}}`
    });

    assert.equal(message.contentType, JSON_CONTENT_TYPE);
    assert.equal(message.platform, "adm");
    assert.equal(message.body, `{"data":{"message":"Hello}}`);
  });
});

describe("createBaiduMessage", () => {
  it("should create a Baidu message with defaults", () => {
    const message = createBaiduMessage({
      body: `{"title":"(Hello title)","description":"Hello"}`
    });

    assert.equal(message.contentType, JSON_CONTENT_TYPE);
    assert.equal(message.platform, "baidu");
    assert.equal(message.body, `{"title":"(Hello title)","description":"Hello"}`);
  });
});

describe("createBrowserMessage", () => {
  it("should create a Baidu message with defaults", () => {
    const message = createBrowserMessage({
      body: `{"title":"(Hello title)","body":"Hello"}`
    });

    assert.equal(message.contentType, JSON_CONTENT_TYPE);
    assert.equal(message.platform, "browser");
    assert.equal(message.body, `{"title":"(Hello title)","body":"Hello"}`);
  });
});

describe("createFirebaseLegacyMessage", () => {
  it("should create a Firebase message with defaults", () => {
    const message = createFirebaseLegacyMessage({
      body: `{"notification":{"title":"mytitle","body":"Hello}}`
    });

    assert.equal(message.contentType, JSON_CONTENT_TYPE);
    assert.equal(message.platform, "gcm");
    assert.equal(message.body, `{"notification":{"title":"mytitle","body":"Hello}}`);
  });
});

describe("createTemplateMessage", () => {
  it("should create a Template message with defaults", () => {
    const message = createTemplateMessage({
      body: `{"title":"(Hello title)","body":"Hello"}`
    });

    assert.equal(message.contentType, JSON_CONTENT_TYPE);
    assert.equal(message.platform, "template");
    assert.equal(message.body, `{"title":"(Hello title)","body":"Hello"}`);
  });
});

describe("createWindowsBadgeMessage", () => {
  it("should create a badge Windows message with defaults", () => {
    const message = createWindowsBadgeMessage({
      body: `badge WNS Message`
    });

    assert.equal(message.contentType, XML_CONTENT_TYPE);
    assert.equal(message.platform, "wns");
    assert.equal(message.body, `badge WNS Message`);
    assert.equal(message.headers![WNS_TYPE_NAME], WNS_BADGE);
  });
});

describe("createWindowsTileMessage", () => {
  it("should create a tile Windows message with defaults", () => {
    const message = createWindowsTileMessage({
      body: `tile WNS Message`
    });

    assert.equal(message.contentType, XML_CONTENT_TYPE);
    assert.equal(message.platform, "wns");
    assert.equal(message.body, `tile WNS Message`);
    assert.equal(message.headers![WNS_TYPE_NAME], WNS_TITLE);
  });
});

describe("createWindowsToastMessage", () => {
  it("should create a toast Windows message with defaults", () => {
    const message = createWindowsToastMessage({
      body: `toast WNS Message`
    });

    assert.equal(message.contentType, XML_CONTENT_TYPE);
    assert.equal(message.platform, "wns");
    assert.equal(message.body, `toast WNS Message`);
    assert.equal(message.headers![WNS_TYPE_NAME], WNS_TOAST);
  });
});

describe("createWindowsRawMessage", () => {
  it("should create a raw Windows message with defaults", () => {
    const message = createWindowsRawMessage({
      body: `raw WNS Message`
    });

    assert.equal(message.contentType, STREAM_CONTENT_TYPE);
    assert.equal(message.platform, "wns");
    assert.equal(message.body, `raw WNS Message`);
    assert.equal(message.headers![WNS_TYPE_NAME], WNS_RAW);
  });
});
