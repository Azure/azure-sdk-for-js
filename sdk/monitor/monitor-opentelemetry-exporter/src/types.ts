// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AvailabilityData,
  ContextTagKeys,
  MessageData,
  PageViewData,
  TelemetryEventData,
  TelemetryExceptionData,
} from "./generated";

/**
 * Azure Monitor envelope tags.
 * @internal
 */
export type Tags = { [key in ContextTagKeys]: string };
/**
 * Azure Monitor envelope property type.
 * @internal
 */
export type PropertyType = string | number | boolean | object | Array<PropertyType>;
/**
 * Azure Monitor envelope properties.
 * @internal
 */
export type Properties = { [key: string]: Properties | PropertyType };
/**
 * Azure Monitor envelope links.
 * @internal
 */
export interface MSLink {
  operation_Id: string;
  id: string;
}
/**
 * Azure Monitor envelope measurements.
 * @internal
 */
export type Measurements = { [key: string]: number };
/**
 * Exporter sender result.
 * @internal
 */
export type SenderResult = { statusCode: number | undefined; result: string };
/**
 * Legacy ApplicationInsights baseData types
 * @internal
 */
export type LegacyBaseData =
  | AvailabilityData
  | TelemetryExceptionData
  | MessageData
  | PageViewData
  | TelemetryEventData;

/**
 * Exporter persistent storage.
 * @internal
 */
export interface PersistentStorage {
  shift(): Promise<unknown>;
  push(value: unknown[]): Promise<boolean>;
}
