// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { toOffsetDateTime } from "../../src/datetime";
import { assert } from "chai";

describe("utcDateTime with timezone offset", function () {
  describe("work in +08:00 timezone", function () {
    it("the timezone offset should be correct", function () {
      const date = new Date("2022-01-05T19:08:10.000Z");
      assert.strictEqual(Date.parse(toOffsetDateTime(date)) - Date.parse(date.toISOString()), 0);
    });
  });
});
