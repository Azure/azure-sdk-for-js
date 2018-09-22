// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import { MessageHeader, AmqpMessageHeader, MessageProperties, AmqpMessageProperties } from "../lib";
import * as chai from "chai";
chai.should();

describe("message", function () {
  describe("header", function () {

    it("should be able to convert empty MessageHeader to AmqpMessageHeader", function (done) {
      const msgHeader: MessageHeader = {};
      const amqpMsgHeader: AmqpMessageHeader = MessageHeader.toAmqpMessageHeader(msgHeader);
      JSON.stringify(amqpMsgHeader).should.equal(JSON.stringify(msgHeader));
      done();
    });

    it("should be able to convert MessageHeader with falsy values to AmqpMessageHeader", function (done) {
      const msgHeader: MessageHeader = {
        deliveryCount: 0,
        durable: false,
        firstAcquirer: false,
        priority: 0,
        ttl: 0
      };
      const amqpMsgHeaderExpected: AmqpMessageHeader = {
        delivery_count: 0,
        durable: false,
        first_acquirer: false,
        priority: 0,
        ttl: 0
      }
      const amqpMsgHeader: AmqpMessageHeader = MessageHeader.toAmqpMessageHeader(msgHeader);
      JSON.stringify(amqpMsgHeader).should.equal(JSON.stringify(amqpMsgHeaderExpected));
      done();
    });

    it("should be able to convert empty AmqpMessageHeader to MessageHeader", function (done) {

      const amqpMsgHeader: AmqpMessageHeader = {};
      const msgHeader: MessageHeader = MessageHeader.fromAmqpMessageHeader(amqpMsgHeader);
      JSON.stringify(msgHeader).should.equal(JSON.stringify(amqpMsgHeader));
      done();
    });

    it("should be able to convert AmqpMessageHeader with falsy values to MessageHeader", function (done) {
      const msgHeaderExpected: MessageHeader = {
        deliveryCount: 0,
        durable: false,
        firstAcquirer: false,
        priority: 0,
        ttl: 0
      };
      const amqpMsgHeader: AmqpMessageHeader = {
        delivery_count: 0,
        durable: false,
        first_acquirer: false,
        priority: 0,
        ttl: 0
      }
      const msgHeader: MessageHeader = MessageHeader.fromAmqpMessageHeader(amqpMsgHeader);
      JSON.stringify(msgHeader).should.equal(JSON.stringify(msgHeaderExpected));
      done();
    });
  });

  describe("poperties", function () {
    it("should be able to convert empty MessageProperties to AmqpMessageProperties", function (done) {
      const msgProperties: MessageProperties = {};
      const amqpMsgProperties: AmqpMessageProperties = MessageProperties.toAmqpMessageProperties(msgProperties);
      JSON.stringify(amqpMsgProperties).should.equal(JSON.stringify(msgProperties));
      done();
    });

    it("should be able to convert MessageProperties with falsy values to AmqpMessageProperties", function (done) {
      const msgProperties: MessageProperties = {
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
        userId: ""
      };
      const amqpMsgPropertiesExpected: AmqpMessageProperties = {
        absolute_expiry_time: 0,
        content_encoding: "",
        content_type: "",
        correlation_id: 0,
        creation_time: 0,
        group_id: "",
        group_sequence: 0,
        message_id: "",
        reply_to: "",
        reply_to_group_id: "",
        subject: "",
        to: "",
        user_id: ""
      }
      const amqpMsgProperties: AmqpMessageProperties = MessageProperties.toAmqpMessageProperties(msgProperties);
      JSON.stringify(amqpMsgProperties).should.equal(JSON.stringify(amqpMsgPropertiesExpected));
      done();
    });

    it("should be able to convert empty AmqpMessageProperties to MessageProperties", function (done) {
      const amqpMsgProperties: AmqpMessageProperties = {};
      const msgProperties: MessageProperties = MessageProperties.fromAmqpMessageProperties(amqpMsgProperties);
      JSON.stringify(msgProperties).should.equal(JSON.stringify(amqpMsgProperties));
      done();
    });

    it("should be able to convert AmqpMessageProperties with falsy values to MessageProperties", function (done) {
      const msgPropertiesExpected: MessageProperties = {
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
        userId: ""
      };
      const amqpMsgProperties: AmqpMessageProperties = {
        absolute_expiry_time: 0,
        content_encoding: "",
        content_type: "",
        correlation_id: 0,
        creation_time: 0,
        group_id: "",
        group_sequence: 0,
        message_id: "",
        reply_to: "",
        reply_to_group_id: "",
        subject: "",
        to: "",
        user_id: ""
      }
      const msgProperties: AmqpMessageProperties = MessageProperties.fromAmqpMessageProperties(amqpMsgProperties);
      JSON.stringify(msgProperties).should.equal(JSON.stringify(msgPropertiesExpected));
      done();
    });
  });
});
