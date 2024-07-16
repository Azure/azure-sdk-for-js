// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { earliestEventPosition, latestEventPosition } from "../../src/index.js";
import { getEventPositionFilter, validateEventPositions } from "../../src/eventPosition.js";
import { describe, it } from "vitest";
import "../utils/chai.js";

describe("EventPosition", function () {
  describe("happy", function () {
    it("should create from an offset with inclusive false", async function () {
      const result = "amqp.annotation.x-opt-offset > '1234'";
      const pos = { offset: "1234" };
      result.should.equal(getEventPositionFilter(pos));
    });

    it("should create from a sequence with inclusive false", async function () {
      const result = "amqp.annotation.x-opt-sequence-number > '0'";
      const pos = { sequenceNumber: 0 };
      result.should.equal(getEventPositionFilter(pos));
    });

    it("should create from a sequence with inclusive true", async function () {
      const result = "amqp.annotation.x-opt-sequence-number >= '0'";
      const pos = { sequenceNumber: 0, isInclusive: true };
      result.should.equal(getEventPositionFilter(pos));
    });

    it("should create from enqueuedTime with Date as Date", async function () {
      const result = "amqp.annotation.x-opt-enqueued-time > '1537406052971'";
      const d = new Date("2018-09-20T01:14:12.971Z");
      const pos = { enqueuedOn: d };
      result.should.equal(getEventPositionFilter(pos));
    });

    it("should create from enqueuedTime with Date as number", async function () {
      const result = "amqp.annotation.x-opt-enqueued-time > '1537406052971'";
      const d = new Date("2018-09-20T01:14:12.971Z").getTime();
      const pos = { enqueuedOn: d };
      result.should.equal(getEventPositionFilter(pos));
    });

    // it("should create custom filter", async function() {
    //   const custom = "amqp.annotation.x-opt-custom > 'foo-bar'";
    //   const pos = EventPosition.withCustomFilter(custom);
    //   custom.should.equal(getEventPositionFilter(pos));
    // });

    it("should create from an offset from start", async function () {
      const result = "amqp.annotation.x-opt-offset > '-1'";
      const pos = earliestEventPosition;
      result.should.equal(getEventPositionFilter(pos));
    });

    it("should create from an offset from end", async function () {
      const result = "amqp.annotation.x-opt-offset > '@latest'";
      const pos = latestEventPosition;
      result.should.equal(getEventPositionFilter(pos));
    });
  });

  describe("sad", function () {
    it("throws error when empty object is passed for event position", async function () {
      const test = function (): void {
        validateEventPositions({});
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Pass an object with either of offset, sequenceNumber or enqueuedOn properties set.",
      );
    });

    it("throws error when event position is passed with both offset and sequence number set", async function () {
      const test = function (): void {
        validateEventPositions({ offset: "123", sequenceNumber: 456 });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties.",
      );
    });

    it("throws error when event position is passed with both offset and enqueuedOn set", async function () {
      const test = function (): void {
        validateEventPositions({ offset: "123", enqueuedOn: 456 });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties.",
      );
    });

    it("throws error when event position is passed with both sequence number and enqueuedOn set", async function () {
      const test = function (): void {
        validateEventPositions({ sequenceNumber: 123, enqueuedOn: 456 });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties.",
      );
    });

    it("throws error when empty object is passed in event position map", async function () {
      const test = function (): void {
        validateEventPositions({ "1": {}, "2": { offset: "123" } });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Pass an object with either of offset, sequenceNumber or enqueuedOn properties set.",
      );
    });

    it("throws error when event position map is passed with both offset and sequence number set", async function () {
      const test = function (): void {
        validateEventPositions({
          "1": { offset: "123", sequenceNumber: 456 },
          "2": { offset: "123" },
        });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties.",
      );
    });

    it("throws error when event position map is passed with both offset and enqueuedOn set", async function () {
      const test = function (): void {
        validateEventPositions({
          "1": { offset: "123", enqueuedOn: 456 },
          "2": { offset: "123" },
        });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties.",
      );
    });

    it("throws error when event position map is passed with both sequence number and enqueuedOn set", async function () {
      const test = function (): void {
        validateEventPositions({
          "1": { sequenceNumber: 123, enqueuedOn: 456 },
          "2": { offset: "123" },
        });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties.",
      );
    });
  });
});
