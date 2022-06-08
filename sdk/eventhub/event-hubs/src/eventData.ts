// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AmqpAnnotatedMessage, Constants } from "@azure/core-amqp";
import { BodyTypes, defaultDataTransformer } from "./dataTransformer";
import {
  DeliveryAnnotations,
  MessageAnnotations,
  Message as RheaMessage,
  types,
} from "rhea-promise";
import { isDefined, isObjectWithProperties, objectHasProperty } from "./util/typeGuards";
import {
  idempotentProducerAmqpPropertyNames,
  PENDING_PUBLISH_SEQ_NUM_SYMBOL,
} from "./util/constants";

/**
 * Describes the delivery annotations.
 * @internal
 */
export interface EventHubDeliveryAnnotations extends DeliveryAnnotations {
  /**
   * The offset of the last event.
   */
  last_enqueued_offset?: string;
  /**
   * The sequence number of the last event.
   */
  last_enqueued_sequence_number?: number;
  /**
   * The enqueued time of the last event.
   */
  last_enqueued_time_utc?: number;
  /**
   * The retrieval time of the last event.
   */
  runtime_info_retrieval_time_utc?: number;
  /**
   * Any unknown delivery annotations.
   */
  [x: string]: any;
}

/**
 * Map containing message attributes that will be held in the message header.
 * @internal
 */
export interface EventHubMessageAnnotations extends MessageAnnotations {
  /**
   * Annotation for the partition key set for the event.
   */
  "x-opt-partition-key"?: string | null;
  /**
   * Annontation for the sequence number of the event.
   */
  "x-opt-sequence-number"?: number;
  /**
   * Annotation for the enqueued time of the event.
   */
  "x-opt-enqueued-time"?: number;
  /**
   * Annotation for the offset of the event.
   */
  "x-opt-offset"?: string;
  /**
   * Any other annotation that can be added to the message.
   */
  [x: string]: any;
}

/**
 * Describes the structure of an event to be sent or received from the EventHub.
 * @internal
 */
export interface EventDataInternal {
  /**
   * The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * The enqueued time of the event.
   */
  enqueuedTimeUtc?: Date;
  /**
   * If specified EventHub will hash this to a partitionId.
   * It guarantees that messages end up in a specific partition on the event hub.
   */
  partitionKey?: string | null;
  /**
   * The offset of the event.
   */
  offset?: number;
  /**
   * The sequence number of the event.
   */
  sequenceNumber?: number;
  /**
   * The application specific properties.
   */
  properties?: { [property: string]: any };
  /**
   * The last sequence number of the event within the partition stream of the Event Hub.
   */
  lastSequenceNumber?: number;
  /**
   * The offset of the last enqueued event.
   */
  lastEnqueuedOffset?: string;
  /**
   * The enqueued UTC time of the last event.
   */
  lastEnqueuedTime?: Date;
  /**
   * The time when the runtime info was retrieved
   */
  retrievalTime?: Date;
  /**
   * The properties set by the service.
   */
  systemProperties?: { [property: string]: any };
  /**
   * The content type of the message. Optionally describes
   * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
   * example "application/json".
   */
  contentType?: string;

  /**
   * The correlation identifier that allows an
   * application to specify a context for the message for the purposes of correlation, for example
   * reflecting the MessageId of a message that is being replied to.
   */
  correlationId?: string | number | Buffer;

  /**
   * The message identifier is an
   * application-defined value that uniquely identifies the message and its payload.
   *
   * Note: Numbers that are not whole integers are not allowed.
   */
  messageId?: string | number | Buffer;
  /**
   * Returns the underlying raw amqp message.
   */
  getRawAmqpMessage(): AmqpAnnotatedMessage;
  /**
   * The pending publish sequence number, set while the event
   * is being published with idempotent partitions enabled.
   */
  [PENDING_PUBLISH_SEQ_NUM_SYMBOL]?: number;
  /**
   * The sequence number the event was published with
   * when idempotent partitions are enabled.
   */
  _publishedSequenceNumber?: number;
}

const messagePropertiesMap = {
  message_id: "messageId",
  user_id: "userId",
  to: "to",
  subject: "subject",
  reply_to: "replyTo",
  correlation_id: "correlationId",
  content_type: "contentType",
  content_encoding: "contentEncoding",
  absolute_expiry_time: "absoluteExpiryTime",
  creation_time: "creationTime",
  group_id: "groupId",
  group_sequence: "groupSequence",
  reply_to_group_id: "replyToGroupId",
} as const;

/**
 * Converts the AMQP message to an EventData.
 * @param msg - The AMQP message that needs to be converted to EventData.
 * @param skipParsingBodyAsJson - Boolean to skip running JSON.parse() on message body when body type is `content`.
 * @internal
 */
