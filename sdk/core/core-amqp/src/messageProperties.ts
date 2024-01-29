// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable eqeqeq */

import { MessageProperties as RheaMessageProperties } from "rhea-promise";
import { logger } from "./log";

/**
 * Describes the defined set of standard properties of the message.
 */
export interface AmqpMessageProperties {
  /**
   * The application message identifier that uniquely identifies a message.
   * The user is responsible for making sure that this is unique in the given context. Guids usually make a good fit.
   */
  messageId?: string | number | Buffer;
  /**
   * The address of the node to send replies to.
   */
  replyTo?: string;
  /**
   * The address of the node the message is destined for.
   */
  to?: string;
  /**
   * The id that can be used to mark or identify messages between clients.
   */
  correlationId?: string | number | Buffer;
  /**
   * MIME type for the message.
   */
  contentType?: string;
  /**
   * The content-encoding property is used as a modifier to the content-type.
   * When present, its value indicates what additional content encodings have been applied to the application-data.
   */
  contentEncoding?: string;
  /**
   * The time when this message is considered expired.
   */
  absoluteExpiryTime?: number;
  /**
   * The time this message was created.
   */
  creationTime?: number;
  /**
   * The group this message belongs to.
   */
  groupId?: string;
  /**
   * The sequence number of this message with its group.
   */
  groupSequence?: number;
  /**
   * The group the reply message belongs to.
   */
  replyToGroupId?: string;
  /**
   * A common field for summary information about the message
   * content and purpose.
   */
  subject?: string;
  // /**
  //  * The identity of the user responsible for producing the message.
  //  */
  // userId?: string;
}

/**
 * Describes the operations that can be performed on the amqp message properties.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- renaming constant would be a breaking change.
export const AmqpMessageProperties = {
  /**
   * Converts MessageProperties to RheaMessageProperties.
   * @param props - Message properties.
   * @returns RheaMessageProperties.
   */
  toRheaMessageProperties(props: AmqpMessageProperties): RheaMessageProperties {
    const amqpProperties: RheaMessageProperties = {};
    if (props.absoluteExpiryTime != undefined) {
      amqpProperties.absolute_expiry_time = new Date(props.absoluteExpiryTime);
    }
    if (props.contentEncoding != undefined) {
      amqpProperties.content_encoding = props.contentEncoding;
    }
    if (props.contentType != undefined) {
      amqpProperties.content_type = props.contentType;
    }
    if (props.correlationId != undefined) {
      amqpProperties.correlation_id = props.correlationId;
    }
    if (props.creationTime != undefined) {
      amqpProperties.creation_time = new Date(props.creationTime);
    }
    if (props.groupId != undefined) {
      amqpProperties.group_id = props.groupId;
    }
    if (props.groupSequence != undefined) {
      amqpProperties.group_sequence = props.groupSequence;
    }
    if (props.messageId != undefined) {
      amqpProperties.message_id = props.messageId;
    }
    if (props.replyTo != undefined) {
      amqpProperties.reply_to = props.replyTo;
    }
    if (props.replyToGroupId != undefined) {
      amqpProperties.reply_to_group_id = props.replyToGroupId;
    }
    if (props.subject != undefined) {
      amqpProperties.subject = props.subject;
    }
    if (props.to != undefined) {
      amqpProperties.to = props.to;
    }
    // if (props.userId != undefined) {
    //   amqpProperties.user_id = props.userId;
    // }

    logger.verbose("To RheaMessageProperties: %O", amqpProperties);
    return amqpProperties;
  },

  /**
   * Converts RheaMessageProperties to MessageProperties.
   * @param props - Amqp message properties.
   * @returns MessageProperties.
   */
  fromRheaMessageProperties(props: RheaMessageProperties): AmqpMessageProperties {
    const msgProperties: AmqpMessageProperties = {};
    if (props.absolute_expiry_time != undefined) {
      msgProperties.absoluteExpiryTime = props.absolute_expiry_time.getTime();
    }
    if (props.content_encoding != undefined) {
      msgProperties.contentEncoding = props.content_encoding;
    }
    if (props.content_type != undefined) {
      msgProperties.contentType = props.content_type;
    }
    if (props.correlation_id != undefined) {
      msgProperties.correlationId = props.correlation_id;
    }
    if (props.creation_time != undefined) {
      msgProperties.creationTime = props.creation_time.getTime();
    }
    if (props.group_id != undefined) {
      msgProperties.groupId = props.group_id;
    }
    if (props.group_sequence != undefined) {
      msgProperties.groupSequence = props.group_sequence;
    }
    if (props.message_id != undefined) {
      msgProperties.messageId = props.message_id;
    }
    if (props.reply_to != undefined) {
      msgProperties.replyTo = props.reply_to;
    }
    if (props.reply_to_group_id != undefined) {
      msgProperties.replyToGroupId = props.reply_to_group_id;
    }
    if (props.subject != undefined) {
      msgProperties.subject = props.subject;
    }
    if (props.to != undefined) {
      msgProperties.to = props.to;
    }
    // if (props.user_id != undefined) {
    //   msgProperties.userId = props.user_id;
    // }

    logger.verbose("From RheaMessageProperties: %O", msgProperties);
    return msgProperties;
  },
};
