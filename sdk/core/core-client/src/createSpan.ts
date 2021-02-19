// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SpanConfig as coreTracingSpanConfig,
  createSpanFunction as coreTracingCreateSpanFunction
} from "@azure/core-tracing";
import { Span } from "@opentelemetry/api";
import { OperationOptions } from "./interfaces";

export interface SpanConfig extends coreTracingSpanConfig {}

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
