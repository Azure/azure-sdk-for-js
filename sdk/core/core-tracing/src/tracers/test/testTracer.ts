// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { NoOpTracer } from "../noop/noOpTracer";
import { TestSpan } from "./testSpan";
import { SpanContext, SpanKind, SpanOptions } from "@opentelemetry/types";

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
    return this.knownSpans.filter((span) => {
      return !span.endCalled;
    });
  }

  /**
   * Return all Spans for a particular trace, grouped by their
   * parent Span in a tree-like structure
   * @param traceId The traceId to return the graph for
   */
  getSpanGraph(traceId: string): SpanGraph {
    const traceSpans = this.knownSpans.filter((span) => {
      return span.context().traceId === traceId;
    });

    const roots: SpanGraphNode[] = [];
    const nodeMap: Map<string, SpanGraphNode> = new Map<string, SpanGraphNode>();

    for (const span of traceSpans) {
      const spanId = span.context().spanId;
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
    };
    const span = new TestSpan(
      this,
      name,
      context,
      options.kind || SpanKind.INTERNAL,
      parentContext ? parentContext.spanId : undefined,
      options.startTime
    );
    this.knownSpans.push(span);
    if (isRootSpan) {
      this.rootSpans.push(span);
    }
    return span;
  }

  private _getParentContext(options: SpanOptions): SpanContext | undefined {
    const parent = options.parent;
    let result: SpanContext | undefined;
    if (parent) {
      if ("traceId" in parent) {
        result = parent;
      } else {
        result = parent.context();
      }
    }
    return result;
  }
}
