// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Span, SpanOptions, SpanKind } from "@opentelemetry/api";
import { getTracer } from "../src/tracerProxy";
import { OperationTracingOptions } from "./interfaces";

/**
 * Configuration for creating a new Tracing Span
 * @hidden
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
  return function <T extends ({ tracingOptions?: OperationTracingOptions }) | undefined>(
    operationName: string,
    operationOptions: T
  ): { span: Span; updatedOptions: NonNullable<T> } {
    const tracer = getTracer();
    const tracingOptions = operationOptions?.tracingOptions || {};
    const spanOptions: SpanOptions = {
      ...tracingOptions.spanOptions,
      kind: SpanKind.INTERNAL
    };

    const span = tracer.startSpan(`${packagePrefix}.${operationName}`, spanOptions);

    span.setAttribute("az.namespace", namespace);

    let newSpanOptions = tracingOptions.spanOptions || {};
    if (span.isRecording()) {
      newSpanOptions = {
        ...tracingOptions.spanOptions,
        parent: span.context(),
        attributes: {
          ...spanOptions.attributes,
          "az.namespace": namespace
        }
      };
    }

    const newTracingOptions: OperationTracingOptions = {
      ...tracingOptions,
      spanOptions: newSpanOptions
      // TODO: .context soon.
    };

    const newOperationOptions: NonNullable<T> = {
      ...operationOptions,
      tracingOptions: newTracingOptions
    } as NonNullable<T>;

    return {
      span,
      updatedOptions: newOperationOptions
    };
  };
}
