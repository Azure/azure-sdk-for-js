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
import { getTracer } from "./tracerProxy";

/**
 * A subset of OperationOptions related to tracing.
 * @hidden
 */
export interface HasTracingOptions {
 tracingOptions?: {
  spanOptions?: SpanOptions;
  context?: Context;
 }
}

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
 /**
  * The type of the Span that will be created.
  * Default: SpanKind.INTERNAL
  */
 spanKind?: SpanKind;
}

/**
* Creates a function called createSpan to create spans using the global tracer.
* @hidden
* @param spanConfig - The name of the operation being performed.
* @param tracingOptions - The options for the underlying http request.
*/
export function createSpanFunction({ packagePrefix, namespace }: SpanConfig) {
 return function <T extends HasTracingOptions>(
  operationName: string,
  operationOptions: T,
  context: Context = otContext.active()
 ): { span: Span; updatedOptions: T } {
  const tracer = getTracer();

  const tracingOptions = operationOptions.tracingOptions || {};

  const spanOptions: SpanOptions = {
   ...tracingOptions.spanOptions,
   kind: tracingOptions?.spanOptions?.kind ?? SpanKind.INTERNAL
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

  const newTracingOptions: HasTracingOptions['tracingOptions'] = {
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
