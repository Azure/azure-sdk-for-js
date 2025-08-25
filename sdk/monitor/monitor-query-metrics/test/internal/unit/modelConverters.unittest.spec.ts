// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { Durations } from "@azure/monitor-query-metrics";
import type { QueryTimeInterval } from "@azure/monitor-query-metrics";

describe("Model unit tests", () => {
  describe("Durations", () => {
    it("should have predefined duration constants", () => {
      assert.isDefined(Durations.fiveMinutes);
      assert.isDefined(Durations.thirtyMinutes);
      assert.isDefined(Durations.oneHour);
      assert.isDefined(Durations.fourHours);
      assert.isDefined(Durations.twentyFourHours);
      assert.isDefined(Durations.fortyEightHours);
      assert.isDefined(Durations.oneDay);
      assert.isDefined(Durations.twoDays);
      assert.isDefined(Durations.threeDays);
      assert.isDefined(Durations.sevenDays);
    });

    it("should have correct duration values", () => {
      assert.equal(Durations.fiveMinutes, "PT5M");
      assert.equal(Durations.thirtyMinutes, "PT30M");
      assert.equal(Durations.oneHour, "PT1H");
      assert.equal(Durations.fourHours, "PT4H");
      assert.equal(Durations.twentyFourHours, "PT24H");
      assert.equal(Durations.fortyEightHours, "PT48H");
      assert.equal(Durations.oneDay, "P1D");
      assert.equal(Durations.twoDays, "P2D");
      assert.equal(Durations.threeDays, "P3D");
      assert.equal(Durations.sevenDays, "P7D");
    });
  });

  describe("QueryTimeInterval", () => {
    it("should accept duration only", () => {
      const interval: QueryTimeInterval = { duration: "PT1H" };
      assert.equal(interval.duration, "PT1H");
    });

    it("should accept start and end times", () => {
      const startTime = new Date("2023-01-01T00:00:00Z");
      const endTime = new Date("2023-01-01T01:00:00Z");
      const interval: QueryTimeInterval = { startTime, endTime };

      assert.equal(interval.startTime, startTime);
      assert.equal(interval.endTime, endTime);
    });

    it("should accept start time and duration", () => {
      const startTime = new Date("2023-01-01T00:00:00Z");
      const interval: QueryTimeInterval = { startTime, duration: "PT1H" };

      assert.equal(interval.startTime, startTime);
      assert.equal(interval.duration, "PT1H");
    });

    it("should accept end time and duration", () => {
      const endTime = new Date("2023-01-01T01:00:00Z");
      const interval: QueryTimeInterval = { endTime, duration: "PT1H" };

      assert.equal(interval.endTime, endTime);
      assert.equal(interval.duration, "PT1H");
    });
  });
});