export function fromRheaMessage(
  msg: RheaMessage,
  skipParsingBodyAsJson: boolean
): EventDataInternal {
  const rawMessage = AmqpAnnotatedMessage.fromRheaMessage(msg);
  const { body, bodyType } = defaultDataTransformer.decode(msg.body, skipParsingBodyAsJson);
  rawMessage.bodyType = bodyType;

  const data: EventDataInternal = {
    body,
    getRawAmqpMessage() {
      return rawMessage;
    },
  };

  if (msg.message_annotations) {
    for (const annotationKey of Object.keys(msg.message_annotations)) {
      switch (annotationKey) {
        case Constants.partitionKey:
          data.partitionKey = msg.message_annotations[annotationKey];
          break;
        case Constants.sequenceNumber:
          data.sequenceNumber = msg.message_annotations[annotationKey];
          break;
        case Constants.enqueuedTime:
          data.enqueuedTimeUtc = new Date(msg.message_annotations[annotationKey]);
          break;
        case Constants.offset:
          data.offset = msg.message_annotations[annotationKey];
          break;
        default:
          if (!data.systemProperties) {
            data.systemProperties = {};
          }
          data.systemProperties[annotationKey] = convertDatesToNumbers(
            msg.message_annotations[annotationKey]
          );
          break;
      }
    }
  }
  if (msg.application_properties) {
    data.properties = convertDatesToNumbers(msg.application_properties);
  }
  if (msg.delivery_annotations) {
    data.lastEnqueuedOffset = msg.delivery_annotations.last_enqueued_offset;
    data.lastSequenceNumber = msg.delivery_annotations.last_enqueued_sequence_number;
    data.lastEnqueuedTime = new Date(msg.delivery_annotations.last_enqueued_time_utc as number);
    data.retrievalTime = new Date(
      msg.delivery_annotations.runtime_info_retrieval_time_utc as number
    );
  }

  const messageProperties = Object.keys(messagePropertiesMap) as Array<
    keyof typeof messagePropertiesMap
  >;
  for (const messageProperty of messageProperties) {
    if (!data.systemProperties) {
      data.systemProperties = {};
    }
    if (msg[messageProperty] != null) {
      data.systemProperties[messagePropertiesMap[messageProperty]] = convertDatesToNumbers(
        msg[messageProperty]
      );
    }
  }

  if (msg.content_type != null) {
    data.contentType = msg.content_type;
  }
  if (msg.correlation_id != null) {
    data.correlationId = msg.correlation_id;
  }
  if (msg.message_id != null) {
    data.messageId = msg.message_id;
  }

  return data;
}

/**
 * Converts an EventData object to an AMQP message.
 * @param data - The EventData object that needs to be converted to an AMQP message.
 * @param partitionKey - An optional key to determine the partition that this event should land in.
 * @internal
 */
export function toRheaMessage(
  data: EventData | AmqpAnnotatedMessage,
  partitionKey?: string
): RheaMessage {
  let rheaMessage: RheaMessage;
  if (isAmqpAnnotatedMessage(data)) {
    rheaMessage = {
      ...AmqpAnnotatedMessage.toRheaMessage(data),
      body: defaultDataTransformer.encode(data.body, data.bodyType ?? "data"),
    };
  } else {
    let bodyType: BodyTypes = "data";
    if (typeof (data as EventDataInternal).getRawAmqpMessage === "function") {
      /*
        If the event is being round-tripped, then we respect the `bodyType` of the
        underlying AMQP message.
      */
      bodyType = (data as EventDataInternal).getRawAmqpMessage().bodyType ?? "data";
    }

    rheaMessage = {
      body: defaultDataTransformer.encode(data.body, bodyType),
    };
    // As per the AMQP 1.0 spec If the message-annotations or delivery-annotations section is omitted,
    // it is equivalent to a message-annotations section containing anempty map of annotations.
    rheaMessage.message_annotations = {};

    if (data.properties) {
      rheaMessage.application_properties = data.properties;
    }

    if (isDefined(partitionKey)) {
      rheaMessage.message_annotations[Constants.partitionKey] = partitionKey;
      // Event Hub service cannot route messages to a specific partition based on the partition key
      // if AMQP message header is an empty object. Hence we make sure that header is always present
      // with atleast one property. Setting durable to true, helps us achieve that.
      rheaMessage.durable = true;
    }

    if (data.contentType != null) {
      rheaMessage.content_type = data.contentType;
    }
    if (data.correlationId != null) {
      rheaMessage.correlation_id = data.correlationId;
    }
    if (data.messageId != null) {
      if (
        typeof data.messageId === "string" &&
        data.messageId.length > Constants.maxMessageIdLength
      ) {
        throw new Error(
          `Length of 'messageId' property on the event cannot be greater than ${Constants.maxMessageIdLength} characters.`
        );
      }
      rheaMessage.message_id = data.messageId;
    }
  }

  return rheaMessage;
}

