// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ContextTagKeys } from "./generated";

export type Tags = { [key in ContextTagKeys]: string };
export type PropertyType = string | number | boolean | object | Array<PropertyType>;
export type Properties = { [key: string]: Properties | PropertyType };
export interface MSLink {
  operation_Id: string;
  id: string;
}
export type Measurements = { [key: string]: number };
export type SenderResult = { statusCode: number; result: string };

export interface Sender {
  send(payload: unknown[]): Promise<SenderResult>;
  shutdown(): Promise<void>;
}

export interface PersistentStorage {
  shift(): Promise<unknown>;
  push(value: unknown[]): Promise<boolean>;
}
