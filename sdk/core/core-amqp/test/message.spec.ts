// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RheaAmqpMessageHeader,
  RheaAmqpMessageProperties,
  AmqpMessageHeader,
  AmqpMessageProperties
} from "../src";
import * as chai from "chai";
chai.should();

describe("message", function() {
  describe("header", function() {
    it("should be able to convert empty AmqpMessageHeader to RheaAmqpMessageHeader", function(done) {
      const msgHeader: AmqpMessageHeader = {};
      const amqpMsgHeader: RheaAmqpMessageHeader = AmqpMessageHeader.toRheaAmqpMessageHeader(
        msgHeader
      );
      JSON.stringify(amqpMsgHeader).should.equal(JSON.stringify(msgHeader));
      done();
    });

    it("should be able to convert AmqpMessageHeader with falsy values to RheaAmqpMessageHeader", function(done) {
      const msgHeader: AmqpMessageHeader = {
        deliveryCount: 0,
        durable: false,
        firstAcquirer: false,
        priority: 0,
        timeToLive: 0
      };
      const amqpMsgHeaderExpected: RheaAmqpMessageHeader = {
        delivery_count: 0,
        durable: false,
        first_acquirer: false,
        priority: 0,
        ttl: 0
      };
      const amqpMsgHeader: RheaAmqpMessageHeader = AmqpMessageHeader.toRheaAmqpMessageHeader(
        msgHeader
      );
      JSON.stringify(amqpMsgHeader).should.equal(JSON.stringify(amqpMsgHeaderExpected));
      done();
    });

    it("should be able to convert empty RheaAmqpMessageHeader to AmqpMessageHeader", function(done) {
      const amqpMsgHeader: RheaAmqpMessageHeader = {};
      const msgHeader: AmqpMessageHeader = AmqpMessageHeader.fromRheaAmqpMessageHeader(
        amqpMsgHeader
      );
      JSON.stringify(msgHeader).should.equal(JSON.stringify(amqpMsgHeader));
      done();
    });

    it("should be able to convert RheaAmqpMessageHeader with falsy values to AmqpMessageHeader", function(done) {
      const msgHeaderExpected: AmqpMessageHeader = {
        deliveryCount: 0,
        durable: false,
        firstAcquirer: false,
        priority: 0,
        timeToLive: 0
      };
      const amqpMsgHeader: RheaAmqpMessageHeader = {
        delivery_count: 0,
        durable: false,
        first_acquirer: false,
        priority: 0,
        ttl: 0
      };
      const msgHeader: AmqpMessageHeader = AmqpMessageHeader.fromRheaAmqpMessageHeader(
        amqpMsgHeader
      );
      JSON.stringify(msgHeader).should.equal(JSON.stringify(msgHeaderExpected));
      done();
    });
  });

  describe("properties", function() {
    it("should be able to convert empty AmqpMessageProperties to RheaAmqpMessageProperties", function(done) {
      const msgProperties: AmqpMessageProperties = {};
      const amqpMsgProperties: RheaAmqpMessageProperties = AmqpMessageProperties.toRheaAmqpMessageProperties(
        msgProperties
      );
      JSON.stringify(amqpMsgProperties).should.equal(JSON.stringify(msgProperties));
      done();
    });

    it("should be able to convert AmqpMessageProperties with falsy values to RheaAmqpMessageProperties", function(done) {
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
        userId: ""
      };
      const amqpMsgPropertiesExpected: RheaAmqpMessageProperties = {
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
      };
      const amqpMsgProperties: RheaAmqpMessageProperties = AmqpMessageProperties.toRheaAmqpMessageProperties(
        msgProperties
      );
      JSON.stringify(amqpMsgProperties).should.equal(JSON.stringify(amqpMsgPropertiesExpected));
      done();
    });

    it("should be able to convert empty RheaAmqpMessageProperties to AmqpMessageProperties", function(done) {
      const amqpMsgProperties: RheaAmqpMessageProperties = {};
      const msgProperties: AmqpMessageProperties = AmqpMessageProperties.fromRheaAmqpMessageProperties(
        amqpMsgProperties
      );
      JSON.stringify(msgProperties).should.equal(JSON.stringify(amqpMsgProperties));
      done();
    });

    it("should be able to convert RheaAmqpMessageProperties with falsy values to AmqpMessageProperties", function(done) {
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
        userId: ""
      };
      const amqpMsgProperties: RheaAmqpMessageProperties = {
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
      };
      const msgProperties: RheaAmqpMessageProperties = AmqpMessageProperties.fromRheaAmqpMessageProperties(
        amqpMsgProperties
      );
      JSON.stringify(msgProperties).should.equal(JSON.stringify(msgPropertiesExpected));
      done();
    });
  });
});
