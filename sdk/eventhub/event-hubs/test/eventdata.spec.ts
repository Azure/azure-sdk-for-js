// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
chai.should();

import { fromAmqpMessage, toAmqpMessage, EventData } from "../src/eventData";
import { Message } from "rhea-promise";

const testAnnotations = {
  "x-opt-enqueued-time": Date.now(),
  "x-opt-offset": "42",
  "x-opt-sequence-number": 0,
  "x-opt-partition-key": "key"
};

const testBody = '{ "foo": "bar" }';

const applicationProperties = {
  propKey: "propValue"
};

const testMessage: Message = {
  body: testBody,
  message_annotations: testAnnotations,
  application_properties: applicationProperties
};

const properties = {
  foo: "bar"
};

const testSourceEventData: EventData = {
  body: testBody,
  properties: properties
};

const testEventData = fromAmqpMessage(testMessage);
const messageFromED = toAmqpMessage(testSourceEventData);

describe("EventData", function(): void {
  describe("fromAmqpMessage", function(): void {
    it("populates body with the message body", function(): void {
      testEventData.body.should.equal(testBody);
    });

    describe("properties", function(): void {
      it("enqueuedTimeUtc gets the enqueued time from system properties", function(): void {
        const testEventData = fromAmqpMessage(testMessage);
        testEventData
          .enqueuedTimeUtc!.getTime()
          .should.equal(testAnnotations["x-opt-enqueued-time"]);
      });

      it("offset gets the offset from system properties", function(): void {
        const testEventData = fromAmqpMessage(testMessage);
        testEventData.offset!.should.equal(testAnnotations["x-opt-offset"]);
      });

      it("sequenceNumber gets the sequence number from system properties", function(): void {
        const testEventData = fromAmqpMessage(testMessage);
        testEventData.sequenceNumber!.should.equal(testAnnotations["x-opt-sequence-number"]);
      });

      it("partitionKey gets the sequence number from system properties", function(): void {
        const testEventData = fromAmqpMessage(testMessage);
        testEventData.partitionKey!.should.equal(testAnnotations["x-opt-partition-key"]);
      });

      it("returns systemProperties for unknown message annotations", function(): void {
        const extraAnnotations = {
          "x-iot-foo-prop": "just-a-foo",
          "x-iot-bar-prop": "bar-above-the-rest"
        };
        const testEventData = fromAmqpMessage({
          body: testBody,
          application_properties: applicationProperties,
          message_annotations: {
            ...testAnnotations,
            ...extraAnnotations
          }
        });
        testEventData
          .enqueuedTimeUtc!.getTime()
          .should.equal(testAnnotations["x-opt-enqueued-time"]);
        testEventData.offset!.should.equal(testAnnotations["x-opt-offset"]);
        testEventData.sequenceNumber!.should.equal(testAnnotations["x-opt-sequence-number"]);
        testEventData.partitionKey!.should.equal(testAnnotations["x-opt-partition-key"]);
        testEventData.systemProperties!["x-iot-foo-prop"] = extraAnnotations["x-iot-foo-prop"];
        testEventData.systemProperties!["x-iot-bar-prop"] = extraAnnotations["x-iot-bar-prop"];
      });
    });
  });

  describe("toAmqpMessage", function(): void {
    it("populates body with the message body", function(): void {
      messageFromED.body.should.equal(testBody);
    });

    it("populates application_properties of the message", function(): void {
      messageFromED.application_properties!.should.equal(properties);
    });
  });
});
