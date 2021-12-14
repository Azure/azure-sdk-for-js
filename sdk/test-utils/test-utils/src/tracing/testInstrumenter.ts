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

  private traceIdCounter = 0;
  private getNextTraceId(): string {
    this.traceIdCounter++;
    return this.traceIdCounter.toString().padStart(32, "0");
  }

  private spanIdCounter = 0;
  private getNextSpanId(): string {
    this.spanIdCounter++;
    return this.spanIdCounter.toString().padStart(16, "0");
  }
  startSpan(
    name: string,
    spanOptions?: InstrumenterSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    const tracingContext = spanOptions?.tracingContext || this.currentContext();
    const parentSpan = tracingContext.getValue(Symbol.for("span")) as TestTracingSpan;
    var traceId;
    if (parentSpan) {
      traceId = parentSpan.spanContext.traceId;
    } else {
      traceId = this.getNextTraceId();
    }
    const span = new TestTracingSpan(name, tracingContext, spanOptions, {
      spanId: this.getNextSpanId(),
      traceId: traceId,
      traceFlags: 0
    });
    let context: TracingContext = new ContextImpl(tracingContext);
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
