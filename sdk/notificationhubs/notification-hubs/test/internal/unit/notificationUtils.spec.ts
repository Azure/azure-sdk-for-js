// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createAppleNotification } from "../../../src/models/notification.js";
import { createMultipartDirectNotification } from "../../../src/utils/notificationUtils.js";

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
});
