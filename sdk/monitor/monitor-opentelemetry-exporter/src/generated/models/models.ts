// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** System variables for a telemetry item. */
export interface TelemetryItem {
  /**
   * Envelope version. For internal use only. By assigning this the default, it will
   * not be serialized within the payload unless changed to a value other than #1.
   */
  version?: number;
  /** Type name of telemetry data item. */
  name: string;
  /**
   * Event date time when telemetry item was created. This is the wall clock time on
   * the client when the event was generated. There is no guarantee that the
   * client's time is accurate. This field must be formatted in UTC ISO 8601 format,
   * with a trailing 'Z' character, as described publicly on
   * https://en.wikipedia.org/wiki/ISO_8601#UTC. Note: the number of decimal seconds
   * digits provided are variable (and unspecified). Consumers should handle this,
   * i.e. managed code consumers should not use format 'O' for parsing as it
   * specifies a fixed length. Example: 2009-06-15T13:45:30.0000000Z.
   */
  time: Date;
  /**
   * Sampling rate used in application. This telemetry item represents 100 /
   * sampleRate actual telemetry items.
   */
  sampleRate?: number;
  /** Sequence field used to track absolute order of uploaded events. */
  sequence?: string;
  /** The instrumentation key of the Application Insights resource. */
  instrumentationKey?: string;
  /**
   * Key/value collection of context properties. See ContextTagKeys for information
   * on available properties.
   */
  tags?: Record<string, string>;
  /** Telemetry data item. */
  data?: MonitorBase;
}

export function telemetryItemSerializer(item: TelemetryItem): any {
  return {
    ver: item["version"],
    name: item["name"],
    time: item["time"].toISOString(),
    sampleRate: item["sampleRate"],
    seq: item["sequence"],
    iKey: item["instrumentationKey"],
    tags: item["tags"],
    data: !item["data"] ? item["data"] : monitorBaseSerializer(item["data"]),
  };
}

/** Data struct to contain only C section with custom fields. */
export interface MonitorBase {
  /**
   * Name of item (B section) if any. If telemetry data is derived straight from
   * this, this should be null.
   */
  baseType?: string;
  /** The data payload for the telemetry request */
  baseData?: EventDomain;
}

export function monitorBaseSerializer(item: MonitorBase): any {
  return {
    baseType: item["baseType"],
    baseData: !item["baseData"] ? item["baseData"] : eventDomainSerializer(item["baseData"]),
  };
}

/** The abstract common base of all domains. */
export interface EventDomain {
  /** Schema version */
  version: number;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function eventDomainSerializer(item: EventDomain): any {
  return { ...serializeRecord(item.additionalProperties ?? {}), ver: item["version"] };
}

/** Response containing the status of each telemetry item. */
export interface TrackResponse {
  /** The number of items received. */
  itemsReceived?: number;
  /** The number of items accepted. */
  itemsAccepted?: number;
  /** An array of error detail objects. */
  errors?: TelemetryErrorDetails[];
}

export function trackResponseDeserializer(item: any): TrackResponse {
  return {
    itemsReceived: item["itemsReceived"],
    itemsAccepted: item["itemsAccepted"],
    errors: !item["errors"]
      ? item["errors"]
      : telemetryErrorDetailsArrayDeserializer(item["errors"]),
  };
}

export function telemetryErrorDetailsArrayDeserializer(
  result: Array<TelemetryErrorDetails>,
): any[] {
  return result.map((item) => {
    return telemetryErrorDetailsDeserializer(item);
  });
}

/** The error details */
export interface TelemetryErrorDetails {
  /** The index in the original payload of the item. */
  index?: number;
  /** The item specific [HTTP Response status code](#Response Status Codes). */
  statusCode?: number;
  /** The error message. */
  message?: string;
}

export function telemetryErrorDetailsDeserializer(item: any): TelemetryErrorDetails {
  return {
    index: item["index"],
    statusCode: item["statusCode"],
    message: item["message"],
  };
}

/** Type of Versions */
export type Versions = "v2.1";

export function telemetryItemArraySerializer(result: Array<TelemetryItem>): any[] {
  return result.map((item) => {
    return telemetryItemSerializer(item);
  });
}
