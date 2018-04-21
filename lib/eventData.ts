// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as Constants from "./util/constants";

/**
 * Provides a Dictionary like structure <Key, Value> of Type T.
 * @interface Dictionary
 */
export interface Dictionary<T> {
  [key: string]: T;
}

/**
 * Describes the structure of an event to be sent or received from the EventHub.
 * @interface EventData
 */
export interface EventData {
  /**
   * @property {any} body - The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * @property {Date} [enqueuedTimeUtc] The enqueued time of the event.
   */
  enqueuedTimeUtc?: Date;
  /**
   * @property {string | null} [partitionKey] If specified EventHub will hash this to a partitionId.
   * It guarantees that messages end up in a specific partition on the event hub.
   */
  partitionKey?: string | null;
  /**
   * @property {string} [offset] The offset of the event.
   */
  offset?: string;
  /**
   * @property {number} [sequenceNumber] The sequence number of the event.
   */
  sequenceNumber?: number;
  /**
   * @property {AmqpMessageAnnotations} [annotations] The amqp message attributes.
   */
  annotations?: AmqpMessageAnnotations;
  /**
   * @property {AmqpMessageProperties} [properties] The predefined AMQP properties like message_id, correlation_id, reply_to, etc.
   */
  properties?: AmqpMessageProperties;
  /**
   * @property {Dictionary<any>} [applicationProperties] The application specific properties.
   */
  applicationProperties?: Dictionary<any>;
  /**
   * @property {number} [lastSequenceNumber] The last sequence number of the event within the partition stream of the Event Hub.
   */
  lastSequenceNumber?: number;
  /**
   * @property {string} [lastEnqueuedOffset] The offset of the last enqueued event.
   */
  lastEnqueuedOffset?: string;
  /**
   * @property {Date} [lastEnqueuedTime] The enqueued UTC time of the last event.
   */
  lastEnqueuedTime?: Date;
  /**
   * @property {Date} [retrievalTime] The time when the runtime info was retrieved
   */
  retrievalTime?: Date;
  /**
   * @property {AmqpMessage} _raw_amqp_mesage The underlying raw amqp message.
   */
  _raw_amqp_mesage?: AmqpMessage;
}

/**
 * Describes the delivery annotations.
 * @interface
 */
export interface DeliveryAnnotations {
  /**
   * @property {string} [last_enqueued_offset] The offset of the last event.
   */
  last_enqueued_offset?: string;
  /**
   * @property {number} [last_enqueued_sequence_number] The sequence number of the last event.
   */
  last_enqueued_sequence_number?: number;
  /**
   * @property {number} [last_enqueued_time_utc] The enqueued time of the last event.
   */
  last_enqueued_time_utc?: number;
  /**
   * @property {number} [runtime_info_retrieval_time_utc] The retrieval time of the last event.
   */
  runtime_info_retrieval_time_utc?: number;
  /**
   * @property {string} Any unknown delivery annotations.
   */
  [x: string]: any;
}
/**
 * Map containing message attributes that will be held in the message header.
 */
export interface AmqpMessageAnnotations {
  /**
   * @property {string | null} [x-opt-partition-key] Annotation for the partition key set for the event.
   */
  "x-opt-partition-key"?: string | null;
  /**
   * @property {number} [x-opt-sequence-number] Annontation for the sequence number of the event.
   */
  "x-opt-sequence-number"?: number;
  /**
   * @property {number} [x-opt-enqueued-time] Annotation for the enqueued time of the event.
   */
  "x-opt-enqueued-time"?: number;
  /**
   * @property {string} [x-opt-offset] Annotation for the offset of the event.
   */
  "x-opt-offset"?: string;
  /**
   * @property {any} Any other annotation that can be added to the message.
   */
  [x: string]: any;
}

/**
 * Describes the defined set of standard properties of the message.
 * @interface AmqpMessageProperties
 */
export interface AmqpMessageProperties {
  /**
   * @property {string} [message_id] The application message identifier that uniquely idenitifes a message.
   * The user is responsible for making sure that this is unique in the given context. Guids usually make a good fit.
   */
  message_id?: string;
  /**
   * @property {string} [reply_to] The address of the node to send replies to.
   */
  reply_to?: string;
  /**
   * @property {string} [to] The address of the node the message is destined for.
   */
  to?: string;
  /**
   * @property {string} [correlation_id] The id that can be used to mark or identify messages between clients.
   */
  correlation_id?: string;
  /**
   * @property {string} [content_type] MIME type for the message.
   */
  content_type?: string;
  /**
   * @property {string} [content_encoding] The content-encoding property is used as a modifier to the content-type.
   * When present, its valueindicates what additional content encodings have been applied to the application-data.
   */
  content_encoding?: string;
  /**
   * @property {number} [absolute_expiry_time] The time when this message is considered expired.
   */
  absolute_expiry_time?: number;
  /**
   * @property {number} [creation_time] The time this message was created.
   */
  creation_time?: number;
  /**
   * @property {string} [group_id] The group this message belongs to.
   */
  group_id?: string;
  /**
   * @property {number} [group_sequence] The sequence number of this message with its group.
   */
  group_sequence?: number;
  /**
   * @property {string} [reply_to_group_id] The group the reply message belongs to.
   */
  reply_to_group_id?: string;
}