/**
 * The interface that describes the data to be sent to Event Hub.
 * Use this as a reference when creating the object to be sent when using the `EventHubProducerClient`.
 * For example, `{ body: "your-data" }` or
 * ```
 * {
 *    body: "your-data",
 *    properties: {
 *       propertyName: "property value"
 *    }
 * }
 * ```
 */
export interface EventData {
  /**
   * The message body that needs to be sent.
   * If the application reading the events is not using this SDK,
   * convert your body payload to a byte array or Buffer for better
   * cross-language compatibility.
   */
  body: any;

  /**
   * The content type of the message. Optionally describes
   * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
   * example "application/json".
   */
  contentType?: string;

  /**
   * The correlation identifier that allows an
   * application to specify a context for the message for the purposes of correlation, for example
   * reflecting the MessageId of a message that is being replied to.
   */
  correlationId?: string | number | Buffer;

  /**
   * The message identifier is an
   * application-defined value that uniquely identifies the message and its payload.
   *
   * Note: Numbers that are not whole integers are not allowed.
   */
  messageId?: string | number | Buffer;

  /**
   * Set of key value pairs that can be used to set properties specific to user application.
   */
  properties?: {
    [key: string]: any;
  };
}

/**
 * The interface that describes the structure of the event received from Event Hub.
 * Use this as a reference when creating the `processEvents` function to process the events
 * recieved from an Event Hub when using the `EventHubConsumerClient`.
 */
export interface ReceivedEventData {
  /**
   * The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * The application specific properties.
   */
  properties?: {
    [key: string]: any;
  };
  /**
   * The enqueued time of the event.
   */
  enqueuedTimeUtc: Date;
  /**
   * When specified Event Hub will hash this to a partitionId.
   * It guarantees that messages end up in a specific partition on the event hub.
   */
  partitionKey: string | null;
  /**
   * The offset of the event.
   */
  offset: number;
  /**
   * The sequence number of the event.
   */
  sequenceNumber: number;
  /**
   * The properties set by the service.
   */
  systemProperties?: {
    [key: string]: any;
  };

  /**
   * The content type of the message. Optionally describes
   * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
   * example "application/json".
   */
  contentType?: string;

  /**
   * The correlation identifier that allows an
   * application to specify a context for the message for the purposes of correlation, for example
   * reflecting the MessageId of a message that is being replied to.
   */
  correlationId?: string | number | Buffer;

  /**
   * The message identifier is an
   * application-defined value that uniquely identifies the message and its payload.
   */
  messageId?: string | number | Buffer;

  /**
   * Returns the underlying raw amqp message.
   */
  getRawAmqpMessage(): AmqpAnnotatedMessage;
}

/**
 * @internal
 */
export function isAmqpAnnotatedMessage(possible: unknown): possible is AmqpAnnotatedMessage {
  return (
    isObjectWithProperties(possible, ["body", "bodyType"]) &&
    !objectHasProperty(possible, "getRawAmqpMessage")
  );
}

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
    return thing.map(convertDatesToNumbers) as unknown as T;
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

/**
 * @internal
 */
export interface PopulateIdempotentMessageAnnotationsParameters {
  isIdempotentPublishingEnabled: boolean;
  ownerLevel?: number;
  producerGroupId?: number;
  publishSequenceNumber?: number;
}

/**
 * Populates a rhea message with idempotent producer properties.
 * @internal
 */
export function populateIdempotentMessageAnnotations(
  rheaMessage: RheaMessage,
  {
    isIdempotentPublishingEnabled,
    ownerLevel,
    producerGroupId,
    publishSequenceNumber,
  }: PopulateIdempotentMessageAnnotationsParameters
): void {
  if (!isIdempotentPublishingEnabled) {
    return;
  }

  const messageAnnotations = rheaMessage.message_annotations || {};
  if (!rheaMessage.message_annotations) {
    rheaMessage.message_annotations = messageAnnotations;
  }

  if (isDefined(ownerLevel)) {
    messageAnnotations[idempotentProducerAmqpPropertyNames.epoch] = types.wrap_short(ownerLevel);
  }
  if (isDefined(producerGroupId)) {
    messageAnnotations[idempotentProducerAmqpPropertyNames.producerId] =
      types.wrap_long(producerGroupId);
  }
  if (isDefined(publishSequenceNumber)) {
    messageAnnotations[idempotentProducerAmqpPropertyNames.producerSequenceNumber] =
      types.wrap_int(publishSequenceNumber);
  }
}
