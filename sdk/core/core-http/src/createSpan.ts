// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Span, SpanOptions, SpanKind, Context, context as otContext, setSpan } from "@opentelemetry/api";
import { getTracer } from "@azure/core-tracing";
import { OperationOptions } from "./coreHttp";

type OperationTracingOptions = OperationOptions["tracingOptions"];

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
export function createSpanFunction({ packagePrefix, namespace }: SpanConfig) {
  return function <T extends OperationOptions>(
    operationName: string,
    operationOptions: T,
    context: Context = otContext.active()
  ): { span: Span; updatedOptions: T; } {
    const tracer = getTracer();

    const tracingOptions = operationOptions.tracingOptions || {};

    const spanOptions: SpanOptions = {
      ...tracingOptions.spanOptions,
      kind: SpanKind.INTERNAL
    };

    const span = tracer.startSpan(`${packagePrefix}.${operationName}`, spanOptions, context);
    const newContext = setSpan(context, span);

    span.setAttribute("az.namespace", namespace);

    let newSpanOptions = tracingOptions.spanOptions || {};
    if (span.isRecording()) {
      newSpanOptions = {
        ...tracingOptions.spanOptions,
        attributes: {
          ...spanOptions.attributes,
          "az.namespace": namespace
        }
      };
    }

    const newTracingOptions: OperationTracingOptions = {
      ...tracingOptions,
      spanOptions: newSpanOptions,
      context: newContext
    };

    const newOperationOptions: T = {
      ...operationOptions,
      tracingOptions: newTracingOptions
    };

    return {
      span,
      updatedOptions: newOperationOptions
    };
  };
}
