// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
  InstrumenterSpanOptions,
  TracingContext,
  TracingSpan,
  TracingSpanContext
} from "@azure/core-tracing";
import { ContextImpl } from "./contextImpl";
import { TestTracingSpan } from "./testTracingSpan";

export class TestInstrumenter implements Instrumenter {
  public contexts: TracingContext[] = [new ContextImpl()];
  public startedSpans: TestTracingSpan[] = [];

  // TODO: spanOptions.tracingContext should be renamed to existingContext?
  startSpan(
    name: string,
    spanOptions?: InstrumenterSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    /**
     *     
     * 
    const parentContext = getSpanContext(context || otContext.active());

    let traceId: string;
    let isRootSpan = false;

    if (parentContext && parentContext.traceId) {
      traceId = parentContext.traceId;
    } else {
      traceId = this.getNextTraceId();
      isRootSpan = true;
    }

    const spanContext: SpanContext = {
      traceId,
      spanId: this.getNextSpanId(),
      traceFlags: TraceFlags.NONE
    };
    const span = new TestSpan(this, name, spanContext, parentContext?.spanId, options);
     * 
     */
    const span = new TestTracingSpan(
      name,
      spanOptions,
      spanOptions?.tracingContext || new ContextImpl()
    );
    let context: TracingContext = new ContextImpl(spanOptions?.tracingContext);
    context = context.setValue(Symbol.for("span"), span);

    this.startedSpans.push(span);
    return { span, tracingContext: context };
  }
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    context: TracingContext,
    callback: Callback,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    this.contexts.push(context);
    return Promise.resolve(callback.call(callbackThis, ...callbackArgs)).finally(() => {
      this.contexts.pop();
    }) as ReturnType<Callback>;
  }
  parseTraceparentHeader(_traceparentHeader: string): TracingSpanContext | undefined {
    return;
  }
  createRequestHeaders(_spanContext: TracingSpanContext): Record<string, string> {
    return {};
  }
  currentContext() {
    return this.contexts[this.contexts.length - 1];
  }
}
