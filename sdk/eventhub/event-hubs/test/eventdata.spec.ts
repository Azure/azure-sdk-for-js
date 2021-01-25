// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
chai.should();

import { EventData, fromRheaMessage, toRheaMessage } from "../src/eventData";
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

const testEventData = fromRheaMessage(testMessage);
const messageFromED = toRheaMessage(testSourceEventData);

describe("EventData", function(): void {
  describe("fromRheaMessage", function(): void {
    it("populates body with the message body", function(): void {
      testEventData.body.should.equal(testBody);
    });

    describe("properties", function(): void {
      it("enqueuedTimeUtc gets the enqueued time from system properties", function(): void {
        const testEventData = fromRheaMessage(testMessage);
        testEventData
          .enqueuedTimeUtc!.getTime()
          .should.equal(testAnnotations["x-opt-enqueued-time"]);
      });

      it("offset gets the offset from system properties", function(): void {
        const testEventData = fromRheaMessage(testMessage);
        testEventData.offset!.should.equal(testAnnotations["x-opt-offset"]);
      });

      it("sequenceNumber gets the sequence number from system properties", function(): void {
        const testEventData = fromRheaMessage(testMessage);
        testEventData.sequenceNumber!.should.equal(testAnnotations["x-opt-sequence-number"]);
      });

      it("partitionKey gets the sequence number from system properties", function(): void {
        const testEventData = fromRheaMessage(testMessage);
        testEventData.partitionKey!.should.equal(testAnnotations["x-opt-partition-key"]);
      });

      it("returns systemProperties for unknown message annotations", function(): void {
        const extraAnnotations = {
          "x-iot-foo-prop": "just-a-foo",
          "x-iot-bar-prop": "bar-above-the-rest"
        };
        const testEventData = fromRheaMessage({
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

      it("returns systemProperties for special known properties", function(): void {
        const testEventData = fromRheaMessage({
          body: testBody,
          application_properties: applicationProperties,
          message_annotations: testAnnotations,
          message_id: "messageId",
          user_id: "userId",
          to: "to",
          subject: "subject",
          reply_to: "replyTo",
          reply_to_group_id: "replyToGroupId",
          content_encoding: "utf-8",
          content_type: "application/json",
          correlation_id: "id2",
          absolute_expiry_time: 0,
          creation_time: 0,
          group_id: "groupId",
          group_sequence: 1
        });

        testEventData
          .enqueuedTimeUtc!.getTime()
          .should.equal(testAnnotations["x-opt-enqueued-time"]);
        testEventData.offset!.should.equal(testAnnotations["x-opt-offset"]);
        testEventData.sequenceNumber!.should.equal(testAnnotations["x-opt-sequence-number"]);
        testEventData.partitionKey!.should.equal(testAnnotations["x-opt-partition-key"]);
        testEventData.systemProperties!["messageId"].should.equal("messageId");
        testEventData.systemProperties!["userId"].should.equal("userId");
        testEventData.systemProperties!["to"].should.equal("to");
        testEventData.systemProperties!["subject"].should.equal("subject");
        testEventData.systemProperties!["replyTo"].should.equal("replyTo");
        testEventData.systemProperties!["replyToGroupId"].should.equal("replyToGroupId");
        testEventData.systemProperties!["contentEncoding"].should.equal("utf-8");
        testEventData.systemProperties!["contentType"].should.equal("application/json");
        testEventData.systemProperties!["correlationId"].should.equal("id2");
        testEventData.systemProperties!["absoluteExpiryTime"].should.equal(0);
        testEventData.systemProperties!["creationTime"].should.equal(0);
        testEventData.systemProperties!["groupId"].should.equal("groupId");
        testEventData.systemProperties!["groupSequence"].should.equal(1);
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
