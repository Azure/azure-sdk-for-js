// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AmqpMessageHeader, AmqpMessageProperties, AmqpAnnotatedMessage } from "../src";
import {
  Message as RheaMessage,
  MessageHeader as RheaMessageHeader,
  MessageProperties as RheaMessageProperties
} from "rhea-promise";
import * as chai from "chai";
chai.should();

describe("message", function() {
  describe("header", function() {
    it("should be able to convert empty AmqpMessageHeader to RheaMessageHeader", function(done) {
      const msgHeader: AmqpMessageHeader = {};
      const amqpMsgHeader: RheaMessageHeader = AmqpMessageHeader.toRheaMessageHeader(msgHeader);
      JSON.stringify(amqpMsgHeader).should.equal(JSON.stringify(msgHeader));
      done();
    });

    it("should be able to convert AmqpMessageHeader with falsy values to RheaMessageHeader", function(done) {
      const msgHeader: AmqpMessageHeader = {
        deliveryCount: 0,
        durable: false,
        firstAcquirer: false,
        priority: 0,
        timeToLive: 0
      };
      const amqpMsgHeaderExpected: RheaMessageHeader = {
        delivery_count: 0,
        durable: false,
        first_acquirer: false,
        priority: 0,
        ttl: 0
      };
      const amqpMsgHeader: RheaMessageHeader = AmqpMessageHeader.toRheaMessageHeader(msgHeader);
      JSON.stringify(amqpMsgHeader).should.equal(JSON.stringify(amqpMsgHeaderExpected));
      done();
    });

    it("should be able to convert empty RheaMessageHeader to AmqpMessageHeader", function(done) {
      const amqpMsgHeader: RheaMessageHeader = {};
      const msgHeader: AmqpMessageHeader = AmqpMessageHeader.fromRheaMessageHeader(amqpMsgHeader);
      JSON.stringify(msgHeader).should.equal(JSON.stringify(amqpMsgHeader));
      done();
    });

    it("should be able to convert RheaMessageHeader with falsy values to AmqpMessageHeader", function(done) {
      const msgHeaderExpected: AmqpMessageHeader = {
        deliveryCount: 0,
        durable: false,
        firstAcquirer: false,
        priority: 0,
        timeToLive: 0
      };
      const amqpMsgHeader: RheaMessageHeader = {
        delivery_count: 0,
        durable: false,
        first_acquirer: false,
        priority: 0,
        ttl: 0
      };
      const msgHeader: AmqpMessageHeader = AmqpMessageHeader.fromRheaMessageHeader(amqpMsgHeader);
      JSON.stringify(msgHeader).should.equal(JSON.stringify(msgHeaderExpected));
      done();
    });
  });

  describe("properties", function() {
    it("should be able to convert empty AmqpMessageProperties to RheaMessageProperties", function(done) {
      const msgProperties: AmqpMessageProperties = {};
      const amqpMsgProperties: RheaMessageProperties = AmqpMessageProperties.toRheaMessageProperties(
        msgProperties
      );
      JSON.stringify(amqpMsgProperties).should.equal(JSON.stringify(msgProperties));
      done();
    });

    it("should be able to convert AmqpMessageProperties with falsy values to RheaMessageProperties", function(done) {
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
        to: ""
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
        to: ""
        // user_id: ""
      };
      const amqpMsgProperties: RheaMessageProperties = AmqpMessageProperties.toRheaMessageProperties(
        msgProperties
      );
      JSON.stringify(amqpMsgProperties).should.equal(JSON.stringify(amqpMsgPropertiesExpected));
      done();
    });

    it("should be able to convert empty RheaMessageProperties to AmqpMessageProperties", function(done) {
      const amqpMsgProperties: RheaMessageProperties = {};
      const msgProperties: AmqpMessageProperties = AmqpMessageProperties.fromRheaMessageProperties(
        amqpMsgProperties
      );
      JSON.stringify(msgProperties).should.equal(JSON.stringify(amqpMsgProperties));
      done();
    });

    it("should be able to convert RheaMessageProperties with falsy values to AmqpMessageProperties", function(done) {
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
        to: ""
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
        user_id: ""
      };
      const msgProperties: RheaMessageProperties = AmqpMessageProperties.fromRheaMessageProperties(
        amqpMsgProperties
      );
      JSON.stringify(msgProperties).should.equal(JSON.stringify(msgPropertiesExpected));
      done();
    });
  });

  describe("fromRheaMessage", function() {
    it("converts Dates to date.getTime() numbers in annotations and applicationProperties", () => {
      const timestamp = new Date();
      const nestedTimestampSample = {
        topLevelDate: timestamp,
        child: {
          nestedDate: timestamp,
          children: [timestamp, { deepDate: timestamp }]
        }
      };
      const expectedNestedTimestampSample = {
        topLevelDate: timestamp.getTime(),
        child: {
          nestedDate: timestamp.getTime(),
          children: [timestamp.getTime(), { deepDate: timestamp.getTime() }]
        }
      };

      const message: RheaMessage = {
        message_annotations: nestedTimestampSample,
        application_properties: nestedTimestampSample,
        delivery_annotations: nestedTimestampSample,
        body: null
      };
      const convertedMessage = AmqpAnnotatedMessage.fromRheaMessage(message);

      convertedMessage.should.deep.equal({
        header: {},
        properties: {},
        footer: undefined,
        messageAnnotations: expectedNestedTimestampSample,
        applicationProperties: expectedNestedTimestampSample,
        deliveryAnnotations: expectedNestedTimestampSample,
        body: null
      });
    });
  });
});
