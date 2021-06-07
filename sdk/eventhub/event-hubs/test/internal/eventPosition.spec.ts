// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
chai.should();

import { earliestEventPosition, latestEventPosition } from "../../src";
import { getEventPositionFilter, validateEventPositions } from "../../src/eventPosition";

describe("EventPosition", function(): void {
  describe("happy", function(): void {
    it("should create from an offset with inclusive false", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-offset > '1234'";
      const pos = { offset: 1234 };
      result.should.equal(getEventPositionFilter(pos));
      done();
    });

    it("should create from a sequence with inclusive false", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-sequence-number > '0'";
      const pos = { sequenceNumber: 0 };
      result.should.equal(getEventPositionFilter(pos));
      done();
    });

    it("should create from a sequence with inclusive true", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-sequence-number >= '0'";
      const pos = { sequenceNumber: 0, isInclusive: true };
      result.should.equal(getEventPositionFilter(pos));
      done();
    });

    it("should create from enqueuedTime with Date as Date", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-enqueued-time > '1537406052971'";
      const d = new Date("2018-09-20T01:14:12.971Z");
      const pos = { enqueuedOn: d };
      result.should.equal(getEventPositionFilter(pos));
      done();
    });

    it("should create from enqueuedTime with Date as number", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-enqueued-time > '1537406052971'";
      const d = new Date("2018-09-20T01:14:12.971Z").getTime();
      const pos = { enqueuedOn: d };
      result.should.equal(getEventPositionFilter(pos));
      done();
    });

    // it("should create custom filter", function(done: Mocha.Done): void {
    //   const custom = "amqp.annotation.x-opt-custom > 'foo-bar'";
    //   const pos = EventPosition.withCustomFilter(custom);
    //   custom.should.equal(getEventPositionFilter(pos));
    //   done();
    // });

    it("should create from an offset from start", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-offset > '-1'";
      const pos = earliestEventPosition;
      result.should.equal(getEventPositionFilter(pos));
      done();
    });

    it("should create from an offset from end", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-offset > '@latest'";
      const pos = latestEventPosition;
      result.should.equal(getEventPositionFilter(pos));
      done();
    });
  });

  describe("sad", function(): void {
    it("throws error when empty object is passed for event position", () => {
      const test = function(): void {
        validateEventPositions({});
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Pass an object with either of offset, sequenceNumber or enqueuedOn properties set."
      );
    });
    it("throws error when event position is passed with both offset and sequence number set", () => {
      const test = function(): void {
        validateEventPositions({ offset: 123, sequenceNumber: 456 });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties."
      );
    });
    it("throws error when event position is passed with both offset and enqueuedOn set", () => {
      const test = function(): void {
        validateEventPositions({ offset: 123, enqueuedOn: 456 });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties."
      );
    });
    it("throws error when event position is passed with both sequence number and enqueuedOn set", () => {
      const test = function(): void {
        validateEventPositions({ sequenceNumber: 123, enqueuedOn: 456 });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties."
      );
    });
    it("throws error when empty object is passed in event position map", () => {
      const test = function(): void {
        validateEventPositions({ "1": {}, "2": { offset: 123 } });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Pass an object with either of offset, sequenceNumber or enqueuedOn properties set."
      );
    });
    it("throws error when event position map is passed with both offset and sequence number set", () => {
      const test = function(): void {
        validateEventPositions({ "1": { offset: 123, sequenceNumber: 456 }, "2": { offset: 123 } });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties."
      );
    });
    it("throws error when event position map is passed with both offset and enqueuedOn set", () => {
      const test = function(): void {
        validateEventPositions({ "1": { offset: 123, enqueuedOn: 456 }, "2": { offset: 123 } });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties."
      );
    });
    it("throws error when event position map is passed with both sequence number and enqueuedOn set", () => {
      const test = function(): void {
        validateEventPositions({
          "1": { sequenceNumber: 123, enqueuedOn: 456 },
          "2": { offset: 123 }
        });
      };
      test.should.throw(
        TypeError,
        "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties."
      );
    });
  });
});
