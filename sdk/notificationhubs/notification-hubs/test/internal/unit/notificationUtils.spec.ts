// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createMultipartDirectNotification,
  normalizeTags,
} from "../../../src/utils/notificationUtils.js";
import { assert } from "@azure/test-utils";
import { createAppleNotification } from "../../../src/models/notification.js";

describe("notificationUtils", () => {
  describe("createMultipartDirectNotification", () => {
    it("should create a multipart message", () => {
      const notification = createAppleNotification({
        body: `{"aps":{"alert":"Hello"}}`,
      });
      const deviceHandles = ["123", "456", "789"];
      const boundary = "nh-boundary-test";
      const result = createMultipartDirectNotification(boundary, notification, deviceHandles);

      assert.isTrue(result.includes("--nh-boundary-test--"));
      assert.isTrue(result.includes(notification.body));
      assert.isTrue(result.includes(JSON.stringify(deviceHandles)));
      assert.isTrue(result.includes("\r\n"));
    });
  });

  describe("normalizeTags", () => {
    it("should parse an array into or statements", () => {
      const tags = ["abc", "def"];

      const result = normalizeTags(tags);

      assert.equal(result, "abc||def");
    });

    it("should return a string as the tag expression", () => {
      const tags = "abc||def";

      const result = normalizeTags(tags);

      assert.equal(result, "abc||def");
    });
  });
});
