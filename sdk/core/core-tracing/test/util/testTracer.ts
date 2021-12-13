// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Context as OTContext,
  SpanContext,
  SpanOptions,
  TraceFlags,
  Tracer,
  getSpanContext,
  context as otContext
} from "../../src/interfaces";
import { TestSpan } from "./testSpan";

/**
 * Simple representation of a Span that only has name and child relationships.
 * Children should be arranged in the order they were created.
 */
export interface SpanGraphNode {
  /**
   * The Span name
   */
  name: string;
  /**
   * All child Spans of this Span
   */
  children: SpanGraphNode[];
}

/**
 * Contains all the spans for a particular TraceID
 * starting at unparented roots
 */
export interface SpanGraph {
  /**
   * All Spans without a parentSpanId
   */
  roots: SpanGraphNode[];
}

/**
 * A mock tracer useful for testing
 */
export class TestTracer implements Tracer {
  constructor(public name?: string, public version?: string) {}
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
    return this.knownSpans.filter((span) => {
      return !span.endCalled;
    });
  }

  /**
   * Return all Spans for a particular trace, grouped by their
   * parent Span in a tree-like structure
   * @param traceId - The traceId to return the graph for
   */
  getSpanGraph(traceId: string): SpanGraph {
    const traceSpans = this.knownSpans.filter((span) => {
      return span.spanContext().traceId === traceId;
    });

    const roots: SpanGraphNode[] = [];
    const nodeMap: Map<string, SpanGraphNode> = new Map<string, SpanGraphNode>();

    for (const span of traceSpans) {
      const spanId = span.spanContext().spanId;
      const node: SpanGraphNode = {
        name: span.name,
        children: []
      };
      nodeMap.set(spanId, node);
      if (span.parentSpanId) {
        const parent = nodeMap.get(span.parentSpanId);
        if (!parent) {
          throw new Error(
            `Span with name ${node.name} has an unknown parentSpan with id ${span.parentSpanId}`
          );
        }
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return {
      roots
    };
  }

  /**
   * Starts a new Span.
   * @param name - The name of the span.
   * @param options - The SpanOptions used during Span creation.
   */
  startSpan(name: string, options?: SpanOptions, context?: OTContext): TestSpan {
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
    this.knownSpans.push(span);
    if (isRootSpan) {
      this.rootSpans.push(span);
    }
    return span;
  }

  /**
   * Added to support testing. We do not support `startActiveSpan` in general because it uses async_hooks
   * which is experimental. Only added to support TestTracerProvider compatibility with OTel Tracers.
   */
  startActiveSpan(): never {
    throw new Error("Method not implemented.");
  }
}
