// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable eqeqeq */

import { MessageHeader as RheaMessageHeader } from "rhea-promise";
import { logger } from "./log";

/**
 * Describes the defined set of standard header properties of the message.
 */
export interface AmqpMessageHeader {
  /**
   * @property {boolean} [firstAcquirer] If this value is true, then this message has not been
   * acquired by any other link. If this value is false, then this message MAY have previously
   * been acquired by another link or links.
   */
  firstAcquirer?: boolean;
  /**
   * @property {number} [deliveryCount] The number of prior unsuccessful delivery attempts.
   */
  deliveryCount?: number;
  /**
   * @property {number} [timeToLive] time to live in ms.
   */
  timeToLive?: number;
  /**
   * @property {boolean} [durable] Specifies durability requirements.
   */
  durable?: boolean;
  /**
   * @property {number} [priority] The relative message priority. Higher numbers indicate higher
   * priority messages.
   */
  priority?: number;
}

/**
 * Describes the operations that can be performed on the message header.
 * @module MessageHeader
 */
export const AmqpMessageHeader = {
  /**
   * Converts MessageHeader to RheaMessageHeader.
   *
   * @param {MessageHeader} props Message header.
   * @returns {RheaMessageHeader} RheaMessageHeader
   */
  toRheaMessageHeader(props: AmqpMessageHeader): RheaMessageHeader {
    const amqpHeader: RheaMessageHeader = {};
    if (props.deliveryCount != undefined) {
      amqpHeader.delivery_count = props.deliveryCount;
    }
    if (props.durable != undefined) amqpHeader.durable = props.durable;
    if (props.firstAcquirer != undefined) {
      amqpHeader.first_acquirer = props.firstAcquirer;
    }
    if (props.priority != undefined) {
      amqpHeader.priority = props.priority;
    }
    if (props.timeToLive != undefined) {
      amqpHeader.ttl = props.timeToLive;
    }
    logger.verbose("To RheaMessageHeader: %O", amqpHeader);
    return amqpHeader;
  },

  /**
   * Converts RheaMessageHeader to MessageHeader.
   *
   * @param {RheaMessageHeader} props Amqp Message Header
   * @returns {AmqpMessageHeader} MessageHeader.
   */
  fromRheaMessageHeader(props: RheaMessageHeader): AmqpMessageHeader {
    const msgHeader: AmqpMessageHeader = {};
    if (props.delivery_count != undefined) {
      msgHeader.deliveryCount = props.delivery_count;
    }
    if (props.durable != undefined) {
      msgHeader.durable = props.durable;
    }
    if (props.first_acquirer != undefined) {
      msgHeader.firstAcquirer = props.first_acquirer;
    }
    if (props.priority != undefined) {
      msgHeader.priority = props.priority;
    }
    if (props.ttl != undefined) {
      msgHeader.timeToLive = props.ttl;
    }
    logger.verbose("From RheaMessageHeader: %O", msgHeader);
    return msgHeader;
  }
};
