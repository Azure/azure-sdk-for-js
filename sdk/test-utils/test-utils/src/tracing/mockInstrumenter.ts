// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
  InstrumenterSpanOptions,
  TracingContext,
  TracingSpan,
} from "@azure/core-tracing";
import { MockContext, spanKey } from "./mockContext";

import { MockTracingSpan } from "./mockTracingSpan";

/**
 * Represents an implementation of {@link Instrumenter} interface that keeps track of the tracing contexts and spans
 */
export class MockInstrumenter implements Instrumenter {
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = true;
  }

  /**
   * Stack of immutable contexts, each of which is a bag of tracing values for the current operation
   */
  public contextStack: TracingContext[] = [new MockContext()];
  /**
   * List of started spans
   */
  public startedSpans: MockTracingSpan[] = [];

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
    const parentSpan = tracingContext.getValue(spanKey) as MockTracingSpan | undefined;
    let traceId;
    if (parentSpan) {
      traceId = parentSpan.traceId;
    } else {
      traceId = this.getNextTraceId();
    }

    const spanContext = {
      spanId: this.getNextSpanId(),
      traceId: traceId,
      traceFlags: 0,
    };
    const span = new MockTracingSpan(
      name,
      spanContext.traceId,
      spanContext.spanId,
      tracingContext,
      spanOptions,
      this.isEnabled
    );
    let context: TracingContext = new MockContext(tracingContext);
    context = context.setValue(spanKey, span);

    this.startedSpans.push(span);
    return { span, tracingContext: context };
  }

  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    context: TracingContext,
    callback: Callback,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    this.contextStack.push(context);
    return Promise.resolve(callback(...callbackArgs)).finally(() => {
      this.contextStack.pop();
    }) as ReturnType<Callback>;
  }

  parseTraceparentHeader(_traceparentHeader: string): TracingContext | undefined {
    return;
  }

  createRequestHeaders(_tracingContext: TracingContext): Record<string, string> {
    return {};
  }

  /**
   * Gets the currently active context.
   *
   * @returns The current context.
   */
  currentContext() {
    return this.contextStack[this.contextStack.length - 1];
  }

  /**
   * Resets the state of the instrumenter to a clean slate.
   */
  reset() {
    this.contextStack = [new MockContext()];
    this.startedSpans = [];
    this.traceIdCounter = 0;
    this.spanIdCounter = 0;
  }

  disable() {
    this.isEnabled = false;
  }

  enable() {
    this.isEnabled = true;
  }
}
