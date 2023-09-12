// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { toOffsetDateTime } from "../../src/datetime";
import { assert } from "chai";

describe("utcDateTime with timezone offset", function () {

  describe("work in +08:00 timezone", function () {
    it("converts a base64 string to bytes", function () {
      const date = new Date("2022-01-05T19:08:10Z");
      assert.strictEqual(toOffsetDateTime(date), "2022-01-05T19:08:10.000+08:00");
    });
  });
});
