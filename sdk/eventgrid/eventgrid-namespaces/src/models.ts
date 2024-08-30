// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";
import {
  BrokerProperties,
  PublishCloudEventOptionalParams,
  ReceiveCloudEventsOptionalParams,
  AcknowledgeCloudEventsOptionalParams,
  RejectCloudEventsOptionalParams,
  RenewCloudEventLocksOptionalParams,
  EventGridClientOptions as EventGridOptions,
  ReleaseDelay,
} from "./cadl-generated";

/** Send Event Options */
export interface SendEventOptions extends OperationOptions {
  /** Content type */
  contentType?: string;

  /** Topic name */
  topicName?: string;
}

/** Event Grid Sender Client Options */
export interface EventGridSenderClientOptions extends EventGridOptions {}

/** Event Grid Receiver Client Options */
export interface EventGridReceiverClientOptions extends EventGridOptions {}

/** Send Events Options */
export interface SendEventsOptions extends PublishCloudEventOptionalParams {}

/** Receive Events Options */
export interface ReceiveEventsOptions extends ReceiveCloudEventsOptionalParams {}

/** Acknowledge Events Options */
export interface AcknowledgeEventsOptions extends AcknowledgeCloudEventsOptionalParams {}

/** Release Events Options */
export interface ReleaseEventsOptions extends OperationOptions {
  /** Release events with the specified delay in seconds. */
  releaseDelay?: ReleaseDelay;
}

/** Reject Events Options */
export interface RejectEventsOptions extends RejectCloudEventsOptionalParams {}

/** Renew Event Locks Options */
export interface RenewEventLocksOptions extends RenewCloudEventLocksOptionalParams {}

/** Known values of {@link ReleaseDelay} that the service accepts. */
export const enum KnownReleaseDelay {
  /** Ten Minutes */
  TenMinutes = "600",

  /** One Minute */
  OneMinute = "60",

  /** Ten Seconds */
  TenSeconds = "10",

  /** One Hour */
  OneHour = "3600",

  /** No Delay */
  NoDelay = "0",
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
  dataSchema?: string;
  /**
   * Content type of data value.
   */
  dataContentType?: string;
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
  specVersion?: string | "1.0";
}

/** Details of the Receive operation response. */
export interface ReceiveResult<T> {
  /** Array of receive responses, one per cloud event. */
  details: ReceiveDetails<T>[];
}

export const cloudEventReservedPropertyNames = [
  "specVersion",
  "id",
  "source",
  "type",
  "dataContentType",
  "dataSchema",
  "subject",
  "time",
  "data",
];
