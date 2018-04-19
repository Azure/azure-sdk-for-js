// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as Constants from "./util/constants";

export interface Dictionary<T> {
  [key: string]: T;
}

export interface EventData {
  // string or decoded json of that string
  body: any;
  enqueuedTimeUtc?: Date;
  partitionKey?: string | null;
  offset?: string;
  sequenceNumber?: number;
  annotations?: AmqpMessageAnnotations;
  properties?: AmqpMessageProperties;
  applicationProperties?: Dictionary<any>;
  lastSequenceNumber?: number;
  lastEnqueuedOffset?: string;
  lastEnqueuedTime?: Date;
  retrievalTime?: Date;
  _raw_amqp_mesage?: AmqpMessage;
}

export interface AmqpMessageAnnotations {
  "x-opt-partition-key"?: string | null;
  "x-opt-sequence-number"?: number;
  "x-opt-enqueued-time"?: number;
  "x-opt-offset"?: string;
  [x: string]: any;
}

export interface AmqpMessageProperties {
  message_id?: string;
  reply_to?: string;
  to?: string;
  correlation_id?: string;
  content_type?: string;
  content_encoding?: string;
  absolute_expiry_time?: number;
  creation_time?: number;
  group_id?: string;
  group_sequence?: number;
  reply_to_group_id?: string;
}

export interface AmqpMessage extends AmqpMessageProperties {
  // TODO: Ask Gordon about other AMQP message properties like durable, first_acquirer, etc.
  // https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-amqp-protocol-guide#messages
  body: any;
  message_annotations?: AmqpMessageAnnotations;
  application_properties?: Dictionary<any>;
  delivery_annotations?: {
    last_enqueued_offset?: string;
    last_enqueued_sequence_number?: number;
    last_enqueued_time_utc?: number;
    runtime_info_retrieval_time_utc?: number;
    [x: string]: any;
  };
}
export const messageProperties: string[] = [
  "message_id", "reply_to", "to", "correlation_id", "content_type", "absolute_expiry_time",
  "group_id", "group_sequence", "reply_to_group_id", "content_encoding", "creation_time"
];

export namespace EventData {

  export function fromAmqpMessage(msg: AmqpMessage): EventData {
    // TODO: Look at how other sdks are encoding their payloads and copy them. This will ensure consistency across all the sdks.
    const data: EventData = {
      body: msg.body,
      _raw_amqp_mesage: msg
    };
    if (msg.message_annotations) {
      data.annotations = msg.message_annotations;
      data.partitionKey = msg.message_annotations[Constants.partitionKey];
      data.sequenceNumber = msg.message_annotations[Constants.sequenceNumber];
      data.enqueuedTimeUtc = new Date(msg.message_annotations[Constants.enqueuedTime] as number);
      data.offset = msg.message_annotations[Constants.offset];
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

  export function toAmqpMessage(data: EventData): AmqpMessage {
    const msg: AmqpMessage = {
      body: data.body
    };
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
      if (!msg.message_annotations) msg.message_annotations = {};
      msg.message_annotations[Constants.partitionKey] = data.partitionKey;
    }
    if (data.sequenceNumber != undefined) {
      if (!msg.message_annotations) msg.message_annotations = {};
      msg.message_annotations[Constants.sequenceNumber] = data.sequenceNumber;
    }
    if (data.enqueuedTimeUtc) {
      if (!msg.message_annotations) msg.message_annotations = {};
      msg.message_annotations[Constants.enqueuedTime] = data.enqueuedTimeUtc.getTime();
    }
    if (data.offset != undefined) {
      if (!msg.message_annotations) msg.message_annotations = {};
      msg.message_annotations[Constants.offset] = data.offset;
    }
    if (data.lastEnqueuedOffset != undefined) {
      if (!msg.delivery_annotations) msg.delivery_annotations = {};
      msg.delivery_annotations.last_enqueued_offset = data.lastEnqueuedOffset;
    }
    if (data.lastSequenceNumber != undefined) {
      if (!msg.delivery_annotations) msg.delivery_annotations = {};
      msg.delivery_annotations.last_enqueued_sequence_number = data.lastSequenceNumber;
    }
    if (data.lastEnqueuedTime) {
      if (!msg.delivery_annotations) msg.delivery_annotations = {};
      msg.delivery_annotations.last_enqueued_time_utc = data.lastEnqueuedTime.getTime();
    }
    if (data.retrievalTime) {
      if (!msg.delivery_annotations) msg.delivery_annotations = {};
      msg.delivery_annotations.runtime_info_retrieval_time_utc = data.retrievalTime.getTime();
    }
    return msg;
  }
}
