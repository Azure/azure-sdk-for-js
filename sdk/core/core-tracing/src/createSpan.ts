// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationTracingOptions,
  Span,
  SpanOptions,
  SpanKind,
  setSpan,
  context as otContext,
  getTracer,
  Context
} from "./interfaces";
import { trace, INVALID_SPAN_CONTEXT } from "@opentelemetry/api";

/**
 * Arguments for `createSpanFunction` that allow you to specify the
 * prefix for each created span as well as the `az.namespace` attribute.
 *
 * @hidden
 */
export interface CreateSpanFunctionArgs {
  /**
   * Package name prefix.
   *
   * NOTE: if this is empty no prefix will be applied to created Span names.
   */
  packagePrefix: string;
  /**
   * Service namespace
   *
   * NOTE: if this is empty no `az.namespace` attribute will be added to created Spans.
   */
  namespace: string;
}

export function isTracingDisabled(): boolean {
  if (typeof process === "undefined") {
    // not supported in browser for now without polyfills
    return false;
  }

  const azureTracingDisabledValue = process.env.AZURE_TRACING_DISABLED?.toLowerCase();

  if (azureTracingDisabledValue === "false" || azureTracingDisabledValue === "0") {
    return false;
  }

  return Boolean(azureTracingDisabledValue);
}

function pluckOptions<
  T extends { tracingOptions?: OperationTracingOptions } & { spanOptions?: SpanOptions }
>(operationOptions: T & { tracingOptions?: OperationTracingOptions }) {
  const { tracingOptions, spanOptions, ...otherOptions } = operationOptions || {};

  return {
    tracingOptions,
    spanOptions,
    otherOptions
  };
}

function startSpan(spanName: string, spanOptions?: SpanOptions, context?: Context) {
  const mergedSpanOptions: SpanOptions = {
    kind: SpanKind.INTERNAL,
    ...spanOptions
  };

  if (isTracingDisabled()) {
    return trace.wrapSpanContext(INVALID_SPAN_CONTEXT);
  }

  return getTracer().startSpan(spanName, mergedSpanOptions, context);
}

/**
 * Creates a function that can be used to create spans using the global tracer.
 *
 * Usage:
 *
 * ```typescript
 * // once
 * const createSpan = createSpanFunction({ packagePrefix: "Azure.Data.AppConfiguration", namespace: "Microsoft.AppConfiguration" });
 *
 * // in each operation
 * const span = createSpan("deleteConfigurationSetting", operationOptions);
 *    // code...
 * span.end();
 *
 * // customizing the created span
 * const span = createSpan("deleteConfigurationSetting", {...operationOptions, spanOptions: { spanKind: SpanKind.SERVER } });
 * ```
 *
 * @hidden
 * @param args - allows configuration of the prefix for each span as well as the az.namespace field.
 */
export function createSpanFunction(args: CreateSpanFunctionArgs) {
  // Internally we can provide spanOptions to configure newly created spans, but these spanOptions are not part of our client library public API.
  return function<
    T extends { tracingOptions?: OperationTracingOptions } & { spanOptions?: SpanOptions }
  >(
    operationName: string,
    operationOptions?: T
  ): { span: Span; updatedOptions: Omit<T, "spanOptions"> } {
    const { tracingOptions, spanOptions, otherOptions } = pluckOptions(operationOptions || {});

    const spanName = args.packagePrefix ? `${args.packagePrefix}.${operationName}` : operationName;
    let context = tracingOptions?.tracingContext || otContext.active();
    const span = startSpan(spanName, spanOptions, context);

    if (args.namespace) {
      span.setAttribute("az.namespace", args.namespace);
      context = context.setValue(Symbol.for("az.namespace"), args.namespace);
    }

    const newTracingOptions: Required<OperationTracingOptions> = {
      ...tracingOptions,
      tracingContext: setSpan(context, span)
    };

    const newOperationOptions = {
      ...otherOptions,
      tracingOptions: newTracingOptions
    } as T & { tracingOptions: Required<OperationTracingOptions> };

    return {
      span,
      updatedOptions: newOperationOptions
    };
  };
}
