// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { MessageHeader as AmqpMessageHeader } from "../rhea-promise";
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
    const amqpHeader: AmqpMessageHeader = {
      delivery_count: props.deliveryCount,
      durable: props.durable,
      first_acquirer: props.firstAcquirer,
      priority: props.priority,
      ttl: props.ttl
    };
    log.msgHeader("To AmqpMessageHeader: %O", amqpHeader);
    return amqpHeader;
  }

  /**
   * Converts AmqpMessageHeader to MessageHeader.
   *
   * @param {AmqpMessageHeader} props Amqp Message Header
   * @returns {MessageHeader} MessageHeader.
   */
  export function fromAmqpMessageProperties(props: AmqpMessageHeader): MessageHeader {
    const msgHeader: MessageHeader = {
      deliveryCount: props.delivery_count,
      durable: props.durable,
      firstAcquirer: props.first_acquirer,
      priority: props.priority,
      ttl: props.ttl
    };
    log.msgHeader("From AmqpMessageHeader: %O", msgHeader);
    return msgHeader;
  }
}
