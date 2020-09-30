// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ExportResult } from "@opentelemetry/core";
import { Envelope } from "./Declarations/Contracts";

export type Tags = { [key: string]: string };
export type PropertyType = string | number | boolean | object | Array<PropertyType>;
export type Properties = { [key: string]: Properties | PropertyType };
export interface MSLink {
  operation_Id: string;
  id: string;
}
export type Measurements = { [key: string]: number };
export type TelemetryProcessor = (envelope: Envelope) => boolean | void;
export type SenderResult = { statusCode: number; result: string };

export interface BaseExporter {
  addTelemetryProcessor(processor: TelemetryProcessor): void;
  clearTelemetryProcessors(): void;
  exportEnvelopes(envelopes: Envelope[]): Promise<ExportResult>;
}

export interface Sender {
  send(payload: unknown[]): Promise<SenderResult>;
  shutdown(): void;
}

export interface PersistentStorage {
  shift(): Promise<unknown>;
  push(value: unknown[]): Promise<boolean>;
}
