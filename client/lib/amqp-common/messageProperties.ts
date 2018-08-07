// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { MessageProperties as AmqpMessageProperties } from "../rhea-promise";
import * as log from "./log";

/**
 * Describes the defined set of standard properties of the message.
 * @interface MessageProperties
 */
export interface MessageProperties {
  /**
   * @property {string | number | Buffer} [messageId] The application message identifier that uniquely idenitifes a message.
   * The user is responsible for making sure that this is unique in the given context. Guids usually make a good fit.
   */
  messageId?: string | number | Buffer;
  /**
   * @property {string} [replyTo] The address of the node to send replies to.
   */
  replyTo?: string;
  /**
   * @property {string} [to] The address of the node the message is destined for.
   */
  to?: string;
  /**
   * @property {string | number | Buffer} [correlationId] The id that can be used to mark or identify messages between clients.
   */
  correlationId?: string | number | Buffer;
  /**
   * @property {string} [contentType] MIME type for the message.
   */
  contentType?: string;
  /**
   * @property {string} [contentEncoding] The content-encoding property is used as a modifier to the content-type.
   * When present, its valueindicates what additional content encodings have been applied to the application-data.
   */
  contentEncoding?: string;
  /**
   * @property {number} [absoluteExpiryTime] The time when this message is considered expired.
   */
  absoluteExpiryTime?: number;
  /**
   * @property {number} [creationTime] The time this message was created.
   */
  creationTime?: number;
  /**
   * @property {string} [groupId] The group this message belongs to.
   */
  groupId?: string;
  /**
   * @property {number} [groupSequence] The sequence number of this message with its group.
   */
  groupSequence?: number;
  /**
   * @property {string} [replyToGroupId] The group the reply message belongs to.
   */
  replyToGroupId?: string;
  /**
   * @property {string} [subject] A common field for summary information about the message
   * content and purpose.
   */
  subject?: string;
  /**
   * @property {string} [userId] The identity of the user responsible for producing the message.
   */
  userId?: string;
}

/**
 * Describes the operations that can be performed on the amqp message properties.
 * @module MessageProperties
 */
export namespace MessageProperties {

  /**
   * Converts MessageProperties to AmqpMessageProperties.
   * @param {MessageProperties} props Message properties.
   * @returns {AmqpMessageProperties} AmqpMessageProperties.
   */
  export function toAmqpMessageProperties(props: MessageProperties): AmqpMessageProperties {
    const amqpProperties: AmqpMessageProperties = {
      absolute_expiry_time: props.absoluteExpiryTime,
      content_encoding: props.contentEncoding,
      content_type: props.contentType,
      correlation_id: props.correlationId,
      creation_time: props.creationTime,
      group_id: props.groupId,
      group_sequence: props.groupSequence,
      message_id: props.messageId,
      reply_to: props.replyTo,
      reply_to_group_id: props.replyToGroupId,
      subject: props.subject,
      to: props.to,
      user_id: props.userId
    };
    log.msgProperties("To AmqpMessageProperties: %O", amqpProperties);
    return amqpProperties;
  }

  /**
   * Converts AmqpMessageProperties to MessageProperties.
   * @param {AmqpMessageProperties} props Amqp message properties.
   * @returns {MessageProperties} MessageProperties.
   */
  export function fromAmqpMessageProperties(props: AmqpMessageProperties): MessageProperties {
    const msgProperties: MessageProperties = {
      absoluteExpiryTime: props.absolute_expiry_time,
      contentEncoding: props.content_encoding,
      contentType: props.content_type,
      correlationId: props.correlation_id,
      creationTime: props.creation_time,
      groupId: props.group_id,
      groupSequence: props.group_sequence,
      messageId: props.message_id,
      replyTo: props.reply_to,
      replyToGroupId: props.reply_to_group_id,
      subject: props.subject,
      to: props.to,
      userId: props.user_id
    };
    log.msgProperties("From AmqpMessageProperties: %O", msgProperties);
    return msgProperties;
  }
}
