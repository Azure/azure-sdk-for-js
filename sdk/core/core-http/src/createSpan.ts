// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SpanConfig as coreTracingSpanConfig,
  createSpanFunction as coreTracingCreateSpanFunction
} from "@azure/core-tracing";
import { Span } from "@opentelemetry/api";
import { OperationOptions } from "./operationOptions";

export interface SpanConfig extends coreTracingSpanConfig {}

// export function createSpanFunction({ packagePrefix, namespace }: SpanConfig) {
//   return function <T extends OperationOptions>(
//     operationName: string,
//     operationOptions: T
//   ): { span: Span; updatedOptions: T } {

export function createSpanFunction(
  spanConfig: SpanConfig
): <T extends OperationOptions | undefined>(
  operationName: string,
  operationOptions: T
) => {
  span: Span;
  updatedOptions: T;
} {
  return coreTracingCreateSpanFunction(spanConfig);
}

// export function createSpanFunction({ packagePrefix, namespace }: SpanConfig) {
//   return function <T extends OperationOptions>(
//     operationName: string,
//     operationOptions: T
//   ): { span: Span; updatedOptions: T } {
