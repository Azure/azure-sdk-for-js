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
  properties?: Dictionary<any>;
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

export interface AmqpMessage {
  // TODO: Ask Gordon about other AMQP message properties like durable, first_acquirer, etc.
  // https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-amqp-protocol-guide#messages
  body: any;
  message_annotations?: AmqpMessageAnnotations;
  properties?: Dictionary<any>;
  application_properties?: Dictionary<any>;
  delivery_annotations?: {
    last_enqueued_offset?: string;
    last_enqueued_sequence_number?: number;
    last_enqueued_time_utc?: number;
    runtime_info_retrieval_time_utc?: number;
    [x: string]: any;
  };
}

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
    if (msg.properties) {
      data.properties = msg.properties;
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
      msg.properties = data.properties;
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
