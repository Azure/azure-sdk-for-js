// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import {
  isDirectSendNotificationOptions,
  isSendNotificationOptions,
} from "../../../src/utils/optionUtils.js";

describe("optionUtils", () => {
  describe("isSendNotificationOptions", () => {
    it("should return true if options has tagExpression", () => {
      const options = { tagExpression: "tag" };
      assert.isTrue(isSendNotificationOptions(options));
    });

    it("should return true if options has enableTestSend", () => {
      const options = { enableTestSend: true };
      assert.isTrue(isSendNotificationOptions(options));
    });

    it("should return false if options is bad", () => {
      const options1 = undefined;
      assert.isFalse(isSendNotificationOptions(options1));

      const options2 = null;
      assert.isFalse(isSendNotificationOptions(options2));

      const options3 = "";
      assert.isFalse(isSendNotificationOptions(options3));

      const options4 = {};
      assert.isFalse(isSendNotificationOptions(options4));
    });
  });

  describe("isDirectSendNotificationOptions", () => {
    it("should return true if options has deviceHandle", () => {
      const options = { deviceHandle: "handle" };
      assert.isTrue(isDirectSendNotificationOptions(options));
    });

    it("should return false if options is bad", () => {
      const options1 = undefined;
      assert.isFalse(isDirectSendNotificationOptions(options1));

      const options2 = null;
      assert.isFalse(isDirectSendNotificationOptions(options2));

      const options3 = "";
      assert.isFalse(isDirectSendNotificationOptions(options3));

      const options4 = {};
      assert.isFalse(isDirectSendNotificationOptions(options4));
    });
  });
});
