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
  Typed,
} from "rhea-promise";
import { message as rheaMessageUtil, types as rheaTypes } from "rhea-promise";

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

    it("does not include preserved bigint metadata in JSON serialization", function () {
      const received = AmqpAnnotatedMessage.fromRheaMessage(
        decode(
          AmqpAnnotatedMessage.toRheaMessage({
            applicationProperties: {
              longValue: { type: "long", value: 1n },
            },
            body: "body",
          }),
        ),
      );

      assert.equal(received.applicationPropertiesWithAmqpTypes?.longValue.value, 1n);
      assert.doesNotThrow(() => JSON.stringify(received));
      assert.notInclude(JSON.stringify(received), "applicationPropertiesWithAmqpTypes");
    });

    it("preserves long and ulong values outside the safe integer range", function () {
      const maxSafeInteger = BigInt(Number.MAX_SAFE_INTEGER);
      const boundaryProperties: Record<string, AmqpApplicationProperty> = {
        safeLong: { type: "long", value: maxSafeInteger },
        unsafeLong: { type: "long", value: maxSafeInteger + 1n },
        roundedLong: { type: "long", value: maxSafeInteger + 2n },
        unsafeNegativeLong: { type: "long", value: -maxSafeInteger - 1n },
        safeUlong: { type: "ulong", value: maxSafeInteger },
        unsafeUlong: { type: "ulong", value: maxSafeInteger + 1n },
        roundedUlong: { type: "ulong", value: maxSafeInteger + 2n },
      };

      const received = AmqpAnnotatedMessage.fromRheaMessage(
        decode(
          AmqpAnnotatedMessage.toRheaMessage({
            applicationProperties: boundaryProperties,
            body: "body",
          }),
        ),
      );

      assert.deepEqual(received.applicationPropertiesWithAmqpTypes, boundaryProperties);
      assert.equal(received.applicationProperties?.safeLong, Number(maxSafeInteger));
      assert.equal(received.applicationProperties?.unsafeLong, Number(maxSafeInteger + 1n));
      assert.equal(received.applicationProperties?.roundedLong, Number(maxSafeInteger + 2n));
      assert.equal(
        received.applicationProperties?.unsafeNegativeLong,
        Number(-maxSafeInteger - 1n),
      );
      assert.equal(received.applicationProperties?.safeUlong, Number(maxSafeInteger));
      assert.equal(received.applicationProperties?.unsafeUlong, Number(maxSafeInteger + 1n));
      assert.equal(received.applicationProperties?.roundedUlong, Number(maxSafeInteger + 2n));

      const resent = AmqpAnnotatedMessage.fromRheaMessage(
        decode(AmqpAnnotatedMessage.toRheaMessage(received)),
      );
      assert.deepEqual(resent.applicationPropertiesWithAmqpTypes, boundaryProperties);
    });

    it("preserves legacy unsafe long decoding outside application properties", function () {
      const longValue = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
      const longBytes = Buffer.alloc(8);
      longBytes.writeBigInt64BE(longValue);

      const scalar = decode({ body: rheaTypes.wrap_long(longBytes) });
      assert.equal(scalar.body, Number(longValue));

      const sequence = decode({
        body: rheaMessageUtil.sequence_section([rheaTypes.wrap_long(longBytes)]),
      });
      assert.deepEqual((sequence.body as { content: unknown[] }).content, [Number(longValue)]);
    });

    it("preserves legacy values for unknown described body scalars", function () {
      const longValue = BigInt(Number.MAX_SAFE_INTEGER) + 2n;
      const longBytes = Buffer.alloc(8);
      longBytes.writeBigInt64BE(longValue);
      const describedLong = rheaTypes.wrap_long(longBytes) as Typed & { descriptor?: Typed };
      describedLong.descriptor = rheaTypes.wrap_symbol("example:described-long");

      const decoded = decode({
        body: rheaMessageUtil.sequence_section([describedLong]),
      });
      const decodedLong = (decoded.body as { content: Typed[] }).content[0] as Typed & {
        descriptor?: Typed;
      };

      assert.equal(decodedLong.type.name, "Long");
      assert.equal(decodedLong.value, Number(longValue));
      assert.equal(decodedLong.descriptor?.value, "example:described-long");
    });

    it("decodes nested map bodies without application-property metadata", function () {
      const depth = 64;
      let body: unknown = "leaf";
      for (let index = 0; index < depth; ++index) {
        body = { next: body };
      }

      let decodedBody: unknown = decode({ body }).body;
      for (let index = 0; index < depth; ++index) {
        assert.deepEqual(Object.keys(decodedBody as object), ["next"]);
        decodedBody = (decodedBody as { next: unknown }).next;
      }
      assert.equal(decodedBody, "leaf");
    });

    it("forwards unknown described scalar values without treating them as plain scalars", function () {
      const describedLongValue = BigInt(Number.MAX_SAFE_INTEGER) + 2n;
      const rheaMessage = AmqpAnnotatedMessage.toRheaMessage({
        applicationProperties: {
          describedLong: { type: "long", value: describedLongValue },
        },
        body: "body",
      });
      const describedLong = rheaMessage.application_properties?.describedLong as Typed & {
        descriptor?: Typed;
      };
      describedLong.descriptor = rheaTypes.wrap_symbol("example:described-long");
      const received = AmqpAnnotatedMessage.fromRheaMessage(decode(rheaMessage));

      assert.notProperty(received.applicationPropertiesWithAmqpTypes, "describedLong");
      const resent = decode(AmqpAnnotatedMessage.toRheaMessage(received));
      const resentValue = resent.application_properties?.describedLong as Typed & {
        descriptor?: Typed;
      };
      assert.equal(resentValue.type.name, "Long");
      assert.equal(Buffer.from(resentValue.value).readBigInt64BE(), describedLongValue);
      assert.equal(resentValue.descriptor?.value, "example:described-long");
    });

    it("uses edited values and does not restore deleted properties on resend", function () {
      const applicationProperties: Record<string, AmqpApplicationProperty> = Object.create(null);
      applicationProperties.edited = { type: "ubyte", value: 200 };
      applicationProperties.crossType = { type: "string", value: "before" };
      applicationProperties.outOfRange = { type: "ubyte", value: 255 };
      applicationProperties.deleted = { type: "symbol", value: "remove-me" };
      applicationProperties["constructor"] = { type: "string", value: "remove-constructor" };
      applicationProperties["toString"] = { type: "string", value: "remove-to-string" };
      Object.defineProperty(applicationProperties, "__proto__", {
        enumerable: true,
        value: { type: "string", value: "prototype-value" },
      });
      const received = AmqpAnnotatedMessage.fromRheaMessage(
        decode(
          AmqpAnnotatedMessage.toRheaMessage({
            applicationProperties,
            body: "body",
          }),
        ),
      );
      assert.isTrue(
        Object.prototype.hasOwnProperty.call(
          received.applicationPropertiesWithAmqpTypes,
          "__proto__",
        ),
      );
      assert.deepEqual(received.applicationPropertiesWithAmqpTypes?.["__proto__"], {
        type: "string",
        value: "prototype-value",
      });
      received.applicationProperties!.edited = 201;
      received.applicationProperties!.crossType = 42;
      received.applicationProperties!.outOfRange = 256;
      delete received.applicationProperties!.deleted;
      Reflect.deleteProperty(received.applicationProperties!, "constructor");
      Reflect.deleteProperty(received.applicationProperties!, "toString");

      const resent = AmqpAnnotatedMessage.fromRheaMessage(
        decode(AmqpAnnotatedMessage.toRheaMessage(received)),
      );

      assert.deepEqual(resent.applicationPropertiesWithAmqpTypes, {
        edited: { type: "ubyte", value: 201 },
        crossType: { type: "uint", value: 42 },
        outOfRange: { type: "uint", value: 256 },
        ["__proto__"]: { type: "string", value: "prototype-value" },
      });
      assert.notProperty(resent.applicationProperties, "deleted");
      assert.isFalse(
        Object.prototype.hasOwnProperty.call(resent.applicationProperties, "constructor"),
      );
      assert.isFalse(
        Object.prototype.hasOwnProperty.call(resent.applicationProperties, "toString"),
      );
    });

    it("does not preserve float32 for edited values that overflow it", function () {
      for (const value of [1e100, -1e100]) {
        const received = AmqpAnnotatedMessage.fromRheaMessage(
          decode(
            AmqpAnnotatedMessage.toRheaMessage({
              applicationProperties: {
                value: { type: "float", value: 1.25 },
              },
              body: "body",
            }),
          ),
        );
        received.applicationProperties!.value = value;

        assert.throws(() => decode(AmqpAnnotatedMessage.toRheaMessage(received)), RangeError);
      }
    });

    it("does not preserve timestamp typing for fractional millisecond edits", function () {
      const received = AmqpAnnotatedMessage.fromRheaMessage(
        decode(
          AmqpAnnotatedMessage.toRheaMessage({
            applicationProperties: {
              value: { type: "timestamp", value: new Date(1) },
            },
            body: "body",
          }),
        ),
      );
      received.applicationProperties!.value = 1.25;

      const resent = AmqpAnnotatedMessage.fromRheaMessage(
        decode(AmqpAnnotatedMessage.toRheaMessage(received)),
      );

      assert.equal(resent.applicationProperties?.value, 1.25);
      assert.deepEqual(resent.applicationPropertiesWithAmqpTypes?.value, {
        type: "double",
        value: 1.25,
      });
    });

    it("uses string inference for non-ASCII edits to preserved symbols", function () {
      const received = AmqpAnnotatedMessage.fromRheaMessage(
        decode(
          AmqpAnnotatedMessage.toRheaMessage({
            applicationProperties: {
              value: { type: "symbol", value: "before" },
            },
            body: "body",
          }),
        ),
      );
      received.applicationProperties!.value = "caf\u00e9";

      const resent = AmqpAnnotatedMessage.fromRheaMessage(
        decode(AmqpAnnotatedMessage.toRheaMessage(received)),
      );

      assert.deepEqual(resent.applicationPropertiesWithAmqpTypes?.value, {
        type: "string",
        value: "caf\u00e9",
      });
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
      assert.throws(
        () =>
          AmqpAnnotatedMessage.toRheaMessage({
            applicationProperties: {
              invalid: { type: "float", value: 1e100 },
            },
            body: "body",
          }),
        RangeError,
        "AMQP float",
      );
      assert.throws(
        () =>
          AmqpAnnotatedMessage.toRheaMessage({
            applicationProperties: {
              invalid: { type: "float", value: -1e100 },
            },
            body: "body",
          }),
        RangeError,
        "AMQP float",
      );
      for (const value of ["\ud800", "\udfff"]) {
        assert.throws(
          () =>
            AmqpAnnotatedMessage.toRheaMessage({
              applicationProperties: {
                invalid: { type: "char", value },
              },
              body: "body",
            }),
          RangeError,
          "AMQP char",
        );
      }
      assert.throws(
        () =>
          AmqpAnnotatedMessage.toRheaMessage({
            applicationProperties: {
              invalid: { type: "symbol", value: "caf\u00e9" },
            },
            body: "body",
          }),
        RangeError,
        "AMQP symbol",
      );
    });

    it("accepts supplementary Unicode characters as AMQP char values", function () {
      const received = AmqpAnnotatedMessage.fromRheaMessage(
        decode(
          AmqpAnnotatedMessage.toRheaMessage({
            applicationProperties: {
              value: { type: "char", value: "\ud83d\ude00" },
            },
            body: "body",
          }),
        ),
      );

      assert.deepEqual(received.applicationPropertiesWithAmqpTypes?.value, {
        type: "char",
        value: "\ud83d\ude00",
      });
    });

    it("rejects explicit wrappers whose payload does not match the selected type", function () {
      const invalidProperties = [
        { type: "null", value: 123 },
        { type: "binary", value: "abc" },
        { type: "long", value: 1 },
        { type: "timestamp", value: 1 },
      ] as unknown as AmqpApplicationProperty[];

      for (const invalid of invalidProperties) {
        assert.throws(
          () =>
            AmqpAnnotatedMessage.toRheaMessage({
              applicationProperties: { invalid },
              body: "body",
            }),
          TypeError,
          `AMQP ${invalid.type}`,
        );
      }
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
