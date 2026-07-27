// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../../static-helpers/serialization/serialize-record.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An interval in time specifying the date and time for the inclusive start and exclusive end, i.e. `[start, end)`. */
export interface DateTimeInterval {
  /** A datetime indicating the inclusive/closed start of the time interval, i.e. `[`**`start`**`, end)`. Specifying a `start` that occurs chronologically after `end` will result in an error. */
  start: Date;
  /** A datetime indicating the exclusive/open end of the time interval, i.e. `[start, `**`end`**`)`. Specifying an `end` that occurs chronologically before `start` will result in an error. */
  end: Date;
}

export function dateTimeIntervalSerializer(item: DateTimeInterval): any {
  return { start: item["start"].toISOString(), end: item["end"].toISOString() };
}

/** An error response from the API. */
export interface ErrorResponse {
  /** Error information. */
  error: ErrorModel;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: errorDeserializer(item["error"]),
  };
}

/** Error details. */
export interface ErrorModel {
  /** Error code identifying the specific error. */
  code: string;
  /** A human readable error message. */
  message: string;
  /** Error details */
  details?: ErrorDetails[];
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"] ? item["details"] : errorDetailsArrayDeserializer(item["details"]),
  };
}

export function errorDetailsArrayDeserializer(result: Array<ErrorDetails>): any[] {
  return result.map((item) => {
    return errorDetailsDeserializer(item);
  });
}

/** Error details. */
export interface ErrorDetails {
  /** Error code identifying the specific error. */
  code: string;
  /** A human readable error message. */
  message: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function errorDetailsDeserializer(item: any): ErrorDetails {
  return {
    additionalProperties: serializeRecord(item, ["code", "message"]),
    code: item["code"],
    message: item["message"],
  };
}

/** Defines in which format query result returned. */
export type ResultFormat = "table" | "objectArray";
