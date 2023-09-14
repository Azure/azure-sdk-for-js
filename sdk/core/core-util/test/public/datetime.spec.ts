// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { toOffsetDateTime } from "../../src/datetime";
import { assert } from "chai";
import moment from "moment";

describe("utcDateTime with timezone offset", function () {
  describe("work at current datetime", function () {
    it("the unixtime diff should be correct in default milliseconds precision", function () {
      const date = new Date();
      assert.strictEqual(
        Math.floor(
          Math.abs(Date.parse(toOffsetDateTime(date)) - Date.parse(date.toISOString())) / 1000
        ),
        0
      );
    });
    it("the unixtime diff should be correct in 0 milliseconds precision", function () {
      const date = new Date();
      assert.strictEqual(
        Math.floor(
          Math.abs(Date.parse(toOffsetDateTime(date, 0)) - Date.parse(date.toISOString())) / 1000
        ),
        0
      );
    });
    it("the unixtime diff should be correct in 1 milliseconds precision", function () {
      const date = new Date();
      assert.strictEqual(
        Math.floor(
          Math.abs(Date.parse(toOffsetDateTime(date, 1)) - Date.parse(date.toISOString())) / 100
        ),
        0
      );
    });

    it("the unixtime diff should be correct in 2 milliseconds precision", function () {
      const date = new Date();
      assert.strictEqual(
        Math.floor(
          Math.abs(Date.parse(toOffsetDateTime(date, 2)) - Date.parse(date.toISOString())) / 10
        ),
        0
      );
    });

    it("the unixtime diff should be correct in 3 milliseconds precision", function () {
      const date = new Date();
      assert.strictEqual(
        Math.floor(
          Math.abs(Date.parse(toOffsetDateTime(date, 3)) - Date.parse(date.toISOString()))
        ),
        0
      );
    });

    it("the to offset datetime should be correct in default milliseconds precision", function () {
      const date = new Date();
      // assert.strictEqual(moment(date).format(), "2022-01-06T03:08:10+08:00");
      assert.strictEqual(toOffsetDateTime(date), moment(date).format());
    });
    it("the to offset datetime should be correct in 0 milliseconds precision", function () {
      const date = new Date();
      assert.strictEqual(toOffsetDateTime(date, 0), moment(date).format("YYYY-MM-DDTHH:mm:ssZ"));
    });
    it("the to offset datetime should be correct in 1 milliseconds precision", function () {
      const date = new Date();
      assert.strictEqual(toOffsetDateTime(date, 1), moment(date).format("YYYY-MM-DDTHH:mm:ss.SZ"));
    });

    it("the to offset datetime should be correct in 2 milliseconds precision", function () {
      const date = new Date();
      assert.strictEqual(toOffsetDateTime(date, 2), moment(date).format("YYYY-MM-DDTHH:mm:ss.SSZ"));
    });

    it("the to offset datetime should be correct in 3 milliseconds precision", function () {
      const date = new Date();
      assert.strictEqual(
        toOffsetDateTime(date, 3),
        moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
      );
    });
  });

  describe("work in 2022-01-05T19:08:10.000Z", function () {
    it("the timezone offset should be correct in default milliseconds precision", function () {
      const date = new Date("2022-01-05T19:08:10.000Z");
      // assert.strictEqual(moment(date).format(), "2022-01-06T03:08:10+08:00");
      assert.strictEqual(toOffsetDateTime(date), moment(date).format());
      assert.strictEqual(Date.parse(toOffsetDateTime(date)) - Date.parse(date.toISOString()), 0);
    });

    it("the timezone offset should be correct in 0 milliseconds precision", function () {
      const date = new Date("2022-01-05T19:08:10.000Z");
      assert.strictEqual(toOffsetDateTime(date, 0), moment(date).format("YYYY-MM-DDTHH:mm:ssZ"));
      assert.strictEqual(Date.parse(toOffsetDateTime(date, 0)) - Date.parse(date.toISOString()), 0);
    });

    it("the timezone offset should be correct in 1 milliseconds precision", function () {
      const date = new Date("2022-01-05T19:08:10.000Z");
      assert.strictEqual(toOffsetDateTime(date, 1), moment(date).format("YYYY-MM-DDTHH:mm:ss.SZ"));
      assert.strictEqual(Date.parse(toOffsetDateTime(date, 1)) - Date.parse(date.toISOString()), 0);
    });

    it("the timezone offset should be correct in 2 milliseconds precision", function () {
      const date = new Date("2022-01-05T19:08:10.000Z");
      assert.strictEqual(toOffsetDateTime(date, 2), moment(date).format("YYYY-MM-DDTHH:mm:ss.SSZ"));
      assert.strictEqual(Date.parse(toOffsetDateTime(date, 2)) - Date.parse(date.toISOString()), 0);
    });

    it("the timezone offset should be correct in 3 milliseconds precision", function () {
      const date = new Date("2022-01-05T19:08:10.000Z");
      assert.strictEqual(
        toOffsetDateTime(date, 3),
        moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
      );
      assert.strictEqual(Date.parse(toOffsetDateTime(date, 3)) - Date.parse(date.toISOString()), 0);
    });
  });
});
