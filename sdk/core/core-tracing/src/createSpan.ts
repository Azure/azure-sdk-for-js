// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Span, SpanOptions, SpanKind } from "@opentelemetry/api";
import { getTracer } from "../src/tracerProxy";
import { OperationTracingOptions } from "./interfaces";

/**
 * Arguments for `createSpanFunction` that allow you to specify the
 * prefix for each created span as well as the `az.namespace` attribute.
 *
 * @hidden
 */
export interface CreateSpanFunctionArgs {
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
  return function<T extends { tracingOptions?: OperationTracingOptions } | undefined>(
    operationName: string,
    operationOptions: T
  ): { span: Span; updatedOptions: NonNullable<T> } {
    const tracer = getTracer();
    const tracingOptions = operationOptions?.tracingOptions || {};
    const spanOptions: SpanOptions = {
      ...tracingOptions.spanOptions,
      kind: SpanKind.INTERNAL
    };

    const span = tracer.startSpan(`${args.packagePrefix}.${operationName}`, spanOptions);

    span.setAttribute("az.namespace", args.namespace);

    let newSpanOptions = tracingOptions.spanOptions || {};
    if (span.isRecording()) {
      newSpanOptions = {
        ...tracingOptions.spanOptions,
        parent: span.context(),
        attributes: {
          ...spanOptions.attributes,
          "az.namespace": args.namespace
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