/**
 * Describes the AMQP message that is sent or received on the wire.
 * @interface AmqpMessage
 */
export interface AmqpMessage extends AmqpMessageProperties {
  // TODO: Ask Gordon about other AMQP message properties like durable, first_acquirer, etc.
  // https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-amqp-protocol-guide#messages
  body: any;
  message_annotations?: AmqpMessageAnnotations;
  application_properties?: Dictionary<any>;
  delivery_annotations?: DeliveryAnnotations;
}

export const messageProperties: string[] = [
  "message_id", "reply_to", "to", "correlation_id", "content_type", "absolute_expiry_time",
  "group_id", "group_sequence", "reply_to_group_id", "content_encoding", "creation_time"
];

/**
 * Describes the methods on the EventData interface.
 * @module EventData
 */
export namespace EventData {

  /**
   * Converts the AMQP message to an EventData.
   * @param {AmqpMessage} msg The AMQP message that needs to be converted to EventData.
   */
  export function fromAmqpMessage(msg: AmqpMessage): EventData {
    // TODO: Look at how other sdks are encoding their payloads and copy them. This will ensure consistency across all the sdks.
    const data: EventData = {
      body: msg.body,
      _raw_amqp_mesage: msg
    };
    if (msg.message_annotations) {
      data.annotations = msg.message_annotations;
      if (msg.message_annotations[Constants.partitionKey]) data.partitionKey = msg.message_annotations[Constants.partitionKey];
      if (msg.message_annotations[Constants.sequenceNumber]) data.sequenceNumber = msg.message_annotations[Constants.sequenceNumber];
      if (msg.message_annotations[Constants.enqueuedTime]) data.enqueuedTimeUtc = new Date(msg.message_annotations[Constants.enqueuedTime] as number);
      if (msg.message_annotations[Constants.offset]) data.offset = msg.message_annotations[Constants.offset];
    }
    // Since rhea expects message properties as top level properties we will look for them and unflatten them inside properties.
    for (const prop of messageProperties) {
      if ((msg as any)[prop]) {
        if (!data.properties) {
          data.properties = {};
        }
        (data.properties as any)[prop] = (msg as any)[prop];
      }
    }
    if (msg.application_properties) {
      data.applicationProperties = msg.application_properties;
    }
    if (msg.delivery_annotations) {
      data.lastEnqueuedOffset = msg.delivery_annotations.last_enqueued_offset;
      data.lastSequenceNumber = msg.delivery_annotations.last_enqueued_sequence_number;
      data.lastEnqueuedTime = new Date(msg.delivery_annotations.last_enqueued_time_utc as number);
      data.retrievalTime = new Date(msg.delivery_annotations.runtime_info_retrieval_time_utc as number);
    }
    return data;
  }
  /**
   * Converts an EventData object to an AMQP message.
   * @param {EventData} data The EventData object that needs to be converted to an AMQP message.
   */
  export function toAmqpMessage(data: EventData): AmqpMessage {
    const msg: AmqpMessage = {
      body: data.body,
    };
    // As per the AMQP 1.0 spec If the message-annotations or delivery-annotations section is omitted,
    // it is equivalent to a message-annotations section containing anempty map of annotations.
    msg.message_annotations = {};
    msg.delivery_annotations = {};
    if (data.annotations) {
      msg.message_annotations = data.annotations;
    }
    if (data.properties) {
      // Set amqp message properties as top level properties, since rhea sends them as top level properties.
      for (const prop in data.properties) {
        (msg as any)[prop] = (data.properties as any)[prop];
      }
    }
    if (data.applicationProperties) {
      msg.application_properties = data.applicationProperties;
    }
    if (data.partitionKey) {
      msg.message_annotations[Constants.partitionKey] = data.partitionKey;
    }
    if (data.sequenceNumber != undefined) {
      msg.message_annotations[Constants.sequenceNumber] = data.sequenceNumber;
    }
    if (data.enqueuedTimeUtc) {
      msg.message_annotations[Constants.enqueuedTime] = data.enqueuedTimeUtc.getTime();
    }
    if (data.offset != undefined) {
      msg.message_annotations[Constants.offset] = data.offset;
    }
    if (data.lastEnqueuedOffset != undefined) {
      msg.delivery_annotations.last_enqueued_offset = data.lastEnqueuedOffset;
    }
    if (data.lastSequenceNumber != undefined) {
      msg.delivery_annotations.last_enqueued_sequence_number = data.lastSequenceNumber;
    }
    if (data.lastEnqueuedTime) {
      msg.delivery_annotations.last_enqueued_time_utc = data.lastEnqueuedTime.getTime();
    }
    if (data.retrievalTime) {
      msg.delivery_annotations.runtime_info_retrieval_time_utc = data.retrievalTime.getTime();
    }
    return msg;
  }
}
