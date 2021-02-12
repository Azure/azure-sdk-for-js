// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Span,
  SpanOptions,
  SpanKind,
  Context,
  context as otContext,
  setSpan
} from "@opentelemetry/api";
import { OperationTracingOptions } from "./interfaces";
import { getTracer } from "./tracerProxy";

/**
 * Common configuration for each span created from the returned createSpan function.
 *
 * @hidden
 */
export interface CreateSpanFunctionArgs {
  /**
   * Package name prefix.
   *
   * If undefined, no special formatting is done on Span names created using the
   * returned createSpan function.
   * Otherwise, will create spans with a name of the format <prefix>.<operationName>
   */
  packagePrefix: string | undefined;
  /**
   * Service namespace, set to the az.namespace property in created Spans.
   */
  namespace: string;
}

/**
 * A set of options compatible with OperationOptions in libraries like core-http and core-client.
 *
 * @hidden
 */
export interface OperationOptionsLike {
  tracingOptions?: OperationTracingOptions;
}

/**
 * Creates a function to create spans using the global tracer. This createSpan function
 * properly handles options like OperationOptions which has a `tracingOptions` property.
 *
 * @param args Arguments providing a package prefix (used when formatting the span name) and namespace
 * for created Spans
 *
 * @hidden
 *
 */
export function createSpanFunctionForOperationOptions(args: CreateSpanFunctionArgs) {
  return function <OperationOptionsT extends OperationOptionsLike>(
    operationName: string,
    operationOptions: OperationOptionsT,
    context: Context = otContext.active()
  ): { span: Span; updatedOptions: OperationOptionsT & Required<OperationOptionsLike> } {
    const oldTracingOptions = operationOptions.tracingOptions || {};

    var { newSpanOptions, newContext, span } = startSpan(
      operationName,
      context,
      args,
      oldTracingOptions
    );

    const newTracingOptions: OperationTracingOptions = {
      ...oldTracingOptions,
      spanOptions: newSpanOptions,
      context: newContext
    };

    const newOperationOptions: OperationOptionsT & Required<OperationOptionsLike> = {
      ...operationOptions,
      tracingOptions: newTracingOptions
    };

    return {
      span,
      updatedOptions: newOperationOptions
    };
  };
}

/**
 *
 * @param tracer
 * @param operationName
 * @param context
 * @param args
 * @param tracingOptions
 */
function startSpan(
  operationName: string,
  context: Context,
  args: CreateSpanFunctionArgs,
  tracingOptions: OperationTracingOptions
) {
  const tracer = getTracer();

  const spanOptions: SpanOptions = {
    ...tracingOptions.spanOptions,
    kind: SpanKind.INTERNAL
  };

  const span = tracer.startSpan(
    args.packagePrefix == undefined ? operationName : `${args.packagePrefix}.${operationName}`,
    spanOptions,
    context
  );
  const newContext = setSpan(context, span);

  span.setAttribute("az.namespace", args.namespace);

  let newSpanOptions = tracingOptions.spanOptions || {};

  if (span.isRecording()) {
    newSpanOptions = {
      ...tracingOptions.spanOptions,
      attributes: {
        ...spanOptions.attributes,
        "az.namespace": args.namespace
      }
    };
  }
  return { newSpanOptions, newContext, span };
}

/**
 * Creates a function to create spans using the global tracer. This createSpan function
 * properly handles options like `RequestOptionsBase`, where the tracing options (`context` and `spanOptions`) are
 * directly on the options object itself.
 *
 * @param args Arguments providing a package prefix (used when formatting the span name) and namespace
 * for created Spans
 *
 */
export function createSpanFunctionForRequestOptionsBase(args: CreateSpanFunctionArgs) {
  return function <RequestOptionsBaseT extends OperationTracingOptions>(
    operationName: string,
    tracingOptions: RequestOptionsBaseT,
    context: Context = otContext.active()
  ): { span: Span; updatedOptions: RequestOptionsBaseT & Required<OperationTracingOptions> } {
    const oldTracingOptions = tracingOptions || {};

    var { newSpanOptions, newContext, span } = startSpan(
      operationName,
      context,
      args,
      oldTracingOptions
    );

    const newRequestOptions: RequestOptionsBaseT & Required<OperationTracingOptions> = {
      ...oldTracingOptions,
      spanOptions: newSpanOptions,
      context: newContext
    };

    return {
      span,
      updatedOptions: newRequestOptions
    };
  };
}
