// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
chai.should();

import { latestEventPosition, earliestEventPosition } from "../src";
import { getEventPositionFilter } from "../src/eventPosition";

describe("EventPosition #RunnableInBrowser", function(): void {
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
});
