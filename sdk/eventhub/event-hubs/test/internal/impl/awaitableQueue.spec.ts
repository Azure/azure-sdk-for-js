// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AwaitableQueue } from "../../../src/impl/awaitableQueue";
import chai from "chai";
import { testWithServiceTypes } from "../../public/utils/testWithServiceTypes";

const should = chai.should();

testWithServiceTypes(() => {
  describe("AwaitableQueue", () => {
    it("can be instantiated", () => {
      const queue = new AwaitableQueue();
      should.exist(queue, "queue was not defined.");
      should.equal(queue.size(), 0, "Unexpected number of values in queue.");
    });

    it("supports adding and removing items", async () => {
      const expectedNumberOfItems = 10;
      const queue = new AwaitableQueue<number>();

      for (let i = 0; i < expectedNumberOfItems; i++) {
        queue.push(i);
      }

      should.equal(queue.size(), expectedNumberOfItems, "Unexpected number of items in queue.");

      let receivedCount = 0;
      while (queue.size()) {
        const value = await queue.shift();
        should.equal(value, receivedCount, "Unexpected value shifted from queue.");
        receivedCount++;
      }
    });

    it("shift resolves with next pushed item", async () => {
      const queue = new AwaitableQueue<string>();
      should.equal(queue.size(), 0, "Expected the queue to be empty.");

      const futureValue = queue.shift();
      should.equal(queue.size(), 0, "Expected the queue to be empty.");

      queue.push("foo");

      const value = await futureValue;
      should.equal(value, "foo", "Unexpected value");
      should.equal(queue.size(), 0, "Expected the queue to be empty.");
    });

    it("each shift call resolves with the next consecutive item that appears in the queue", async () => {
      const queue = new AwaitableQueue<string>();
      should.equal(queue.size(), 0, "Expected the queue to be empty.");

      const expectedResults = ["foo", "bar", "baz"];
      const futureValues: Promise<string>[] = [];

      for (let i = 0; i < expectedResults.length; i++) {
        futureValues.push(queue.shift());
      }

      for (const input of expectedResults) {
        queue.push(input);
      }

      const values = await Promise.all(futureValues);
      for (let i = 0; i < values.length; i++) {
        should.equal(values[i], expectedResults[i], "Unexpected value encountered.");
      }

      should.equal(queue.size(), 0, "Expected the queue to be empty.");
    });
  });
});
