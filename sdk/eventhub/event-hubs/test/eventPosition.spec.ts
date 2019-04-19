// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
chai.should();

import { EventPosition } from "../src";

describe("EventPosition", function(): void {
  describe("happy", function(): void {
    it("should create from an offset with inclusive false", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-offset > '1234'";
      const pos = EventPosition.fromOffset("1234");
      result.should.equal(pos.getExpression());
      done();
    });

    it("should create from an offset with inclusive true", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-offset >= '1234'";
      const pos = EventPosition.fromOffset("1234", true);
      result.should.equal(pos.getExpression());
      done();
    });

    it("should create from a sequence with inclusive false", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-sequence-number > '0'";
      const pos = EventPosition.fromSequenceNumber(0);
      result.should.equal(pos.getExpression());
      done();
    });

    it("should create from a sequence with inclusive true", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-sequence-number >= '0'";
      const pos = EventPosition.fromSequenceNumber(0, true);
      result.should.equal(pos.getExpression());
      done();
    });

    it("should create from enqueuedTime with Date as Date", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-enqueued-time > '1537406052971'";
      const d = new Date("2018-09-20T01:14:12.971Z");
      const pos = EventPosition.fromEnqueuedTime(d);
      result.should.equal(pos.getExpression());
      done();
    });

    it("should create from enqueuedTime with Date as number", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-enqueued-time > '1537406052971'";
      const d = new Date("2018-09-20T01:14:12.971Z").getTime();
      const pos = EventPosition.fromEnqueuedTime(d);
      result.should.equal(pos.getExpression());
      done();
    });

    it("should create custom filter", function(done: Mocha.Done): void {
      const custom = "amqp.annotation.x-opt-custom > 'foo-bar'";
      const pos = EventPosition.withCustomFilter(custom);
      custom.should.equal(pos.getExpression());
      done();
    });

    it("should create from an offset from start", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-offset > '-1'";
      const pos = EventPosition.fromStart();
      result.should.equal(pos.getExpression());
      done();
    });

    it("should create from an offset from end", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-offset > '@latest'";
      const pos = EventPosition.fromEnd();
      result.should.equal(pos.getExpression());
      done();
    });
  });
  describe("sad", function(): void {
    it("should fail if empty string is provided for offset", function(done: Mocha.Done): void {
      try {
        EventPosition.fromOffset("");
      } catch (err) {
        err.message.should.match(/'offset' is a required parameter and must be a non-empty string.*/gi);
      }
      done();
    });
  });
});
