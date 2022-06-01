// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventData, ReceivedEventData, fromRheaMessage, toRheaMessage } from "../../src/eventData";
import chai, { assert, should } from "chai";
import {
  dataSectionTypeCode,
  sequenceSectionTypeCode,
  valueSectionTypeCode,
} from "../../src/dataTransformer";
import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { Message } from "rhea-promise";
import { testWithServiceTypes } from "../public/utils/testWithServiceTypes";

chai.should();

const testAnnotations = {
  "x-opt-enqueued-time": Date.now(),
  "x-opt-offset": "42",
  "x-opt-sequence-number": 0,
  "x-opt-partition-key": "key",
};

const testBody = '{ "foo": "bar" }';

const applicationProperties = {
  propKey: "propValue",
};

const testMessage: Message = {
  body: testBody,
  message_annotations: testAnnotations,
  application_properties: applicationProperties,
};

const properties = {
  foo: "bar",
};

const testSourceEventData: EventData = {
  body: testBody,
  properties: properties,
};

const messageFromED = toRheaMessage(testSourceEventData);

testWithServiceTypes(() => {
  describe("EventData", function (): void {
    describe("fromRheaMessage", function (): void {
      it("populates body with the message body", function (): void {
        const testEventData = fromRheaMessage(testMessage, false);
        testEventData.body.should.equal(testBody);
      });

      it("populates top-level fields", () => {
        const testEventData = fromRheaMessage(
          {
            ...testMessage,
            ...{ content_type: "application/json", correlation_id: "cid", message_id: 1 },
          },
          false
        );
        should().equal(testEventData.messageId, 1, "Unexpected messageId found.");
        should().equal(
          testEventData.contentType,
          "application/json",
          "Unexpected contentType found."
        );
        should().equal(testEventData.correlationId, "cid", "Unexpected correlationId found.");
      });

      describe("properties", function (): void {
        it("enqueuedTimeUtc gets the enqueued time from system properties", function (): void {
          const testEventData = fromRheaMessage(testMessage, false);
          testEventData
            .enqueuedTimeUtc!.getTime()
            .should.equal(testAnnotations["x-opt-enqueued-time"]);
        });

        it("offset gets the offset from system properties", function (): void {
          const testEventData = fromRheaMessage(testMessage, false);
          testEventData.offset!.should.equal(testAnnotations["x-opt-offset"]);
        });

        it("sequenceNumber gets the sequence number from system properties", function (): void {
          const testEventData = fromRheaMessage(testMessage, false);
          testEventData.sequenceNumber!.should.equal(testAnnotations["x-opt-sequence-number"]);
        });

        it("partitionKey gets the sequence number from system properties", function (): void {
          const testEventData = fromRheaMessage(testMessage, false);
          testEventData.partitionKey!.should.equal(testAnnotations["x-opt-partition-key"]);
        });

        it("returns systemProperties for unknown message annotations", function (): void {
          const extraAnnotations = {
            "x-iot-foo-prop": "just-a-foo",
            "x-iot-bar-prop": "bar-above-the-rest",
          };
          const testEventData = fromRheaMessage(
            {
              body: testBody,
              application_properties: applicationProperties,
              message_annotations: {
                ...testAnnotations,
                ...extraAnnotations,
              },
            },
            false
          );
          testEventData
            .enqueuedTimeUtc!.getTime()
            .should.equal(testAnnotations["x-opt-enqueued-time"]);
          testEventData.offset!.should.equal(testAnnotations["x-opt-offset"]);
          testEventData.sequenceNumber!.should.equal(testAnnotations["x-opt-sequence-number"]);
          testEventData.partitionKey!.should.equal(testAnnotations["x-opt-partition-key"]);
          testEventData.systemProperties!["x-iot-foo-prop"].should.eql(
            extraAnnotations["x-iot-foo-prop"]
          );
          testEventData.systemProperties!["x-iot-bar-prop"].should.eql(
            extraAnnotations["x-iot-bar-prop"]
          );
        });

        it("returns systemProperties for special known properties", function (): void {
          const testEventData = fromRheaMessage(
            {
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
              absolute_expiry_time: new Date(0),
              creation_time: new Date(0),
              group_id: "groupId",
              group_sequence: 1,
            },
            false
          );

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

      it("deserializes Dates to numbers in properties and annotations", () => {
        const timestamp = new Date();
        const extraAnnotations = {
          "x-date": timestamp,
          "x-number": timestamp.getTime(),
        };
        const testEventData = fromRheaMessage(
          {
            body: testBody,
            application_properties: {
              topLevelDate: timestamp,
              child: {
                nestedDate: timestamp,
                children: [timestamp, { deepDate: timestamp }],
              },
            },
            message_annotations: {
              ...testAnnotations,
              ...extraAnnotations,
            },
          },
          false
        );
        testEventData
          .enqueuedTimeUtc!.getTime()
          .should.equal(testAnnotations["x-opt-enqueued-time"]);
        testEventData.offset!.should.equal(testAnnotations["x-opt-offset"]);
        testEventData.sequenceNumber!.should.equal(testAnnotations["x-opt-sequence-number"]);
        testEventData.partitionKey!.should.equal(testAnnotations["x-opt-partition-key"]);
        testEventData.systemProperties!["x-date"].should.eql(extraAnnotations["x-date"].getTime());
        testEventData.systemProperties!["x-number"].should.eql(extraAnnotations["x-number"]);
        testEventData.properties!.should.eql({
          topLevelDate: timestamp.getTime(),
          child: {
            nestedDate: timestamp.getTime(),
            children: [timestamp.getTime(), { deepDate: timestamp.getTime() }],
          },
        });
      });
    });
    describe("toAmqpMessage", function (): void {
      it("populates body with the message body encoded", function (): void {
        const expectedTestBodyContents = Buffer.from(JSON.stringify(testBody));
        should().equal(
          expectedTestBodyContents.equals(messageFromED.body.content),
          true,
          "Encoded body does not match expected result."
        );
        should().equal(
          messageFromED.body.typecode,
          dataSectionTypeCode,
          "Unexpected typecode encountered on body."
        );
      });

      it("populates top-level fields", () => {
        const message = toRheaMessage({
          ...testSourceEventData,
          ...{ contentType: "application/json", correlationId: "cid", messageId: 1 },
        });
        should().equal(message.message_id, 1, "Unexpected message_id found.");
        should().equal(message.content_type, "application/json", "Unexpected content_type found.");
        should().equal(message.correlation_id, "cid", "Unexpected correlation_id found.");
      });

      it("populates application_properties of the message", function (): void {
        messageFromED.application_properties!.should.equal(properties);
      });

      it("AmqpAnnotatedMessage (explicit type)", () => {
        const amqpAnnotatedMessage: AmqpAnnotatedMessage = {
          body: "hello",
          bodyType: "value",
        };

        const rheaMessage = toRheaMessage(amqpAnnotatedMessage);

        assert.equal(rheaMessage.body.typecode, valueSectionTypeCode);
      });

      it("AmqpAnnotatedMessage (implicit type)", () => {
        const amqpAnnotatedMessage: AmqpAnnotatedMessage = {
          body: "hello",
          bodyType: undefined,
        };

        const rheaMessage = toRheaMessage(amqpAnnotatedMessage);

        assert.equal(rheaMessage.body.typecode, dataSectionTypeCode);
      });

      it("EventData", () => {
        const event: EventData = {
          body: "hello",
        };

        const rheaMessage = toRheaMessage(event);

        assert.equal(rheaMessage.body.typecode, dataSectionTypeCode);
      });

      it("ReceivedEventData (sequence)", () => {
        const event: ReceivedEventData = {
          enqueuedTimeUtc: new Date(),
          offset: 100,
          partitionKey: null,
          sequenceNumber: 1,
          body: ["foo", "bar"],
          getRawAmqpMessage() {
            return {
              body: this.body,
              bodyType: "sequence",
            };
          },
        };

        const rheaMessage = toRheaMessage(event);

        assert.equal(rheaMessage.body.typecode, sequenceSectionTypeCode);
      });

      it("ReceivedEventData (data)", () => {
        const event: ReceivedEventData = {
          enqueuedTimeUtc: new Date(),
          offset: 100,
          partitionKey: null,
          sequenceNumber: 1,
          body: ["foo", "bar"],
          getRawAmqpMessage() {
            return {
              body: this.body,
              bodyType: "data",
            };
          },
        };

        const rheaMessage = toRheaMessage(event);

        assert.equal(rheaMessage.body.typecode, dataSectionTypeCode);
      });

      it("ReceivedEventData (value)", () => {
        const event: ReceivedEventData = {
          enqueuedTimeUtc: new Date(),
          offset: 100,
          partitionKey: null,
          sequenceNumber: 1,
          body: ["foo", "bar"],
          getRawAmqpMessage() {
            return {
              body: this.body,
              bodyType: "value",
            };
          },
        };

        const rheaMessage = toRheaMessage(event);

        assert.equal(rheaMessage.body.typecode, valueSectionTypeCode);
      });
    });
  });
});
