// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DeliveryAnnotations, Message as RheaMessage, MessageAnnotations } from "rhea-promise";
import { Constants } from "@azure/core-amqp";

/**
 * Describes the delivery annotations.
 * @ignore
 */
export interface EventHubDeliveryAnnotations extends DeliveryAnnotations {
  /**
   * @property [last_enqueued_offset] The offset of the last event.
   */
  last_enqueued_offset?: string;
  /**
   * @property [last_enqueued_sequence_number] The sequence number of the last event.
   */
  last_enqueued_sequence_number?: number;
  /**
   * @property [last_enqueued_time_utc] The enqueued time of the last event.
   */
  last_enqueued_time_utc?: number;
  /**
   * @property [runtime_info_retrieval_time_utc] The retrieval time of the last event.
   */
  runtime_info_retrieval_time_utc?: number;
  /**
   * @property Any unknown delivery annotations.
   */
  [x: string]: any;
}

/**
 * Map containing message attributes that will be held in the message header.
 * @ignore
 */
export interface EventHubMessageAnnotations extends MessageAnnotations {
  /**
   * @property [x-opt-partition-key] Annotation for the partition key set for the event.
   */
  "x-opt-partition-key"?: string | null;
  /**
   * @property [x-opt-sequence-number] Annontation for the sequence number of the event.
   */
  "x-opt-sequence-number"?: number;
  /**
   * @property [x-opt-enqueued-time] Annotation for the enqueued time of the event.
   */
  "x-opt-enqueued-time"?: number;
  /**
   * @property [x-opt-offset] Annotation for the offset of the event.
   */
  "x-opt-offset"?: string;
  /**
   * @property Any other annotation that can be added to the message.
   */
  [x: string]: any;
}

/**
 * Describes the structure of an event to be sent or received from the EventHub.
 * @ignore
 */
export interface EventDataInternal {
  /**
   * @property body - The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * @property [enqueuedTimeUtc] The enqueued time of the event.
   */
  enqueuedTimeUtc?: Date;
  /**
   * @property [partitionKey] If specified EventHub will hash this to a partitionId.
   * It guarantees that messages end up in a specific partition on the event hub.
   */
  partitionKey?: string | null;
  /**
   * @property [offset] The offset of the event.
   */
  offset?: number;
  /**
   * @property [sequenceNumber] The sequence number of the event.
   */
  sequenceNumber?: number;
  /**
   * @property [properties] The application specific properties.
   */
  properties?: { [property: string]: any };
  /**
   * @property [lastSequenceNumber] The last sequence number of the event within the partition stream of the Event Hub.
   */
  lastSequenceNumber?: number;
  /**
   * @property [lastEnqueuedOffset] The offset of the last enqueued event.
   */
  lastEnqueuedOffset?: string;
  /**
   * @property [lastEnqueuedTime] The enqueued UTC time of the last event.
   */
  lastEnqueuedTime?: Date;
  /**
   * @property [retrievalTime] The time when the runtime info was retrieved
   */
  retrievalTime?: Date;
  /**
   * @property [systemProperties] The properties set by the service.
   */
  systemProperties?: { [property: string]: any };
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
  reply_to_group_id: "replyToGroupId"
} as const;

/**
 * Converts the AMQP message to an EventData.
 * @param msg The AMQP message that needs to be converted to EventData.
 * @ignore
 */
export function fromRheaMessage(msg: RheaMessage): EventDataInternal {
  const data: EventDataInternal = {
    body: msg.body
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
          data.systemProperties[annotationKey] = msg.message_annotations[annotationKey];
          break;
      }
    }
  }
  if (msg.application_properties) {
    data.properties = msg.application_properties;
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
      data.systemProperties[messagePropertiesMap[messageProperty]] = msg[messageProperty];
    }
  }

  return data;
}

/**
 * Converts an EventData object to an AMQP message.
 * @param data The EventData object that needs to be converted to an AMQP message.
 * @param partitionKey An optional key to determine the partition that this event should land in.
 * @ignore
 */
export function toRheaMessage(data: EventData, partitionKey?: string): RheaMessage {
  const msg: RheaMessage = {
    body: data.body
  };
  // As per the AMQP 1.0 spec If the message-annotations or delivery-annotations section is omitted,
  // it is equivalent to a message-annotations section containing anempty map of annotations.
  msg.message_annotations = {};
  if (data.properties) {
    msg.application_properties = data.properties;
  }
  if (partitionKey != undefined) {
    msg.message_annotations[Constants.partitionKey] = partitionKey;
    // Event Hub service cannot route messages to a specific partition based on the partition key
    // if AMQP message header is an empty object. Hence we make sure that header is always present
    // with atleast one property. Setting durable to true, helps us achieve that.
    msg.durable = true;
  }

  return msg;
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
 */
export interface EventData {
  /**
   * @property The message body that needs to be sent.
   */
  body: any;
  /**
   * @property Set of key value pairs that can be used to set properties specific to user application.
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
   * @property The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * @property The application specific properties.
   */
  properties?: {
    [key: string]: any;
  };
  /**
   * @property The enqueued time of the event.
   */
  enqueuedTimeUtc: Date;
  /**
   * @property When specified Event Hub will hash this to a partitionId.
   * It guarantees that messages end up in a specific partition on the event hub.
   */
  partitionKey: string | null;
  /**
   * @property The offset of the event.
   */
  offset: number;
  /**
   * @property The sequence number of the event.
   */
  sequenceNumber: number;
  /**
   * @property The properties set by the service.
   */
  systemProperties?: {
    [key: string]: any;
  };
}
