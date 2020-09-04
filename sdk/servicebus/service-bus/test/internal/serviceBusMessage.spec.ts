// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceBusMessageImpl, InternalReceiveMode } from "../../src/serviceBusMessage";
import { ConnectionContext } from "../../src/connectionContext";
import { Delivery, uuid_to_string, MessageAnnotations, DeliveryAnnotations } from "rhea-promise";
import chai from "chai";
import { AmqpMessage, Constants } from "@azure/core-amqp";
const assert = chai.assert;

const fakeContext = {
  dataTransformer: {
    encode: (data) => data,
    decode: (data) => data
  }
} as ConnectionContext;
const fakeEntityPath = "dummy";
const fakeDelivery = {} as Delivery;

describe("ServiceBusMessageImpl LockToken unit tests", () => {
  const message_annotations: MessageAnnotations = {};
  message_annotations[Constants.enqueuedTime] = Date.now();
  const amqpMessage: AmqpMessage = {
    body: "hello",
    message_annotations
  };

  const fakeDeliveryTag = new Buffer(16);
  for (let i = 0; i < fakeDeliveryTag.length; i++) {
    fakeDeliveryTag[i] = Math.floor(Math.random() * 255);
  }
  const expectedLockToken = uuid_to_string(fakeDeliveryTag);

  it("Lock token in peekLock mode", () => {
    const sbMessage = new ServiceBusMessageImpl(
      fakeContext,
      fakeEntityPath,
      amqpMessage,
      { tag: fakeDeliveryTag } as Delivery,
      false,
      InternalReceiveMode.peekLock
    );

    assert.equal(sbMessage.lockToken, expectedLockToken, "Unexpected lock token found");
  });

  it("Lock token in receiveAndDelete mode", () => {
    const sbMessage = new ServiceBusMessageImpl(
      fakeContext,
      fakeEntityPath,
      amqpMessage,
      { tag: fakeDeliveryTag } as Delivery,
      false,
      InternalReceiveMode.receiveAndDelete
    );

    assert.equal(!!sbMessage.lockToken, false, "Unexpected lock token found");
  });
});

describe("ServiceBusMessageImpl AmqpAnnotations unit tests", () => {
  const message_annotations: MessageAnnotations = {};
  message_annotations[Constants.enqueuedTime] = Date.now();
  message_annotations[Constants.partitionKey] = "dummy-partition-key";
  message_annotations[Constants.viaPartitionKey] = "dummy-via-partition-key";
  message_annotations["random-msg-annotation-key"] = "random-msg-annotation-value";

  const delivery_annotations: DeliveryAnnotations = {
    delivery_annotations_one: "delivery_annotations_one_value",
    delivery_annotations_two: "delivery_annotations_two_value",
    delivery_annotations_three: "delivery_annotations_three_value"
  };

  const amqpMessage: AmqpMessage = {
    body: "hello",
    message_annotations,
    delivery_annotations,
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
    absolute_expiry_time: 123908745,
    creation_time: 45612349,
    group_id: "random_groupId",
    group_sequence: 98723560,
    reply_to_group_id: "random_replyToGroupId",
    subject: "random_subject",
    user_id: "random_user_id"
  };

  const sbMessage = new ServiceBusMessageImpl(
    fakeContext,
    fakeEntityPath,
    amqpMessage,
    fakeDelivery,
    false,
    InternalReceiveMode.peekLock
  );

  it("headers match", () => {
    assert.equal(sbMessage._amqpAnnotatedMessage.header?.firstAcquirer, amqpMessage.first_acquirer);
    assert.equal(sbMessage._amqpAnnotatedMessage.header?.timeToLive, amqpMessage.ttl);
    assert.equal(sbMessage._amqpAnnotatedMessage.header?.durable, amqpMessage.durable);
    assert.equal(sbMessage._amqpAnnotatedMessage.header?.priority, amqpMessage.priority);
    assert.equal(sbMessage._amqpAnnotatedMessage.header?.deliveryCount, amqpMessage.delivery_count);

    assert.equal(sbMessage.deliveryCount, amqpMessage.delivery_count);
    assert.equal(sbMessage.timeToLive, amqpMessage.ttl);
  });

  it("message annotations match", () => {
    if (!sbMessage._amqpAnnotatedMessage.messageAnnotations) {
      throw new Error("Message Annotations should not be empty");
    }

    for (const key in message_annotations) {
      if (Object.prototype.hasOwnProperty.call(message_annotations, key)) {
        assert.equal(
          sbMessage._amqpAnnotatedMessage.messageAnnotations[key],
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
    assert.equal(
      sbMessage.viaPartitionKey,
      message_annotations[Constants.viaPartitionKey],
      "Unexpected Via Partition Key"
    );
  });

  it("delivery annotations match", () => {
    if (!sbMessage._amqpAnnotatedMessage.deliveryAnnotations) {
      throw new Error("Delivery Annotations should not be empty");
    }

    for (const key in delivery_annotations) {
      if (Object.prototype.hasOwnProperty.call(delivery_annotations, key)) {
        assert.equal(
          sbMessage._amqpAnnotatedMessage.deliveryAnnotations[key],
          delivery_annotations[key],
          `Unexpected value for key: ${key}`
        );
      }
    }
  });

  it("properties match", () => {
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.messageId, amqpMessage.message_id);
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.replyTo, amqpMessage.reply_to);
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.to, amqpMessage.to);
    assert.equal(
      sbMessage._amqpAnnotatedMessage.properties?.correlationId,
      amqpMessage.correlation_id
    );
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.contentType, amqpMessage.content_type);
    assert.equal(
      sbMessage._amqpAnnotatedMessage.properties?.contentEncoding,
      amqpMessage.content_encoding
    );
    assert.equal(
      sbMessage._amqpAnnotatedMessage.properties?.absoluteExpiryTime,
      amqpMessage.absolute_expiry_time
    );
    assert.equal(
      sbMessage._amqpAnnotatedMessage.properties?.creationTime,
      amqpMessage.creation_time
    );
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.groupId, amqpMessage.group_id);
    assert.equal(
      sbMessage._amqpAnnotatedMessage.properties?.replyToGroupId,
      amqpMessage.reply_to_group_id
    );
    assert.equal(
      sbMessage._amqpAnnotatedMessage.properties?.groupSequence,
      amqpMessage.group_sequence
    );
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.subject, amqpMessage.subject);
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.userId, amqpMessage.user_id);

    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.messageId, sbMessage.messageId);
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.replyTo, sbMessage.replyTo);
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.to, sbMessage.to);
    assert.equal(
      sbMessage._amqpAnnotatedMessage.properties?.correlationId,
      sbMessage.correlationId
    );
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.contentType, sbMessage.contentType);
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.groupId, sbMessage.sessionId);
    assert.equal(
      sbMessage._amqpAnnotatedMessage.properties?.replyToGroupId,
      sbMessage.replyToSessionId
    );
    assert.equal(sbMessage._amqpAnnotatedMessage.properties?.subject, sbMessage.label);
  });
});
