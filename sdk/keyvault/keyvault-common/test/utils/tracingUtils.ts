// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TimeInput,
  SpanStatus,
  SpanAttributes,
  SpanStatusCode,
  SpanAttributeValue,
  Span,
  SpanContext,
  SpanKind,
  SpanOptions,
  TraceFlags,
  Context as OTContext,
  context as otContext,
  Tracer,
  trace,
  TracerProvider
} from "@opentelemetry/api";

// This must be the same as the default tracer name supplied from @azure/core-tracing.
const TRACER_NAME = "azure/core-tracing";

export class TestTracerProvider implements TracerProvider {
  private tracerCache: Map<string, TestTracer> = new Map();

  getTracer(name: string, _version?: string): TestTracer {
    if (!this.tracerCache.has(name)) {
      this.tracerCache.set(name, new TestTracer(name, name));
    }
    return this.tracerCache.get(name)!;
  }

  register() {
    trace.setGlobalTracerProvider(this);
  }

  disable() {
    trace.disable();
  }

  setTracer(tracer: TestTracer) {
    this.tracerCache.set(TRACER_NAME, tracer);
  }
}

let tracerProvider: TestTracerProvider;

export function setTracer(tracer?: TestTracer): TestTracer {
  resetTracer();
  tracerProvider = new TestTracerProvider();
  tracerProvider.register();
  if (tracer) {
    tracerProvider.setTracer(tracer);
  }
  return tracerProvider.getTracer(TRACER_NAME);
}

export function resetTracer(): void {
  tracerProvider?.disable();
}

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
    const parentContext = trace.getSpanContext(context || otContext.active());

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
    const span = new TestSpan(
      this,
      name,
      spanContext,
      options?.kind || SpanKind.INTERNAL,
      parentContext ? parentContext.spanId : undefined,
      options?.startTime
    );
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

/**
 * A mock span useful for testing.
 */
export class TestSpan implements Span {
  /**
   * The Span's current name
   */
  name: string;

  /**
   * The Span's current status
   */
  status: SpanStatus;

  /**
   * The Span's kind
   */
  kind: SpanKind;

  /**
   * True if end() has been called on the Span
   */
  endCalled: boolean;

  /**
   * The start time of the Span
   */
  readonly startTime: TimeInput;

  /**
   * The id of the parent Span, if any.
   */
  readonly parentSpanId?: string;

  /**
   * Known attributes, if any.
   */
  readonly attributes: SpanAttributes;

  private _context: SpanContext;
  private readonly _tracer: Tracer;

  /**
   * Starts a new Span.
   * @param parentTracer-  The tracer that created this Span
   * @param name - The name of the span.
   * @param context - The SpanContext this span belongs to
   * @param kind - The SpanKind of this Span
   * @param parentSpanId - The identifier of the parent Span
   * @param startTime - The startTime of the event (defaults to now)
   */
  constructor(
    parentTracer: Tracer,
    name: string,
    context: SpanContext,
    kind: SpanKind,
    parentSpanId?: string,
    startTime: TimeInput = Date.now()
  ) {
    this._tracer = parentTracer;
    this.name = name;
    this.kind = kind;
    this.startTime = startTime;
    this.parentSpanId = parentSpanId;
    this.status = {
      code: SpanStatusCode.OK
    };
    this.endCalled = false;
    this._context = context;
    this.attributes = {};
  }

  /**
   * Returns the Tracer that created this Span
   */
  tracer(): Tracer {
    return this._tracer;
  }

  /**
   * Returns the SpanContext associated with this Span.
   */
  spanContext(): SpanContext {
    return this._context;
  }

  /**
   * Marks the end of Span execution.
   * @param _endTime - The time to use as the Span's end time. Defaults to
   * the current time.
   */
  end(_endTime?: number): void {
    this.endCalled = true;
  }

  /**
   * Sets a status on the span. Overrides the default of SpanStatusCode.OK.
   * @param status - The status to set.
   */
  setStatus(status: SpanStatus): this {
    this.status = status;
    return this;
  }

  /**
   * Returns whether this span will be recorded
   */
  isRecording(): boolean {
    return true;
  }

  /**
   * Sets an attribute on the Span
   * @param key - The attribute key
   * @param value - The attribute value
   */
  setAttribute(key: string, value: SpanAttributeValue): this {
    this.attributes[key] = value;
    return this;
  }

  /**
   * Sets attributes on the Span
   * @param attributes - The attributes to add
   */
  setAttributes(attributes: SpanAttributes): this {
    for (const key of Object.keys(attributes)) {
      this.attributes[key] = attributes[key];
    }
    return this;
  }

  addEvent(): this {
    throw new Error("Method not implemented.");
  }
  recordException(): void {
    throw new Error("Method not implemented.");
  }
  updateName(): this {
    throw new Error("Method not implemented.");
  }
}
