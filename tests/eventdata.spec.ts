// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
chai.should();

import { EventData, AmqpMessage } from "../lib";

const testAnnotations = {
  "x-opt-enqueued-time": Date.now(),
  "x-opt-offset": "42",
  "x-opt-sequence-number": 1337,
  "x-opt-partition-key": "key"
};

const testBody = "{ \"foo\": \"bar\" }";

const messageProperties = {
  message_id: "test_id"
};

const applicationProperties = {
  propKey: "propValue"
};

const testMessage: AmqpMessage = {
  body: testBody,
  message_annotations: testAnnotations,
  properties: messageProperties,
  application_properties: applicationProperties
};
const testEventData = EventData.fromAmqpMessage(testMessage);
const messageFromED = EventData.toAmqpMessage(testEventData);

describe("EventData", function () {
  describe("fromAmqpMessage", function () {
    it("populates annotations with the message annotations", function () {
      testEventData.annotations!.should.equal(testAnnotations);
    });

    it("populates body with the message body", function () {
      testEventData.body.should.equal(testBody);
    });

    it("populates the properties with the message properties", function () {
      testEventData.properties!.should.equal(messageProperties);
    });

    it("populates the application properties with the message application properties", function () {
      testEventData.applicationProperties!.should.equal(applicationProperties);
    });

    it("preserves the raw amqp message as-is.", function () {
      testEventData._raw_amqp_mesage!.should.equal(testMessage);
    });
  });

  describe("toAmqpMessage", function () {
    it("populates annotations with the message annotations", function () {
      messageFromED.message_annotations!.should.equal(testAnnotations);
    });

    it("populates body with the message body", function () {
      messageFromED.body.should.equal(testBody);
    });

    it("populates properties with the message properties", function () {
      messageFromED.properties!.should.equal(messageProperties);
    });

    it("populates application_properties of the message", function () {
      messageFromED.application_properties!.should.equal(applicationProperties);
    });
  });

  describe("properties", function () {
    it("enqueuedTimeUtc gets the enqueued time from system properties", function () {
      const testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.enqueuedTimeUtc!.getTime().should.equal(testAnnotations["x-opt-enqueued-time"]);
    });

    it("offset gets the offset from system properties", function () {
      const testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.offset!.should.equal(testAnnotations["x-opt-offset"]);
    });

    it("sequenceNumber gets the sequence number from system properties", function () {
      const testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.sequenceNumber!.should.equal(testAnnotations["x-opt-sequence-number"]);
    });

    it("partitionKey gets the sequence number from system properties", function () {
      const testEventData = EventData.fromAmqpMessage(testMessage);
      testEventData.partitionKey!.should.equal(testAnnotations["x-opt-partition-key"]);
    });
  });
});