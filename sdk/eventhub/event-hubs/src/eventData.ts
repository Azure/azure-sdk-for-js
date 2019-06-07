// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  Message,
  Dictionary,
  MessageAnnotations,
  DeliveryAnnotations
} from "rhea-promise";
import { Constants } from "@azure/amqp-common";

/**
 * Describes the delivery annotations.
 * @interface EventHubDeliveryAnnotations
 */
export interface EventHubDeliveryAnnotations extends DeliveryAnnotations {
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
 * @interface EventHubMessageAnnotations
 */
export interface EventHubMessageAnnotations extends MessageAnnotations {
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
 * Describes the structure of an event to be sent or received from the EventHub.
 * @interface EventData
 */
export interface EventDataInternal {
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
   * @property {Dictionary<any>} [properties] The application specific properties.
   */
  properties?: Dictionary<any>;
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
}

  /**
   * Converts the AMQP message to an EventData.
   * @param {AmqpMessage} msg The AMQP message that needs to be converted to EventData.
   */
  export function fromAmqpMessage(msg: Message): EventDataInternal {
    const data: EventDataInternal = {
      body: msg.body
    };
    if (msg.message_annotations) {
      if (msg.message_annotations[Constants.partitionKey] != undefined) {
        data.partitionKey = msg.message_annotations[Constants.partitionKey];
      }
      if (msg.message_annotations[Constants.sequenceNumber] != undefined) {
        data.sequenceNumber = msg.message_annotations[Constants.sequenceNumber];
      }
      if (msg.message_annotations[Constants.enqueuedTime] != undefined) {
        data.enqueuedTimeUtc = new Date(msg.message_annotations[Constants.enqueuedTime] as number);
      }
      if (msg.message_annotations[Constants.offset] != undefined) {
        data.offset = msg.message_annotations[Constants.offset];
      }
    }
    if (msg.application_properties) {
      data.properties = msg.application_properties;
    }
    if (msg.message_id) {
      if (!data.properties) {
        data.properties = {};
      }
      data.properties.message_id = msg.message_id;
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
   * @param data The EventData object that needs to be converted to an AMQP message.
   * @param partitionKey An optional key to determine the partition that this event should land in.
   */
  export function toAmqpMessage(data: EventData, partitionKey?: string): Message {
    const msg: Message = {
      body: data.body
    };
    // As per the AMQP 1.0 spec If the message-annotations or delivery-annotations section is omitted,
    // it is equivalent to a message-annotations section containing anempty map of annotations.
    msg.message_annotations = {};
    const dataProperties = data.properties;
    if (dataProperties) {
      msg.application_properties = dataProperties;
      if (typeof dataProperties.message_id === 'string') {
        msg.message_id = dataProperties.message_id;
      }
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
 * Describes the structure of an event to be sent to Event Hub
 */
export interface EventData {
  /**
   * @property {any} body - The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * @property {Dictionary<any>} [applicationProperties] The application specific properties.
   */
  properties?: { [key: string]: any };
}

/**
 * Describes the structure of an event received from Event Hub.
 */
export interface ReceivedEventData {
  /**
   * @property {any} body - The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * @property {Dictionary<any>} [applicationProperties] The application specific properties.
   */
  properties?: { [key: string]: any };
  /**
   * @property {Date} [enqueuedTimeUtc] The enqueued time of the event.
   */
  enqueuedTimeUtc: Date;
  /**
   * @property {string | null} [partitionKey] If specified EventHub will hash this to a partitionId.
   * It guarantees that messages end up in a specific partition on the event hub.
   */
  partitionKey: string | null;
  /**
   * @property {string} [offset] The offset of the event.
   */
  offset: string;
  /**
   * @property {number} [sequenceNumber] The sequence number of the event.
   */
  sequenceNumber: number;
}
