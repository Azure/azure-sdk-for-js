// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ServiceBusMessage,
  ServiceBusMessageImpl,
  toRheaMessage,
} from "../../../src/serviceBusMessage";
import {
  Delivery,
  uuid_to_string,
  MessageAnnotations,
  DeliveryAnnotations,
  Message as RheaMessage,
} from "rhea-promise";
import chai from "chai";
import { ConnectionConfig, Constants } from "@azure/core-amqp";
import { defaultDataTransformer } from "../../../src/dataTransformer";
import { ServiceBusMessageBatchImpl } from "../../../src/serviceBusMessageBatch";
import { ConnectionContext } from "../../../src/connectionContext";
const assert = chai.assert;

const fakeDelivery = {} as Delivery;

describe("ServiceBusMessageImpl unit tests", () => {
  describe("ServiceBusMessageImpl LockToken unit tests", () => {
    const message_annotations: MessageAnnotations = {};
    message_annotations[Constants.enqueuedTime] = Date.now();
    const amqpMessage: RheaMessage = {
      body: "hello",
      message_annotations,
    };

    const fakeDeliveryTag = new Buffer(16);
    for (let i = 0; i < fakeDeliveryTag.length; i++) {
      fakeDeliveryTag[i] = Math.floor(Math.random() * 255);
    }
    const expectedLockToken = uuid_to_string(fakeDeliveryTag);

    it("Lock token in peekLock mode", () => {
      const sbMessage = new ServiceBusMessageImpl(
        amqpMessage,
        { tag: fakeDeliveryTag } as Delivery,
        false,
        "peekLock",
        false
      );

      assert.equal(sbMessage.lockToken, expectedLockToken, "Unexpected lock token found");
    });

    it("Lock token in receiveAndDelete mode", () => {
      const sbMessage = new ServiceBusMessageImpl(
        amqpMessage,
        { tag: fakeDeliveryTag } as Delivery,
        false,
        "receiveAndDelete",
        false
      );

      assert.equal(!!sbMessage.lockToken, false, "Unexpected lock token found");
    });
  });

  describe("ServiceBusMessageImpl AmqpAnnotations unit tests", () => {
    const message_annotations: MessageAnnotations = {};
    message_annotations[Constants.enqueuedTime] = Date.now();
    message_annotations[Constants.partitionKey] = "dummy-partition-key";
    // message_annotations[Constants.viaPartitionKey] = "dummy-via-partition-key";
    message_annotations["random-msg-annotation-key"] = "random-msg-annotation-value";

    const delivery_annotations: DeliveryAnnotations = {
      delivery_annotations_one: "delivery_annotations_one_value",
      delivery_annotations_two: "delivery_annotations_two_value",
      delivery_annotations_three: "delivery_annotations_three_value",
    };

    const timestamp = new Date();
    const amqpMessage: RheaMessage = {
      body: "hello",
      message_annotations,
      delivery_annotations,
      application_properties: {
        topLevelDate: timestamp,
        child: {
          nestedDate: timestamp,
          children: [timestamp, { deepDate: timestamp }],
        },
      },
      delivery_count: 2,
      first_acquirer: true,
      ttl: 123456,
      durable: true,
      priority: 9876,
      message_id: "random_messageId",
      reply_to: "random_replyTo",
      to: "random_to",
      correlation_id: "random_correlationId",
      content_type: "random_contentType",
      content_encoding: "random_contentEncoding",
      absolute_expiry_time: new Date(123908745),
      creation_time: new Date(45612349),
      group_id: "random_groupId",
      group_sequence: 98723560,
      reply_to_group_id: "random_replyToGroupId",
      subject: "random_subject",
      user_id: "random_user_id",
    };

    const sbMessage = new ServiceBusMessageImpl(
      amqpMessage,
      fakeDelivery,
      false,
      "peekLock",
      false
    );

    it("headers match", () => {
      assert.equal(sbMessage._rawAmqpMessage.header?.firstAcquirer, amqpMessage.first_acquirer);
      assert.equal(sbMessage._rawAmqpMessage.header?.timeToLive, amqpMessage.ttl);
      assert.equal(sbMessage._rawAmqpMessage.header?.durable, amqpMessage.durable);
      assert.equal(sbMessage._rawAmqpMessage.header?.priority, amqpMessage.priority);
      assert.equal(sbMessage._rawAmqpMessage.header?.deliveryCount, amqpMessage.delivery_count);

      assert.equal(sbMessage.deliveryCount, amqpMessage.delivery_count);
      assert.equal(sbMessage.timeToLive, amqpMessage.ttl);
    });

    it("message annotations match", () => {
      if (!sbMessage._rawAmqpMessage.messageAnnotations) {
        throw new Error("Message Annotations should not be empty");
      }

      for (const key in message_annotations) {
        if (Object.prototype.hasOwnProperty.call(message_annotations, key)) {
          assert.equal(
            sbMessage._rawAmqpMessage.messageAnnotations[key],
            message_annotations[key],
            `Unexpected value for key: ${key}`
          );
        }
      }

      assert.equal(
        sbMessage.partitionKey,
        message_annotations[Constants.partitionKey],
        "Unexpected Partition Key"
      );

      // assert.equal(
      //   sbMessage.viaPartitionKey,
      //   message_annotations[Constants.viaPartitionKey],
      //   "Unexpected Via Partition Key"
      // );
    });

    it("delivery annotations match", () => {
      if (!sbMessage._rawAmqpMessage.deliveryAnnotations) {
        throw new Error("Delivery Annotations should not be empty");
      }

      for (const key in delivery_annotations) {
        if (Object.prototype.hasOwnProperty.call(delivery_annotations, key)) {
          assert.equal(
            sbMessage._rawAmqpMessage.deliveryAnnotations[key],
            delivery_annotations[key],
            `Unexpected value for key: ${key}`
          );
        }
      }
    });

    it("properties match", () => {
      assert.equal(sbMessage._rawAmqpMessage.properties?.messageId, amqpMessage.message_id);
      assert.equal(sbMessage._rawAmqpMessage.properties?.replyTo, amqpMessage.reply_to);
      assert.equal(sbMessage._rawAmqpMessage.properties?.to, amqpMessage.to);
      assert.equal(sbMessage._rawAmqpMessage.properties?.correlationId, amqpMessage.correlation_id);
      assert.equal(sbMessage._rawAmqpMessage.properties?.contentType, amqpMessage.content_type);
      assert.equal(
        sbMessage._rawAmqpMessage.properties?.contentEncoding,
        amqpMessage.content_encoding
      );
      assert.equal(
        sbMessage._rawAmqpMessage.properties?.absoluteExpiryTime,
        amqpMessage.absolute_expiry_time?.getTime()
      );
      assert.equal(
        sbMessage._rawAmqpMessage.properties?.creationTime,
        amqpMessage.creation_time!.getTime()
      );
      assert.equal(sbMessage._rawAmqpMessage.properties?.groupId, amqpMessage.group_id);
      assert.equal(
        sbMessage._rawAmqpMessage.properties?.replyToGroupId,
        amqpMessage.reply_to_group_id
      );
      assert.equal(sbMessage._rawAmqpMessage.properties?.groupSequence, amqpMessage.group_sequence);
      assert.equal(sbMessage._rawAmqpMessage.properties?.subject, amqpMessage.subject);
      // assert.equal(sbMessage._rawAmqpMessage.properties?.userId, amqpMessage.user_id);

      assert.equal(sbMessage._rawAmqpMessage.properties?.messageId, sbMessage.messageId);
      assert.equal(sbMessage._rawAmqpMessage.properties?.replyTo, sbMessage.replyTo);
      assert.equal(sbMessage._rawAmqpMessage.properties?.to, sbMessage.to);
      assert.equal(sbMessage._rawAmqpMessage.properties?.correlationId, sbMessage.correlationId);
      assert.equal(sbMessage._rawAmqpMessage.properties?.contentType, sbMessage.contentType);
      assert.equal(sbMessage._rawAmqpMessage.properties?.groupId, sbMessage.sessionId);
      assert.equal(
        sbMessage._rawAmqpMessage.properties?.replyToGroupId,
        sbMessage.replyToSessionId
      );
      assert.equal(sbMessage._rawAmqpMessage.properties?.subject, sbMessage.subject);
      assert.deepEqual(sbMessage.applicationProperties, {
        topLevelDate: timestamp.getTime(),
        child: {
          nestedDate: timestamp.getTime(),
          children: [timestamp.getTime(), { deepDate: timestamp.getTime() }],
        },
      });
      assert.deepEqual(sbMessage._rawAmqpMessage.applicationProperties, {
        topLevelDate: timestamp.getTime(),
        child: {
          nestedDate: timestamp.getTime(),
          children: [timestamp.getTime(), { deepDate: timestamp.getTime() }],
        },
      });
    });
  });

  describe("ServiceBusMessage validations", function (): void {
    const longString =
      "A very very very very very very very very very very very very very very very very very very very very very very very very very long string.";

    const testInputs: {
      message: ServiceBusMessage;
      expectedErrorMessage: string;
      title: string;
    }[] = [
      {
        message: { body: "", contentType: 1 as any },
        expectedErrorMessage: "The property 'contentType' on the message must be of type 'string'",
        title: "contentType is of invalid type",
      },
      {
        message: { body: "", subject: 1 as any },
        expectedErrorMessage: "The property 'label' on the message must be of type 'string'",
        title: "label is of invalid type",
      },
      {
        message: { body: "", to: 1 as any },
        expectedErrorMessage: "The property 'to' on the message must be of type 'string'",
        title: "to is of invalid type",
      },
      {
        message: { body: "", replyToSessionId: 1 as any },
        expectedErrorMessage:
          "The property 'replyToSessionId' on the message must be of type 'string'",
        title: "replyToSessionId is of invalid type",
      },
      {
        message: { body: "", sessionId: 1 as any },
        expectedErrorMessage: "The property 'sessionId' on the message must be of type 'string'",
        title: "sessionId is of invalid type",
      },
      {
        message: { body: "", replyTo: 1 as any },
        expectedErrorMessage: "The property 'replyTo' on the message must be of type 'string'",
        title: "replyTo is of invalid type",
      },
      {
        message: { body: "", timeToLive: "" as any },
        expectedErrorMessage: "The property 'timeToLive' on the message must be of type 'number'",
        title: "timeToLive is of invalid type",
      },
      {
        message: { body: "", partitionKey: longString },
        expectedErrorMessage:
          "Length of 'partitionKey' property on the message cannot be greater than 128 characters.",
        title: "partitionKey is longer than 128 characters",
      },
      // {
      //   message: { body: "", viaPartitionKey: longString },
      //   expectedErrorMessage:
      //     "Length of 'viaPartitionKey' property on the message cannot be greater than 128 characters.",
      //   title: "viaPartitionKey is longer than 128 characters"
      // },
      {
        message: { body: "", sessionId: longString },
        expectedErrorMessage:
          "Length of 'sessionId' property on the message cannot be greater than 128 characters.",
        title: "sessionId is longer than 128 characters",
      },
      {
        message: { body: "", messageId: longString },
        expectedErrorMessage:
          "Length of 'messageId' property on the message cannot be greater than 128 characters.",
        title: "messageId is longer than 128 characters",
      },
      {
        message: { body: "", messageId: {} as any },
        expectedErrorMessage:
          "The property 'messageId' on the message must be of type string, number or Buffer",
        title: "messageId is of invalid type",
      },
      {
        message: { body: "", correlationId: {} as any },
        expectedErrorMessage:
          "The property 'correlationId' on the message must be of type string, number or Buffer",
        title: "correlationId is of invalid type",
      },
    ];

    describe("toRheaMessage", () => {
      testInputs.forEach(function (testInput: {
        message: ServiceBusMessage;
        expectedErrorMessage: string;
        title: string;
      }): void {
        it(testInput.title, async function (): Promise<void> {
          assert.throws(
            () => toRheaMessage(testInput.message, defaultDataTransformer),
            testInput.expectedErrorMessage
          );
        });
      });
    });

    describe("ServiceBusMessageBatch.tryAdd()", () => {
      testInputs.forEach(function (testInput: {
        message: ServiceBusMessage;
        expectedErrorMessage: string;
        title: string;
      }): void {
        // this test is basically the same as the above, but it's good to make sure all the code paths
        // are properly calling through to toRheaMessage.
        it(testInput.title, async function (): Promise<void> {
          const fakeConnectionContext: ConnectionContext = {
            config: {
              entityPath: "hello",
            } as ConnectionConfig,
          } as ConnectionContext;

          const batch = new ServiceBusMessageBatchImpl(fakeConnectionContext, 2048);

          assert.throws(
            () => batch.tryAddMessage(testInput.message),
            testInput.expectedErrorMessage
          );
        });
      });
    });
  });
});
