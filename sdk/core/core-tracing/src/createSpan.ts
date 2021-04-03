// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getTracer } from "../src/tracerProxy";
import {
  OperationTracingOptions,
  Span,
  SpanOptions,
  SpanKind,
  setSpan,
  context as otContext
} from "./interfaces";

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
 * ```
 *
 * @hidden
 * @param args - allows configuration of the prefix for each span as well as the az.namespace field.
 */
export function createSpanFunction(args: CreateSpanFunctionArgs) {
  return function<T extends { tracingOptions?: OperationTracingOptions }>(
    operationName: string,
    operationOptions: T | undefined
  ): { span: Span; updatedOptions: T } {
    const tracer = getTracer();
    const tracingOptions = operationOptions?.tracingOptions || {};
    const spanOptions: SpanOptions = {
      kind: SpanKind.INTERNAL,
      ...tracingOptions.spanOptions
    };

    const spanName = args.packagePrefix ? `${args.packagePrefix}.${operationName}` : operationName;
    const span = tracer.startSpan(spanName, spanOptions, tracingOptions.tracingContext);

    if (args.namespace) {
      span.setAttribute("az.namespace", args.namespace);
    }

    let newSpanOptions = tracingOptions.spanOptions || {};

    if (span.isRecording() && args.namespace) {
      newSpanOptions = {
        ...tracingOptions.spanOptions,
        attributes: {
          ...spanOptions.attributes,
          "az.namespace": args.namespace
        }
      };
    }

    const newTracingOptions: Required<OperationTracingOptions> = {
      ...tracingOptions,
      spanOptions: newSpanOptions,
      tracingContext: setSpan(tracingOptions.tracingContext || otContext.active(), span)
    };

    const newOperationOptions = {
      ...operationOptions,
      tracingOptions: newTracingOptions
    } as T & { tracingOptions: Required<OperationTracingOptions> };

    return {
      span,
      updatedOptions: newOperationOptions
    };
  };
}
