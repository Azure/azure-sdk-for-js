// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";

import { EventGridConsumer } from "../src";
import * as testData from "./utils/testData";

chaiUse(chaiPromises);

describe("EventGridConsumer", function() {
  const consumer = new EventGridConsumer();

  describe("#decodeEventGridEvents", function() {
    it("decodes a single event", async () => {
      const events = await consumer.decodeEventGridEvents(
        testData.customTestEvent1.eventGridSchema.encodedEvent
      );

      assert.lengthOf(events, 1);
      assert.deepStrictEqual(events[0], testData.customTestEvent1.eventGridSchema.expected);
    });

    it("decoded a batch with a single event ", async () => {
      const events = await consumer.decodeEventGridEvents(
        wrapEncodedEventsInArray([testData.customTestEvent1.eventGridSchema])
      );

      assert.lengthOf(events, 1);
      assert.deepStrictEqual(events[0], testData.customTestEvent1.eventGridSchema.expected);
    });

    it("decodes an batch of multiple events", async () => {
      const events = await consumer.decodeEventGridEvents(
        wrapEncodedEventsInArray([
          testData.customTestEvent1.eventGridSchema,
          testData.customTestEvent2.eventGridSchema
        ])
      );

      assert.lengthOf(events, 2);
      assert.deepStrictEqual(events[0], testData.customTestEvent1.eventGridSchema.expected);
      assert.deepStrictEqual(events[1], testData.customTestEvent2.eventGridSchema.expected);
    });

    it("decodes system events correctly", async () => {
      const events = await consumer.decodeEventGridEvents(
        testData.containerRegistryPushedEvent.eventGridSchema.encodedEvent
      );

      assert.lengthOf(events, 1);
      assert.deepStrictEqual(
        events[0],
        testData.containerRegistryPushedEvent.eventGridSchema.expected
      );
    });

    it("fails when a required property is missing", () => {
      const o = { ...testData.customTestEvent1.eventGridSchema.expected };
      for (const property of [
        "eventType",
        "eventTime",
        "id",
        "metadataVersion",
        "data",
        "dataVersion"
      ]) {
        delete o[property];

        assert.isRejected(
          consumer.decodeEventGridEvents(JSON.stringify(o)),
          /missing required property/
        );
      }
    });

    it("fails when metadata version is wrong", () => {
      const o = { ...testData.customTestEvent1.eventGridSchema.expected };
      o.metadataVersion = "2";

      assert.isRejected(
        consumer.decodeEventGridEvents(JSON.stringify(o)),
        /event is not in the Event Grid schema/
      );
    });
  });

  describe("#decodeCloudEvents", function() {
    it("decodes a single event", async () => {
      const events = await consumer.decodeCloudEvents(
        testData.customTestEvent1.cloudEventSchema.encodedEvent
      );

      assert.lengthOf(events, 1);
      assert.deepStrictEqual(events[0], testData.customTestEvent1.cloudEventSchema.expected);
    });

    it("decoded a batch with a single event ", async () => {
      const events = await consumer.decodeCloudEvents(
        wrapEncodedEventsInArray([testData.customTestEvent1.cloudEventSchema])
      );

      assert.lengthOf(events, 1);
      assert.deepStrictEqual(events[0], testData.customTestEvent1.cloudEventSchema.expected);
    });

    it("decodes an batch of multiple events", async () => {
      const events = await consumer.decodeCloudEvents(
        wrapEncodedEventsInArray([
          testData.customTestEvent1.cloudEventSchema,
          testData.customTestEvent2.cloudEventSchema
        ])
      );

      assert.lengthOf(events, 2);
      assert.deepStrictEqual(events[0], testData.customTestEvent1.cloudEventSchema.expected);
      assert.deepStrictEqual(events[1], testData.customTestEvent2.cloudEventSchema.expected);
    });

    it("decodes system events correctly", async () => {
      const events = await consumer.decodeCloudEvents(
        testData.containerRegistryPushedEvent.cloudEventSchema.encodedEvent
      );

      assert.lengthOf(events, 1);
      assert.deepStrictEqual(
        events[0],
        testData.containerRegistryPushedEvent.cloudEventSchema.expected
      );
    });

    it("fails when a required property is missing", () => {
      const o = { ...testData.customTestEvent1.cloudEventSchema.expected };
      for (const property of ["type", "source", "id", "specversion"]) {
        delete o[property];

        assert.isRejected(
          consumer.decodeCloudEvents(JSON.stringify(o)),
          /missing required property/
        );
      }
    });

    it("fails when spec version is wrong", () => {
      const o = { ...testData.customTestEvent1.cloudEventSchema.expected };
      o.specversion = "2.0";

      assert.isRejected(
        consumer.decodeCloudEvents(JSON.stringify(o)),
        /event is not in the Cloud Event 1.0 schema/
      );
    });
  });
});

/**
 * wrapEncodedEventsInArray takes the encoded events for a set of test cases and returns a string
 * which is the JSON encoding of an array containing all the encoded events.
 */
function wrapEncodedEventsInArray(testCases: testData.TestCase[]): string {
  const foo = [];

  for (const testCase of testCases) {
    foo.push(JSON.parse(testCase.encodedEvent));
  }

  return JSON.stringify(foo);
}
