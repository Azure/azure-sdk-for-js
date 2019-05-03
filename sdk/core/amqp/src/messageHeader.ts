// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { MessageHeader as AmqpMessageHeader } from "rhea-promise";
import * as log from "./log";

/**
 * Describes the defined set of standard header properties of the message.
 * @interface MessageHeader
 */
export interface MessageHeader {
  /**
   * @property {boolean} [firstAcquirer] If this value is true, then this message has not been
   * acquired by any other link. Ifthis value is false, then this message MAY have previously
   * been acquired by another link or links.
   */
  firstAcquirer?: boolean;
  /**
   * @property {number} [deliveryCount] The number of prior unsuccessful delivery attempts.
   */
  deliveryCount?: number;
  /**
   * @property {number} [ttl] time to live in ms.
   */
  ttl?: number;
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
export namespace MessageHeader {
  /**
   * Converts MessageHeader to AmqpMessageHeader.
   *
   * @param {MessageHeader} props Message header.
   * @returns {AmqpMessageHeader} AmqpMessageHeader
   */
  export function toAmqpMessageHeader(props: MessageHeader): AmqpMessageHeader {
    const amqpHeader: AmqpMessageHeader = {};
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
    if (props.ttl != undefined) {
      amqpHeader.ttl = props.ttl;
    }
    log.msgHeader("To AmqpMessageHeader: %O", amqpHeader);
    return amqpHeader;
  }

  /**
   * Converts AmqpMessageHeader to MessageHeader.
   *
   * @param {AmqpMessageHeader} props Amqp Message Header
   * @returns {MessageHeader} MessageHeader.
   */
  export function fromAmqpMessageHeader(
    props: AmqpMessageHeader
  ): MessageHeader {
    const msgHeader: MessageHeader = {};
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
      msgHeader.ttl = props.ttl;
    }
    log.msgHeader("From AmqpMessageHeader: %O", msgHeader);
    return msgHeader;
  }
}
