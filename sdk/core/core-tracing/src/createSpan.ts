// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationTracingOptions,
  Span,
  SpanOptions,
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

/**
 * Maintains backwards compatibility with the previous `OperationTracingOptions` which included `SpanOptions`
 */
function pluckOptions<T extends { tracingOptions?: OperationTracingOptions }>(
  operationOptions: T,
  startSpanOptions?: SpanOptions
): [OperationTracingOptions, SpanOptions, T] {
  const { tracingOptions } = operationOptions;
  return [
    tracingOptions || {},
    startSpanOptions || (tracingOptions as any)?.spanOptions || {},
    operationOptions
  ];
}

function startSpan(spanName: string, spanOptions: SpanOptions, tracingContext: Context) {
  const tracer = getTracer();

  if (isTracingDisabled()) {
    return trace.wrapSpanContext(INVALID_SPAN_CONTEXT);
  }

  return tracer.startSpan(spanName, spanOptions, tracingContext);
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
 * const span = createSpan("deleteConfigurationSetting", operationOptions, startSpanOptions );
 *    // code...
 * span.end();
 * ```
 *
 * @param args - allows configuration of the prefix for each span as well as the az.namespace field.
 */
export function createSpanFunction(args: CreateSpanFunctionArgs) {
  /**
   * Creates a span using the global tracer provider.
   *
   * @param operationName - The name of the operation to create a span for.
   * @param operationOptions - The operation options containing the currently active tracing context when using manual span propagation.
   * @param startSpanOptions - The options to use when creating the span, and will be passed to the tracer.startSpan method.
   *
   * @returns A span that can be used to create spans using the global tracer as well as updated options containing the currently active tracing context.
   *
   * Example usage:
   * ```ts
   * const { span, updatedOptions } = createSpan("deleteConfigurationSetting", operationOptions, startSpanOptions);
   * ```
   */
  return function<T extends { tracingOptions?: OperationTracingOptions }>(
    operationName: string,
    operationOptions?: T,
    startSpanOptions?: SpanOptions
  ): { span: Span; updatedOptions: T } {
    const [tracingOptions, spanOptions, otherOptions] = pluckOptions(
      operationOptions || ({} as T),
      startSpanOptions
    );
    let tracingContext = tracingOptions?.tracingContext || otContext.active();

    const spanName = args.packagePrefix ? `${args.packagePrefix}.${operationName}` : operationName;
    const span = startSpan(spanName, spanOptions, tracingContext);

    let newSpanOptions = spanOptions;
    if (args.namespace) {
      span.setAttribute(knownSpanAttributes.AZ_NAMESPACE.spanAttributeName, args.namespace);
      tracingContext = tracingContext.setValue(
        knownSpanAttributes.AZ_NAMESPACE.contextKey,
        args.namespace
      );
      newSpanOptions = {
        ...spanOptions,
        attributes: {
          ...spanOptions?.attributes,
          [knownSpanAttributes.AZ_NAMESPACE.spanAttributeName]: args.namespace
        }
      };
    }

    const newTracingOptions = {
      ...tracingOptions,
      spanOptions: newSpanOptions,
      tracingContext: setSpan(tracingContext, span)
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

/**
 * @internal
 * A set of known span attributes that will exist on a context
 */
export const knownSpanAttributes = {
  AZ_NAMESPACE: { contextKey: Symbol.for("az.namespace"), spanAttributeName: "az.namespace" }
};
