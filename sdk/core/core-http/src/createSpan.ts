// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunction as coreTracingCreateSpanFunction } from "@azure/core-tracing";

/**
 * Configuration for creating a new Tracing Span
 */
export interface SpanConfig {
  /**
   * Package name prefix
   */
  packagePrefix: string;
  /**
   * Service namespace
   */
  namespace: string;
}

/**
 * Creates a function called createSpan to create spans using the global tracer.
 * @hidden
 * @param spanConfig - The name of the operation being performed.
 * @param tracingOptions - The options for the underlying http request.
 */
export const createSpanFunction = coreTracingCreateSpanFunction;
