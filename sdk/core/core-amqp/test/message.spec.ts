// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AmqpMessageHeader, AmqpMessageProperties } from "../src/index.js";
import {
  MessageHeader as RheaMessageHeader,
  MessageProperties as RheaMessageProperties,
} from "rhea-promise";
import { describe, it, assert } from "vitest";

describe("message", function () {
  describe("header", function () {
    it("should be able to convert empty AmqpMessageHeader to RheaMessageHeader", () => {
      const msgHeader: AmqpMessageHeader = {};
      const amqpMsgHeader: RheaMessageHeader = AmqpMessageHeader.toRheaMessageHeader(msgHeader);
      assert.equal(JSON.stringify(amqpMsgHeader), JSON.stringify(msgHeader));
    });

    it("should be able to convert AmqpMessageHeader with falsy values to RheaMessageHeader", () => {
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

    it("should be able to convert empty RheaMessageHeader to AmqpMessageHeader", () => {
      const amqpMsgHeader: RheaMessageHeader = {};
      const msgHeader: AmqpMessageHeader = AmqpMessageHeader.fromRheaMessageHeader(amqpMsgHeader);
      assert.equal(JSON.stringify(amqpMsgHeader), JSON.stringify(msgHeader));
    });

    it("should be able to convert RheaMessageHeader with falsy values to AmqpMessageHeader", () => {
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
    it("should be able to convert empty AmqpMessageProperties to RheaMessageProperties", () => {
      const msgProperties: AmqpMessageProperties = {};
      const amqpMsgProperties: RheaMessageProperties =
        AmqpMessageProperties.toRheaMessageProperties(msgProperties);
      assert.equal(JSON.stringify(amqpMsgProperties), JSON.stringify(msgProperties));
    });

    it("should be able to convert AmqpMessageProperties with falsy values to RheaMessageProperties", () => {
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

    it("should be able to convert empty RheaMessageProperties to AmqpMessageProperties", () => {
      const amqpMsgProperties: RheaMessageProperties = {};
      const msgProperties: AmqpMessageProperties =
        AmqpMessageProperties.fromRheaMessageProperties(amqpMsgProperties);
      assert.equal(JSON.stringify(msgProperties), JSON.stringify(amqpMsgProperties));
    });

    it("should be able to convert RheaMessageProperties with falsy values to AmqpMessageProperties", () => {
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
