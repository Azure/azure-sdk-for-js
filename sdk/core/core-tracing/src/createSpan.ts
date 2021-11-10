// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Context,
  OperationTracingOptions,
  Span,
  SpanKind,
  SpanOptions,
  getTracer,
  context as otContext,
  setSpan
} from "./interfaces";
import { INVALID_SPAN_CONTEXT, trace } from "@opentelemetry/api";

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

/**
 * @internal
 * A set of known span attributes that will exist on a context
 */
export const knownSpanAttributes = {
  AZ_NAMESPACE: { contextKey: Symbol.for("az.namespace"), spanAttributeName: "az.namespace" }
};

/**
 * Checks whether tracing is disabled by checking the `AZURE_TRACING_DISABLED` environment variable.
 *
 * @returns - `true` if tracing is disabled, `false` otherwise.
 *
 * @internal
 */
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
 * Maintains backwards compatibility with the previous `OperationTracingOptions` in core-tracing preview.13 and earlier
 * which passed `spanOptions` as part of `tracingOptions`.
 */
function disambiguateParameters<T extends { tracingOptions?: OperationTracingOptions }>(
  operationOptions: T,
  startSpanOptions?: SpanOptions
): [OperationTracingOptions, SpanOptions] {
  const { tracingOptions } = operationOptions;

  // If startSpanOptions is provided, then we are using the new signature,
  // otherwise try to pluck it out of the tracingOptions.
  const spanOptions: SpanOptions = startSpanOptions || (tracingOptions as any)?.spanOptions || {};
  spanOptions.kind = spanOptions.kind || SpanKind.INTERNAL;

  return [tracingOptions || {}, spanOptions];
}

/**
 * Creates a new span using the given parameters.
 *
 * @param spanName - The name of the span to created.
 * @param spanOptions - Initialization options that can be used to customize the created span.
 * @param tracingContext - The tracing context to use for the created span.
 *
 * @returns - A new span.
 */
function startSpan(spanName: string, spanOptions: SpanOptions, tracingContext: Context) {
  if (isTracingDisabled()) {
    return trace.wrapSpanContext(INVALID_SPAN_CONTEXT);
  }

  const tracer = getTracer();
  return tracer.startSpan(spanName, spanOptions, tracingContext);
}

/**
 * Adds the `az.namespace` attribute on a span, the tracingContext, and the spanOptions
 *
 * @param span - The span to add the attribute to in place.
 * @param tracingContext - The context bag to add the attribute to by creating a new context with the attribute.
 * @param namespace - The value of the attribute.
 * @param spanOptions - The spanOptions to add the attribute to (for backwards compatibility).
 *
 * @internal
 *
 * @returns The updated span options and context.
 */
function setNamespaceOnSpan(
  span: Span,
  tracingContext: Context,
  namespace: string,
  spanOptions: SpanOptions
) {
  span.setAttribute(knownSpanAttributes.AZ_NAMESPACE.spanAttributeName, namespace);
  const updatedContext = tracingContext.setValue(
    knownSpanAttributes.AZ_NAMESPACE.contextKey,
    namespace
  );

  // Here for backwards compatibility, but can be removed once we no longer use `spanOptions` (every client and core library depends on a version higher than preview.13)
  const updatedSpanOptions = {
    ...spanOptions,
    attributes: {
      ...spanOptions?.attributes,
      [knownSpanAttributes.AZ_NAMESPACE.spanAttributeName]: namespace
    }
  };

  return { updatedSpanOptions, updatedContext };
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
   * @returns - A span from the global tracer provider, and an updatedOptions bag containing the new tracing context.
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
    const [tracingOptions, spanOptions] = disambiguateParameters(
      operationOptions || ({} as T),
      startSpanOptions
    );

    let tracingContext = tracingOptions?.tracingContext || otContext.active();

    const spanName = args.packagePrefix ? `${args.packagePrefix}.${operationName}` : operationName;
    const span = startSpan(spanName, spanOptions, tracingContext);

    let newSpanOptions = spanOptions;
    if (args.namespace) {
      const { updatedSpanOptions, updatedContext } = setNamespaceOnSpan(
        span,
        tracingContext,
        args.namespace,
        spanOptions
      );

      tracingContext = updatedContext;
      newSpanOptions = updatedSpanOptions;
    }

    const newTracingOptions = {
      ...tracingOptions,
      spanOptions: newSpanOptions,
      tracingContext: setSpan(tracingContext, span)
    };

    const newOperationOptions = {
      ...(operationOptions as T),
      tracingOptions: newTracingOptions
    };

    return {
      span,
      updatedOptions: newOperationOptions
    };
  };
}
