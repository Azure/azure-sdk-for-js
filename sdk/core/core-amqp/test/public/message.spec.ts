// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  AmqpAnnotatedMessage,
  AmqpMessageHeader,
  AmqpMessageProperties,
  Constants,
  type AmqpApplicationProperty,
} from "../../src/index.js";
import type {
  MessageHeader as RheaMessageHeader,
  MessageProperties as RheaMessageProperties,
  Message as RheaMessage,
} from "rhea-promise";
import { message as rheaMessageUtil } from "rhea-promise";

describe("message", function () {
  describe("application properties", function () {
    const properties: Record<string, AmqpApplicationProperty> = {
      nullValue: { type: "null", value: null },
      booleanValue: { type: "boolean", value: true },
      ubyteValue: { type: "ubyte", value: 255 },
      ushortValue: { type: "ushort", value: 65535 },
      uintValue: { type: "uint", value: 4294967295 },
      ulongValue: { type: "ulong", value: 18446744073709551615n },
      byteValue: { type: "byte", value: -128 },
      shortValue: { type: "short", value: -32768 },
      intValue: { type: "int", value: -2147483648 },
      longValue: { type: "long", value: -9223372036854775808n },
      floatValue: { type: "float", value: 1.25 },
      doubleValue: { type: "double", value: 1.25 },
      decimal32Value: { type: "decimal32", value: Uint8Array.of(0x22, 0x50, 0, 0) },
      decimal64Value: {
        type: "decimal64",
        value: Uint8Array.of(0x22, 0x38, 0, 0, 0, 0, 0, 0),
      },
      decimal128Value: {
        type: "decimal128",
        value: Uint8Array.of(0x22, 0x08, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      },
      charValue: { type: "char", value: "A" },
      timestampValue: { type: "timestamp", value: new Date("2026-01-01T00:00:00.000Z") },
      uuidValue: { type: "uuid", value: "00112233-4455-6677-8899-aabbccddeeff" },
      binaryValue: { type: "binary", value: Uint8Array.of(1, 2, 3) },
      stringValue: { type: "string", value: "string" },
      symbolValue: { type: "symbol", value: "symbol" },
    };
    const decode = (message: RheaMessage): RheaMessage =>
      rheaMessageUtil.decode(rheaMessageUtil.encode(message)) as unknown as RheaMessage;

    it("preserves explicitly typed values across the Rhea codec", function () {
      const rheaMessage = AmqpAnnotatedMessage.toRheaMessage({
        applicationProperties: properties,
        body: "body",
      });

      const decoded = decode(rheaMessage);
      const annotatedMessage = AmqpAnnotatedMessage.fromRheaMessage(decoded);

      assert.deepEqual(annotatedMessage.applicationPropertiesWithAmqpTypes, properties);
      assert.equal(annotatedMessage.applicationProperties?.ubyteValue, 255);
      assert.equal(annotatedMessage.applicationProperties?.floatValue, 1.25);
      assert.equal(annotatedMessage.applicationProperties?.symbolValue, "symbol");
    });

    it("uses preserved types when a received message is encoded again", function () {
      const firstEncoding = AmqpAnnotatedMessage.toRheaMessage({
        applicationProperties: properties,
        body: "body",
      });
      const received = AmqpAnnotatedMessage.fromRheaMessage(decode(firstEncoding));

      const resent = AmqpAnnotatedMessage.fromRheaMessage(
        decode(AmqpAnnotatedMessage.toRheaMessage(received)),
      );

      assert.deepEqual(resent.applicationPropertiesWithAmqpTypes, properties);
    });

    it("uses edited values and does not restore deleted properties on resend", function () {
      const received = AmqpAnnotatedMessage.fromRheaMessage(
        decode(
          AmqpAnnotatedMessage.toRheaMessage({
            applicationProperties: {
              edited: { type: "ubyte", value: 200 },
              deleted: { type: "symbol", value: "remove-me" },
              constructor: { type: "string", value: "remove-constructor" },
              toString: { type: "string", value: "remove-to-string" },
            },
            body: "body",
          }),
        ),
      );
      received.applicationProperties!.edited = 201;
      delete received.applicationProperties!.deleted;
      delete received.applicationProperties!.constructor;
      delete received.applicationProperties!.toString;

      const resent = AmqpAnnotatedMessage.fromRheaMessage(
        decode(AmqpAnnotatedMessage.toRheaMessage(received)),
      );

      assert.deepEqual(resent.applicationPropertiesWithAmqpTypes, {
        edited: { type: "ubyte", value: 201 },
      });
      assert.notProperty(resent.applicationProperties, "deleted");
      assert.isFalse(
        Object.prototype.hasOwnProperty.call(resent.applicationProperties, "constructor"),
      );
      assert.isFalse(Object.prototype.hasOwnProperty.call(resent.applicationProperties, "toString"));
    });

    it("rejects values outside the selected AMQP type", function () {
      assert.throws(
        () =>
          AmqpAnnotatedMessage.toRheaMessage({
            applicationProperties: {
              invalid: { type: "ubyte", value: 256 },
            },
            body: "body",
          }),
        RangeError,
        "AMQP ubyte",
      );
    });
  });

  describe("time to live", function () {
    it("should be overridden by absolute expiry time on received message", function () {
      const creationTime = new Date();
      const absoluteExpiryTime = new Date(Constants.maxAbsoluteExpiryTime);
      const rhMsg: RheaMessage = {
        creation_time: creationTime,
        absolute_expiry_time: absoluteExpiryTime,
        ttl: 49 * 24 * 60 * 60 * 1000, // 49 days in milliseconds
        body: {},
      };

      const annotatedMessage = AmqpAnnotatedMessage.fromRheaMessage(rhMsg);

      const expectedTtl = absoluteExpiryTime.getTime() - creationTime.getTime();
      assert.isDefined(
        annotatedMessage.header?.timeToLive,
        "Expecting valid annotatedMsg.header.timeToLive",
      );
      assert.equal(annotatedMessage.header?.timeToLive, expectedTtl);
    });

    it("should be NOT overridden when no absolute expiry time", function () {
      const rhMsg: RheaMessage = {
        ttl: 49 * 24 * 60 * 60 * 1000, // 49 days in milliseconds
        body: {},
      };

      const annotatedMessage = AmqpAnnotatedMessage.fromRheaMessage(rhMsg);

      const expectedTtl = 49 * 24 * 60 * 60 * 1000;
      assert.isDefined(
        annotatedMessage.header?.timeToLive,
        "Expecting valid annotatedMsg.header.timeToLive",
      );
      assert.equal(annotatedMessage.header?.timeToLive, expectedTtl);
    });

    it("should round-trip correctly with value greater than max uint32", function () {
      const oneHundredDaysInMs = 100 * 24 * 60 * 60 * 1000;
      const input: AmqpAnnotatedMessage = {
        header: {
          timeToLive: oneHundredDaysInMs,
        },
        body: {},
      };
      const rhMsg = AmqpAnnotatedMessage.toRheaMessage(input);

      assert.equal(Constants.maxUint32Value, rhMsg.ttl);
      assert.instanceOf(rhMsg.creation_time, Date);
      assert.instanceOf(rhMsg.absolute_expiry_time, Date);
      const creationTime = rhMsg.creation_time;
      const absoluteExpiryTime = rhMsg.absolute_expiry_time;
      assert.equal(creationTime.getTime() + oneHundredDaysInMs, absoluteExpiryTime.getTime());

      const output = AmqpAnnotatedMessage.fromRheaMessage(rhMsg);

      assert.equal(output.header?.timeToLive, oneHundredDaysInMs);
      assert.equal(output.properties?.creationTime, creationTime.getTime());
      assert.equal(output.properties?.absoluteExpiryTime, absoluteExpiryTime.getTime());
    });

    it("absolute expiry time and creation time should not be set when no TTL", function () {
      const input: AmqpAnnotatedMessage = {
        body: {},
      };

      const rhMsg = AmqpAnnotatedMessage.toRheaMessage(input);
      assert.isUndefined(rhMsg.ttl);
      assert.isUndefined(rhMsg.creation_time);
      assert.isUndefined(rhMsg.absolute_expiry_time);
    });

    it("absolute expiry time and creation time should be on message when set explicitly", function () {
      const now = new Date();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      const creationTime = now.getTime();
      const absoluteExpiryTime = now.getTime() + oneDayInMs;
      const input: AmqpAnnotatedMessage = {
        properties: {
          creationTime,
          absoluteExpiryTime,
        },
        body: {},
      };
      const rhMsg = AmqpAnnotatedMessage.toRheaMessage(input);

      assert.isUndefined(rhMsg.ttl);
      assert.deepEqual(rhMsg.creation_time, new Date(creationTime));
      assert.deepEqual(rhMsg.absolute_expiry_time, new Date(absoluteExpiryTime));
    });

    it("absolute expiry time and creation time should be overridden based on TTL when sending ", function () {
      const now = new Date();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      const sevenDayInMs = 7 * 24 * 60 * 60 * 1000;
      const input: AmqpAnnotatedMessage = {
        properties: {
          creationTime: now.getTime(),
          absoluteExpiryTime: now.getTime() + oneDayInMs,
        },
        header: {
          timeToLive: sevenDayInMs,
        },
        body: {},
      };

      const rhMsg = AmqpAnnotatedMessage.toRheaMessage(input);

      assert.equal(rhMsg.ttl, sevenDayInMs);
      assert.instanceOf(rhMsg.creation_time, Date);
      assert.instanceOf(rhMsg.absolute_expiry_time, Date);
      const creationTime = rhMsg.creation_time;
      const absoluteExpiryTime = rhMsg.absolute_expiry_time;
      assert.equal(absoluteExpiryTime.getTime(), creationTime.getTime() + sevenDayInMs);
    });
  });

  describe("header", function () {
    it("should be able to convert empty AmqpMessageHeader to RheaMessageHeader", function () {
      const msgHeader: AmqpMessageHeader = {};
      const amqpMsgHeader: RheaMessageHeader = AmqpMessageHeader.toRheaMessageHeader(msgHeader);
      assert.equal(JSON.stringify(amqpMsgHeader), JSON.stringify(msgHeader));
    });

    it("should be able to convert AmqpMessageHeader with falsy values to RheaMessageHeader", function () {
      const msgHeader: AmqpMessageHeader = {
        deliveryCount: 0,
        durable: false,
        firstAcquirer: false,
        priority: 0,
        timeToLive: 0,
      };
      const amqpMsgHeaderExpected: RheaMessageHeader = {
        delivery_count: 0,
        durable: false,
        first_acquirer: false,
        priority: 0,
        ttl: 0,
      };
      const amqpMsgHeader: RheaMessageHeader = AmqpMessageHeader.toRheaMessageHeader(msgHeader);
      assert.equal(JSON.stringify(amqpMsgHeader), JSON.stringify(amqpMsgHeaderExpected));
    });

    it("should be able to convert empty RheaMessageHeader to AmqpMessageHeader", function () {
      const amqpMsgHeader: RheaMessageHeader = {};
      const msgHeader: AmqpMessageHeader = AmqpMessageHeader.fromRheaMessageHeader(amqpMsgHeader);
      assert.equal(JSON.stringify(msgHeader), JSON.stringify(amqpMsgHeader));
    });

    it("should be able to convert RheaMessageHeader with falsy values to AmqpMessageHeader", function () {
      const msgHeaderExpected: AmqpMessageHeader = {
        deliveryCount: 0,
        durable: false,
        firstAcquirer: false,
        priority: 0,
        timeToLive: 0,
      };
      const amqpMsgHeader: RheaMessageHeader = {
        delivery_count: 0,
        durable: false,
        first_acquirer: false,
        priority: 0,
        ttl: 0,
      };
      const msgHeader: AmqpMessageHeader = AmqpMessageHeader.fromRheaMessageHeader(amqpMsgHeader);
      assert.equal(JSON.stringify(msgHeader), JSON.stringify(msgHeaderExpected));
    });
  });

  describe("properties", function () {
    it("should be able to convert empty AmqpMessageProperties to RheaMessageProperties", function () {
      const msgProperties: AmqpMessageProperties = {};
      const amqpMsgProperties: RheaMessageProperties =
        AmqpMessageProperties.toRheaMessageProperties(msgProperties);
      assert.equal(JSON.stringify(amqpMsgProperties), JSON.stringify(msgProperties));
    });

    it("should be able to convert AmqpMessageProperties with falsy values to RheaMessageProperties", function () {
      const msgProperties: AmqpMessageProperties = {
        absoluteExpiryTime: 0,
        contentEncoding: "",
        contentType: "",
        correlationId: 0,
        creationTime: 0,
        groupId: "",
        groupSequence: 0,
        messageId: "",
        replyTo: "",
        replyToGroupId: "",
        subject: "",
        to: "",
        // userId: ""
      };
      const amqpMsgPropertiesExpected: RheaMessageProperties = {
        absolute_expiry_time: new Date(0),
        content_encoding: "",
        content_type: "",
        correlation_id: 0,
        creation_time: new Date(0),
        group_id: "",
        group_sequence: 0,
        message_id: "",
        reply_to: "",
        reply_to_group_id: "",
        subject: "",
        to: "",
        // user_id: ""
      };
      const amqpMsgProperties: RheaMessageProperties =
        AmqpMessageProperties.toRheaMessageProperties(msgProperties);
      assert.equal(JSON.stringify(amqpMsgProperties), JSON.stringify(amqpMsgPropertiesExpected));
    });

    it("should be able to convert empty RheaMessageProperties to AmqpMessageProperties", function () {
      const amqpMsgProperties: RheaMessageProperties = {};
      const msgProperties: AmqpMessageProperties =
        AmqpMessageProperties.fromRheaMessageProperties(amqpMsgProperties);
      assert.equal(JSON.stringify(msgProperties), JSON.stringify(amqpMsgProperties));
    });

    it("should be able to convert RheaMessageProperties with falsy values to AmqpMessageProperties", function () {
      const msgPropertiesExpected: AmqpMessageProperties = {
        absoluteExpiryTime: 0,
        contentEncoding: "",
        contentType: "",
        correlationId: 0,
        creationTime: 0,
        groupId: "",
        groupSequence: 0,
        messageId: "",
        replyTo: "",
        replyToGroupId: "",
        subject: "",
        to: "",
        // userId: ""
      };
      const amqpMsgProperties: RheaMessageProperties = {
        absolute_expiry_time: new Date(0),
        content_encoding: "",
        content_type: "",
        correlation_id: 0,
        creation_time: new Date(0),
        group_id: "",
        group_sequence: 0,
        message_id: "",
        reply_to: "",
        reply_to_group_id: "",
        subject: "",
        to: "",
        user_id: "",
      };
      const msgProperties: RheaMessageProperties =
        AmqpMessageProperties.fromRheaMessageProperties(amqpMsgProperties);
      assert.equal(JSON.stringify(msgProperties), JSON.stringify(msgPropertiesExpected));
    });
  });
});
