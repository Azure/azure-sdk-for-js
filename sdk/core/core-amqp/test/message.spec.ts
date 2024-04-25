// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as chai from "chai";
import { assert } from "chai";
import { AmqpAnnotatedMessage, AmqpMessageHeader, AmqpMessageProperties, Constants } from "../src";
import {
  MessageHeader as RheaMessageHeader,
  MessageProperties as RheaMessageProperties,
  Message as RheaMessage,
} from "rhea-promise";

chai.should();

describe("message", function () {
  describe("time to live", function () {
    it("should be overriden by absolute expiry time on received message", function () {
      const rhMsg: RheaMessage = {
        creation_time: new Date(),
        absolute_expiry_time: new Date(Constants.maxAbsoluteExpiryTime),
        ttl: 49 * 24 * 60 * 60 * 1000, // 49 days in milliseconds
        body: {},
      };

      const annoatedMsg = AmqpAnnotatedMessage.fromRheaMessage(rhMsg);

      const expectedTtl = rhMsg.absolute_expiry_time!.getTime() - rhMsg.creation_time!.getTime();
      assert.ok(annoatedMsg.header?.timeToLive, "Expecting valid annotatedMsg.header.timeToLive");
      annoatedMsg.header!.timeToLive!.should.equal(expectedTtl);
    });

    it("should be NOT overriden when no absolute expiry time", function () {
      const rhMsg: RheaMessage = {
        ttl: 49 * 24 * 60 * 60 * 1000, // 49 days in milliseconds
        body: {},
      };

      const annoatedMsg = AmqpAnnotatedMessage.fromRheaMessage(rhMsg);

      const expectedTtl = 49 * 24 * 60 * 60 * 1000;
      assert.ok(annoatedMsg.header?.timeToLive, "Expecting valid annotatedMsg.header.timeToLive");
      annoatedMsg.header!.timeToLive!.should.equal(expectedTtl);
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
      assert.ok(rhMsg.creation_time);
      assert.ok(rhMsg.absolute_expiry_time);
      assert.equal(
        rhMsg.creation_time!.getTime() + oneHundredDaysInMs,
        rhMsg.absolute_expiry_time!.getTime(),
      );

      const output = AmqpAnnotatedMessage.fromRheaMessage(rhMsg);

      assert.equal(output.header?.timeToLive, oneHundredDaysInMs);
      assert.equal(output.properties?.creationTime, rhMsg.creation_time!.getTime());
      assert.equal(output.properties?.absoluteExpiryTime, rhMsg.absolute_expiry_time!.getTime());
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
      const input: AmqpAnnotatedMessage = {
        properties: {
          creationTime: now.getTime(),
          absoluteExpiryTime: now.getTime() + oneDayInMs,
        },
        body: {},
      };
      const rhMsg = AmqpAnnotatedMessage.toRheaMessage(input);

      assert.isUndefined(rhMsg.ttl);
      assert.deepEqual(rhMsg.creation_time, new Date(input.properties!.creationTime!));
      assert.deepEqual(rhMsg.absolute_expiry_time, new Date(input.properties!.absoluteExpiryTime!));
    });

    it("absolute expiry time and creation time should be overriden based on TTL when sending ", function () {
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
      assert.ok(rhMsg.creation_time);
      assert.ok(rhMsg.absolute_expiry_time);
      assert.equal(
        rhMsg.absolute_expiry_time!.getTime(),
        rhMsg.creation_time!.getTime() + sevenDayInMs,
      );
    });
  });

  describe("header", function () {
    it("should be able to convert empty AmqpMessageHeader to RheaMessageHeader", function (done) {
      const msgHeader: AmqpMessageHeader = {};
      const amqpMsgHeader: RheaMessageHeader = AmqpMessageHeader.toRheaMessageHeader(msgHeader);
      JSON.stringify(amqpMsgHeader).should.equal(JSON.stringify(msgHeader));
      done();
    });

    it("should be able to convert AmqpMessageHeader with falsy values to RheaMessageHeader", function (done) {
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
      JSON.stringify(amqpMsgHeader).should.equal(JSON.stringify(amqpMsgHeaderExpected));
      done();
    });

    it("should be able to convert empty RheaMessageHeader to AmqpMessageHeader", function (done) {
      const amqpMsgHeader: RheaMessageHeader = {};
      const msgHeader: AmqpMessageHeader = AmqpMessageHeader.fromRheaMessageHeader(amqpMsgHeader);
      JSON.stringify(msgHeader).should.equal(JSON.stringify(amqpMsgHeader));
      done();
    });

    it("should be able to convert RheaMessageHeader with falsy values to AmqpMessageHeader", function (done) {
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
      JSON.stringify(msgHeader).should.equal(JSON.stringify(msgHeaderExpected));
      done();
    });
  });

  describe("properties", function () {
    it("should be able to convert empty AmqpMessageProperties to RheaMessageProperties", function (done) {
      const msgProperties: AmqpMessageProperties = {};
      const amqpMsgProperties: RheaMessageProperties =
        AmqpMessageProperties.toRheaMessageProperties(msgProperties);
      JSON.stringify(amqpMsgProperties).should.equal(JSON.stringify(msgProperties));
      done();
    });

    it("should be able to convert AmqpMessageProperties with falsy values to RheaMessageProperties", function (done) {
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
      JSON.stringify(amqpMsgProperties).should.equal(JSON.stringify(amqpMsgPropertiesExpected));
      done();
    });

    it("should be able to convert empty RheaMessageProperties to AmqpMessageProperties", function (done) {
      const amqpMsgProperties: RheaMessageProperties = {};
      const msgProperties: AmqpMessageProperties =
        AmqpMessageProperties.fromRheaMessageProperties(amqpMsgProperties);
      JSON.stringify(msgProperties).should.equal(JSON.stringify(amqpMsgProperties));
      done();
    });

    it("should be able to convert RheaMessageProperties with falsy values to AmqpMessageProperties", function (done) {
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
      JSON.stringify(msgProperties).should.equal(JSON.stringify(msgPropertiesExpected));
      done();
    });
  });
});
