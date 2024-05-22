// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";
import {
  BrokerProperties,
  PublishCloudEventsOptions,
  ReceiveCloudEventsOptions,
  AcknowledgeCloudEventsOptions,
  ReleaseCloudEventsOptions,
  RejectCloudEventsOptions,
  RenewCloudEventLocksOptions,
  EventGridClientOptions as EventGridOptions,
} from "./cadl-generated";

export interface SendEventOptions extends OperationOptions {
  /** binary mode */
  binaryMode?: boolean;

  /** content type */
  contentType?: string;

  topicName?: string;
}

export interface EventGridSenderClientOptions extends EventGridOptions {
  topicName?: string;
}

export interface EventGridReceiverClientOptions extends EventGridOptions {
  topicName?: string;
}

export interface SendEventsOptions extends PublishCloudEventsOptions {
  topicName?: string;
}

export interface ReceiveEventsOptions extends ReceiveCloudEventsOptions {
  topicName?: string;
}

export interface AcknowledgeEventsOptions extends AcknowledgeCloudEventsOptions {
  topicName?: string;
}

export interface ReleaseEventsOptions extends ReleaseCloudEventsOptions {
  topicName?: string;
}

export interface RejectEventsOptions extends RejectCloudEventsOptions {
  topicName?: string;
}

export interface RenewEventLocksOptions extends RenewCloudEventLocksOptions {
  topicName?: string;
}

/** Receive operation details per Cloud Event. */
export interface ReceiveDetails<T> {
  /** The Event Broker details. */
  brokerProperties: BrokerProperties;
  /** Cloud Event details. */
  event: CloudEvent<T>;
}

/**
 * An event in the Cloud Event 1.0 schema.
 */
export interface CloudEvent<T> {
  /**
   * Type of event related to the originating occurrence.
   */
  type: string;
  /**
   * Identifies the context in which an event happened. The combination of id and source must be unique for each distinct event.
   */
  source: string;
  /**
   * An identifier for the event. The combination of id and source must be unique for each distinct event.
   */
  id: string;
  /**
   * The time the event was generated.
   */
  time?: Date;
  /**
   * Identifies the schema that data adheres to.
   */
  dataschema?: string;
  /**
   * Content type of data value.
   */
  datacontenttype?: string;
  /**
   * Event data specific to the event type.
   */
  data?: T;
  /**
   * This describes the subject of the event in the context of the event producer (identified by source).
   */
  subject?: string;
  /**
   * Additional context attributes for the event. The Cloud Event specification refers to these as "extension attributes".
   */
  extensionAttributes?: Record<string, unknown>;
  /**
   * The version of the CloudEvents specification which the event uses.
   */
  specversion?: string | "1.0";
}

/** Details of the Receive operation response. */
export interface ReceiveResult<T> {
  /** Array of receive responses, one per cloud event. */
  details: ReceiveDetails<T>[];
}

export const cloudEventReservedPropertyNames = [
  "specversion",
  "id",
  "source",
  "type",
  "datacontenttype",
  "dataschema",
  "subject",
  "time",
  "data",
];
