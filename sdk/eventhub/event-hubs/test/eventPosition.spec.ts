// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
chai.should();

import { EventPosition } from "../src";
import { getEventPositionFilter } from "../src/eventPosition";

describe("EventPosition #RunnableInBrowser", function(): void {
  describe("happy", function(): void {
    it("should create from an offset with inclusive false", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-offset > '1234'";
      const pos = EventPosition.fromOffset(1234);
      result.should.equal(getEventPositionFilter(pos));
      done();
    });

    it("should create from a sequence with inclusive false", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-sequence-number > '0'";
      const pos = EventPosition.fromSequenceNumber(0);
      result.should.equal(getEventPositionFilter(pos));
      done();
    });

    it("should create from a sequence with inclusive true", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-sequence-number >= '0'";
      const pos = EventPosition.fromSequenceNumber(0, true);
      result.should.equal(getEventPositionFilter(pos));
      done();
    });

    it("should create from enqueuedTime with Date as Date", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-enqueued-time > '1537406052971'";
      const d = new Date("2018-09-20T01:14:12.971Z");
      const pos = EventPosition.fromEnqueuedTime(d);
      result.should.equal(getEventPositionFilter(pos));
      done();
    });

    it("should create from enqueuedTime with Date as number", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-enqueued-time > '1537406052971'";
      const d = new Date("2018-09-20T01:14:12.971Z").getTime();
      const pos = EventPosition.fromEnqueuedTime(d);
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
      const pos = EventPosition.earliest();
      result.should.equal(getEventPositionFilter(pos));
      done();
    });

    it("should create from an offset from end", function(done: Mocha.Done): void {
      const result = "amqp.annotation.x-opt-offset > '@latest'";
      const pos = EventPosition.latest();
      result.should.equal(getEventPositionFilter(pos));
      done();
    });
  });

  describe("fromOffset", function(): void {
    it("should accept a number", function(): void {
      const offset = 100;
      const pos = EventPosition.fromOffset(offset);
      pos.offset!.should.equal(offset);
    });

    it("should accept 0", function(): void {
      const offset = 0;
      const pos = EventPosition.fromOffset(offset);
      pos.offset!.should.equal(offset);
    });

    it("should accept '@latest'", function(): void {
      const offset = "@latest";
      const pos = EventPosition.fromOffset(offset as any);
      pos.offset!.should.equal(offset);
    });

    it("should accept strings", function(): void {
      const offset = "12345";
      const pos = EventPosition.fromOffset(offset as any);
      pos.offset!.should.equal(offset);
    });

    it("should not accept non-number/non-'@latest' inputs", function(): void {
      chai.should().throw(() => EventPosition.fromOffset(true as any));
      chai.should().throw(() => EventPosition.fromOffset(false as any));
      chai.should().throw(() => EventPosition.fromOffset(new Date() as any));
      chai.should().throw(() => EventPosition.fromOffset({} as any));
      chai.should().throw(() => EventPosition.fromOffset(null as any));
      chai.should().throw(() => EventPosition.fromOffset(undefined as any));
    });
  });

  describe("fromEnqueuedTime", function(): void {
    it("should accept a number", function(): void {
      const enqueuedTime = Date.now();
      const pos = EventPosition.fromEnqueuedTime(enqueuedTime);
      pos.enqueuedOn!.should.equal(enqueuedTime);
    });

    it("should accept a Date", function(): void {
      const enqueuedTime = new Date();
      const pos = EventPosition.fromEnqueuedTime(enqueuedTime);
      pos.enqueuedOn!.should.equal(enqueuedTime);
    });

    it("should not accept non-number/non-date inputs", function(): void {
      chai.should().throw(() => EventPosition.fromEnqueuedTime("abc" as any));
      chai.should().throw(() => EventPosition.fromEnqueuedTime(true as any));
      chai.should().throw(() => EventPosition.fromEnqueuedTime(false as any));
      chai.should().throw(() => EventPosition.fromEnqueuedTime({} as any));
      chai.should().throw(() => EventPosition.fromEnqueuedTime(null as any));
      chai.should().throw(() => EventPosition.fromEnqueuedTime(undefined as any));
    });
  });
});
