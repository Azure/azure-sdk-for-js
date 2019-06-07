// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
chai.should();

import { fromAmqpMessage, toAmqpMessage } from "../src/eventData";
import { Message } from "rhea-promise";

const testAnnotations = {
  "x-opt-enqueued-time": Date.now(),
  "x-opt-offset": "42",
  "x-opt-sequence-number": 0,
  "x-opt-partition-key": "key"
};

const testBody = '{ "foo": "bar" }';

const messageProperties = {
  message_id: "test_id"
};

const applicationProperties = {
  propKey: "propValue"
};

const testMessage: Message = {
  body: testBody,
  message_annotations: testAnnotations,
  message_id: "test_id",
  application_properties: applicationProperties
};
const testEventData = fromAmqpMessage(testMessage);
const messageFromED = toAmqpMessage(testEventData);

describe("EventData", function(): void {
  describe("fromAmqpMessage", function(): void {
    it("populates body with the message body", function(): void {
      testEventData.body.should.equal(testBody);
    });

    it("populates the properties with the message properties", function(): void {
      testEventData.properties!.message_id!.should.equal(messageProperties.message_id!);
    });
  });

  describe("toAmqpMessage", function(): void {

    it("populates body with the message body", function(): void {
      messageFromED.body.should.equal(testBody);
    });

    it("populates properties with the message properties", function(): void {
      messageFromED.message_id!.should.equal(messageProperties.message_id);
    });

    it("populates application_properties of the message", function(): void {
      messageFromED.application_properties!.should.equal(applicationProperties);
    });
  });

  describe("properties", function(): void {
    it("enqueuedTimeUtc gets the enqueued time from system properties", function(): void {
      const testEventData = fromAmqpMessage(testMessage);
      testEventData.enqueuedTimeUtc!.getTime().should.equal(testAnnotations["x-opt-enqueued-time"]);
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
  });
});
