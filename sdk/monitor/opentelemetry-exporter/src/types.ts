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
export type SenderCallback = (err: Error | null, statusCode?: number, result?: string) => void;

export interface BaseExporter {
  addTelemetryProcessor(processor: TelemetryProcessor): void;
  clearTelemetryProcessors(): void;
  exportEnvelopes(envelopes: Envelope[], resultCallback: (result: ExportResult) => void): void;
}

export interface Sender {
  send(payload: unknown[], callback?: SenderCallback): void;
  shutdown(): void;
}

export interface PersistentStorage {
  shift(cb: (err: Error | null, value?: unknown[]) => void): void;
  push(value: unknown[], cb: (err: Error | null, result?: boolean) => void): void;
}
