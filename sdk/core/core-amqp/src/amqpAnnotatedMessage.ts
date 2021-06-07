// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable eqeqeq */
import { AmqpMessageHeader } from "./messageHeader";
import { AmqpMessageProperties } from "./messageProperties";
import { Message as RheaMessage } from "rhea-promise";
import { isDefined, objectHasProperty } from "./util/typeGuards";

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
  /**
   * The AMQP section where the data was decoded from.
   */
  bodyType?: "data" | "sequence" | "value";
}

/**
 * Describes the operations that can be performed on(or to get) the AmqpAnnotatedMessage.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- renaming constant would be a breaking change.
export const AmqpAnnotatedMessage = {
  /**
   * Takes RheaMessage(`Message` type from "rhea") and returns it in the AmqpAnnotatedMessage format.
   */
  fromRheaMessage(msg: RheaMessage): AmqpAnnotatedMessage {
    return {
      header: AmqpMessageHeader.fromRheaMessageHeader(msg),
      footer: (msg as any).footer,
      messageAnnotations: convertDatesToNumbers(msg.message_annotations),
      deliveryAnnotations: convertDatesToNumbers(msg.delivery_annotations),
      applicationProperties: convertDatesToNumbers(msg.application_properties),
      properties: AmqpMessageProperties.fromRheaMessageProperties(msg),
      body: msg.body
    };
  },
  /**
   * Takes AmqpAnnotatedMessage and returns it in the RheaMessage(`Message` type from "rhea") format.
   */
  toRheaMessage(msg: AmqpAnnotatedMessage): RheaMessage {
    const message = {
      ...AmqpMessageProperties.toRheaMessageProperties(msg.properties || {}),
      ...AmqpMessageHeader.toRheaMessageHeader(msg.header || {}),
      body: msg.body,
      message_annotations: msg.messageAnnotations,
      delivery_annotations: msg.deliveryAnnotations,
      application_properties: msg.applicationProperties,
      footer: msg.footer
    };
    return message;
  }
};

/**
 * Converts any Date objects into a number representing date.getTime().
 * Recursively checks for any Date objects in arrays and objects.
 * @internal
 */
function convertDatesToNumbers<T = unknown>(thing: T): T {
  // fast exit
  if (!isDefined(thing)) return thing;

  // When 'thing' is a Date, return the number representation
  if (
    typeof thing === "object" &&
    objectHasProperty(thing, "getTime") &&
    typeof thing.getTime === "function"
  ) {
    return thing.getTime();
  }

  /*
    Examples:
    [0, 'foo', new Date(), { nested: new Date()}]
  */
  if (Array.isArray(thing)) {
    return (thing.map(convertDatesToNumbers) as unknown) as T;
  }

  /*
    Examples:
    { foo: new Date(), children: { nested: new Date() }}
  */
  if (typeof thing === "object" && isDefined(thing)) {
    thing = { ...thing };
    for (const key of Object.keys(thing)) {
      (thing as any)[key] = convertDatesToNumbers((thing as any)[key]);
    }
  }

  return thing;
}
