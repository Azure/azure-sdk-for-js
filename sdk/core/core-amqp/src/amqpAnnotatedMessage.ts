// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable eqeqeq */
import { AmqpMessageHeader } from "./messageHeader";
import { AmqpMessageProperties } from "./messageProperties";
import { Message as RheaMessage } from "rhea-promise";

/**
 * Describes the AmqpAnnotatedMessage, part of the ServiceBusReceivedMessage(as `amqpAnnotatedMessage` property).
 */
export interface AmqpAnnotatedMessage {
  /**
   * Describes the defined set of standard header properties of the message.
   */
  header?: AmqpMessageHeader;
  /**
   * Describes set of footer properties of the message.
   */
  footer?: { [key: string]: any };
  /**
   * A dictionary containing message attributes that will be held in the message header
   */
  messageAnnotations?: { [key: string]: any };
  /**
   * A dictionary used for delivery-specific
   * non-standard properties at the head of the message.
   */
  deliveryAnnotations?: { [key: string]: any };
  /**
   * A dictionary containing application specific message properties.
   */
  applicationProperties?: { [key: string]: any };
  /**
   *  Describes the defined set of standard properties of the message.
   */
  properties?: AmqpMessageProperties;
  /**
   * The message body.
   */
  body: any;
}

/**
 * Describes the operations that can be performed on(or to get) the AmqpAnnotatedMessage.
 */
export const AmqpAnnotatedMessage = {
  /**
   * Takes RheaMessage(`Message` type from "rhea") and returns it in the AmqpAnnotatedMessage format.
   *
   * @param {RheaMessage} msg
   */
  fromRheaMessage(msg: RheaMessage): AmqpAnnotatedMessage {
    return {
      header: AmqpMessageHeader.fromRheaMessageHeader(msg),
      footer: (msg as any).footer,
      messageAnnotations: msg.message_annotations,
      deliveryAnnotations: msg.delivery_annotations,
      applicationProperties: msg.application_properties,
      properties: AmqpMessageProperties.fromRheaMessageProperties(msg),
      body: msg.body
    };
  }
};
