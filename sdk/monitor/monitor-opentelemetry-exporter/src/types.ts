// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContextTagKeys } from "./generated";

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
 * Exporter persistent storage.
 * @internal
 */
export interface PersistentStorage {
  shift(): Promise<unknown>;
  push(value: unknown[]): Promise<boolean>;
}

/**
 * Performance Counter OpenTelemetry compliant names.
 * @internal
 */
export enum OTelPerformanceCounterNames {
  PRIVATE_BYTES = "Private_Bytes",
  AVAILABLE_BYTES = "Available_Bytes",
  PROCESSOR_TIME = "Processor_Time",
  PROCESS_TIME = "Process_Time",
  REQUEST_RATE = "Request_Rate",
  REQUEST_DURATION = "Request_Execution_Time",
}

/**
 * Breeze Performance Counter names.
 * @internal
 */
export enum BreezePerformanceCounterNames {
  PRIVATE_BYTES = "\\Process(??APP_WIN32_PROC??)\\Private Bytes",
  AVAILABLE_BYTES = "\\Memory\\Available Bytes",
  PROCESSOR_TIME = "\\Processor(_Total)\\% Processor Time",
  PROCESS_TIME = "\\Process(??APP_WIN32_PROC??)\\% Processor Time",
  REQUEST_RATE = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Requests/Sec",
  REQUEST_DURATION = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Request Execution Time",
}
