// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { dateToServiceTimeString } from "../../src/util";

describe("util", function () {
  describe("dateToServiceTimeString", () => {
    it("converts dates correctly", () => {
      const simpleMorningDate = new Date(Date.UTC(2020, 0, 2, 3, 4, 5));
      assert.equal(dateToServiceTimeString(simpleMorningDate), "1/2/2020 3:04:05 AM");

      const simpleAfternoonDate = new Date(Date.UTC(2020, 0, 2, 13, 10, 21));
      assert.equal(dateToServiceTimeString(simpleAfternoonDate), "1/2/2020 1:10:21 PM");

      const slightlyAfterMidnight = new Date(Date.UTC(2020, 0, 2, 0, 10, 21));
      assert.equal(dateToServiceTimeString(slightlyAfterMidnight), "1/2/2020 12:10:21 AM");
    });

    it("converts am/pm correctly", () => {
      const slightlyAfterNoon = new Date(Date.UTC(2020, 0, 2, 12, 10, 21));
      assert.equal(dateToServiceTimeString(slightlyAfterNoon), "1/2/2020 12:10:21 PM");
    });
  });
});
