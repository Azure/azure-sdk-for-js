// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { NoOpTracer } from "../noop/noOpTracer";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { TestSpan } from "./testSpan";
import { SpanContext } from "../../interfaces/span_context";

/**
 * A mock tracer useful for testing
 */
export class TestTracer extends NoOpTracer {

  private traceIdCounter = 0;
  private getNextTraceId(): string {
    this.traceIdCounter++;
    return String(this.traceIdCounter);
  }

  private spanIdCounter = 0;
  private getNextSpanId(): string {
    this.spanIdCounter++;
    return String(this.spanIdCounter);
  }

  private rootSpans: TestSpan[] = [];
  private knownSpans: TestSpan[] = [];

  /**
   * Returns all Spans that were created without a parent
   */
  getRootSpans(): TestSpan[] {
    return this.rootSpans;
  }

  /**
   * Returns all Spans this Tracer knows about
   */
  getKnownSpans(): TestSpan[] {
    return this.knownSpans;
  }

  /**
   * Returns all Spans where end() has not been called
   */
  getActiveSpans(): TestSpan[] {
    return this.knownSpans.filter(span => {
      return !span.endCalled;
    });
  }

  /**
   * Starts a new Span.
   * @param name The name of the span.
   * @param options The SpanOptions used during Span creation.
   */
  startSpan(name: string, options: SpanOptions = {}): TestSpan {

    const parentContext = this._getParentContext(options);

    let traceId: string;
    let isRootSpan = false;

    if (parentContext && parentContext.traceId) {
      traceId = parentContext.traceId;
    } else {
      traceId = this.getNextTraceId();
      isRootSpan = true;
    }

    const context: SpanContext = {
      traceId,
      spanId: this.getNextSpanId()
    }
    const span = new TestSpan(name, context, options);
    this.knownSpans.push(span);
    if (isRootSpan) {
      this.rootSpans.push(span);
    }
    return span;
  }

  private _getParentContext(options: SpanOptions): SpanContext | undefined {
    const parent = options.parent;
    if (parent) {
      if ('traceId' in parent) {
        return parent;
      } else {
        return parent.context();
      }
    }

  }
}
