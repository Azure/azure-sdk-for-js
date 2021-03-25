// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
export type SenderResult = { statusCode: number; result: string };

/**
 * Exporter sender.
 * @internal
 */
export interface Sender {
  send(payload: unknown[]): Promise<SenderResult>;
  shutdown(): Promise<void>;
}

/**
 * Exporter persistent storage.
 * @internal
 */
export interface PersistentStorage {
  shift(): Promise<unknown>;
  push(value: unknown[]): Promise<boolean>;
}
