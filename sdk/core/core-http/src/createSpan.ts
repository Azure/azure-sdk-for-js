// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Span, SpanOptions, SpanKind } from "@opentelemetry/api";
import { getTracer } from "@azure/core-tracing";
import { OperationOptions } from "./coreHttp";

type OperationTracingOptions = OperationOptions["tracingOptions"];
type SpanConfig = { operationName: string; packagePrefix: string; namespace: string };

/**
 * Creates a span using the global tracer.
 * @ignore
 * @param spanConfig The name of the operation being performed.
 * @param tracingOptions The options for the underlying http request.
 */
export function createSpan<T extends OperationOptions>(
  { operationName, packagePrefix, namespace }: SpanConfig,
  operationOptions: T
): { span: Span; updatedOptions: T } {
  const tracer = getTracer();
  const tracingOptions = operationOptions.tracingOptions || {};
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
  };

  const newOperationOptions: T = {
    ...operationOptions,
    tracingOptions: newTracingOptions
  };

  return {
    span,
    updatedOptions: newOperationOptions
  };
}
