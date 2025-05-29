import { Span, AttributeValue, Attributes, SpanContext, SpanKind, Tracer, TimeInput, SpanStatus, Link } from "@opentelemetry/api";
/**
 * A mock span useful for testing.
 */
export declare class TestSpan implements Span {
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
     * The Span's links.
     */
    readonly links: Link[];
    /**
     * Known attributes, if any.
     */
    readonly attributes: Attributes;
    private _context;
    private readonly _tracer;
    /**
     * Starts a new Span.
     * @param parentTracer - The tracer that created this Span
     * @param name - The name of the span.
     * @param context - The SpanContext this span belongs to
     * @param kind - The SpanKind of this Span
     * @param parentSpanId - The identifier of the parent Span
     * @param startTime - The startTime of the event (defaults to now)
     */
    constructor(parentTracer: Tracer, name: string, context: SpanContext, kind: SpanKind, parentSpanId?: string, startTime?: TimeInput, attributes?: Attributes, links?: Link[]);
    addLink(link: Link): this;
    addLinks(links: Link[]): this;
    /**
     * Returns the Tracer that created this Span
     */
    tracer(): Tracer;
    /**
     * Returns the SpanContext associated with this Span.
     */
    spanContext(): SpanContext;
    /**
     * Marks the end of Span execution.
     * @param _endTime - The time to use as the Span's end time. Defaults to
     * the current time.
     */
    end(_endTime?: number): void;
    /**
     * Sets a status on the span. Overrides the default of SpanStatusCode.OK.
     * @param status - The status to set.
     */
    setStatus(status: SpanStatus): this;
    /**
     * Returns whether this span will be recorded
     */
    isRecording(): boolean;
    /**
     * Sets an attribute on the Span
     * @param key - The attribute key
     * @param value - The attribute value
     */
    setAttribute(key: string, value: AttributeValue): this;
    /**
     * Sets attributes on the Span
     * @param attributes - The attributes to add
     */
    setAttributes(attributes: Attributes): this;
    addEvent(): this;
    recordException(): void;
    updateName(): this;
}
//# sourceMappingURL=testSpan.d.ts.map