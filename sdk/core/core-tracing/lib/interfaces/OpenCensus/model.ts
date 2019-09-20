/**
 * Copyright 2018, OpenCensus Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Logger } from './common';
import { TraceParams, TracerConfig } from './config';
import { Propagation } from './propagation';
import { Sampler } from './sampler';

/** Default type for functions */
// tslint:disable:no-any
export type Func<T> = (...args: any[]) => T;

/** Maps a label to a string, number or boolean. */
export interface Attributes {
  [attributeKey: string]: string | number | boolean;
}

/**
 * The status of a Span by providing a standard CanonicalCode in conjunction
 * with an optional descriptive message.
 */
export interface Status {
  /** The canonical code of this message. */
  code: CanonicalCode;
  /** A developer-facing error message. */
  message?: string;
}

/** An enumeration of canonical status codes. */
export enum CanonicalCode {
  /**
   * Not an error; returned on success
   */
  OK = 0,
  /**
   * The operation was cancelled (typically by the caller).
   */
  CANCELLED = 1,
  /**
   * Unknown error.  An example of where this error may be returned is
   * if a status value received from another address space belongs to
   * an error-space that is not known in this address space.  Also
   * errors raised by APIs that do not return enough error information
   * may be converted to this error.
   */
  UNKNOWN = 2,
  /**
   * Client specified an invalid argument.  Note that this differs
   * from FAILED_PRECONDITION.  INVALID_ARGUMENT indicates arguments
   * that are problematic regardless of the state of the system
   * (e.g., a malformed file name).
   */
  INVALID_ARGUMENT = 3,
  /**
   * Deadline expired before operation could complete.  For operations
   * that change the state of the system, this error may be returned
   * even if the operation has completed successfully.  For example, a
   * successful response from a server could have been delayed long
   * enough for the deadline to expire.
   */
  DEADLINE_EXCEEDED = 4,
  /**
   * Some requested entity (e.g., file or directory) was not found.
   */
  NOT_FOUND = 5,
  /**
   * Some entity that we attempted to create (e.g., file or directory)
   * already exists.
   */
  ALREADY_EXISTS = 6,
  /**
   * The caller does not have permission to execute the specified
   * operation.  PERMISSION_DENIED must not be used for rejections
   * caused by exhausting some resource (use RESOURCE_EXHAUSTED
   * instead for those errors).  PERMISSION_DENIED must not be
   * used if the caller can not be identified (use UNAUTHENTICATED
   * instead for those errors).
   */
  PERMISSION_DENIED = 7,
  /**
   * Some resource has been exhausted, perhaps a per-user quota, or
   * perhaps the entire file system is out of space.
   */
  RESOURCE_EXHAUSTED = 8,
  /**
   * Operation was rejected because the system is not in a state
   * required for the operation's execution.  For example, directory
   * to be deleted may be non-empty, an rmdir operation is applied to
   * a non-directory, etc.
   *
   * A litmus test that may help a service implementor in deciding
   * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
   *
   *  - Use UNAVAILABLE if the client can retry just the failing call.
   *  - Use ABORTED if the client should retry at a higher-level
   *    (e.g., restarting a read-modify-write sequence).
   *  - Use FAILED_PRECONDITION if the client should not retry until
   *    the system state has been explicitly fixed.  E.g., if an "rmdir"
   *    fails because the directory is non-empty, FAILED_PRECONDITION
   *    should be returned since the client should not retry unless
   *    they have first fixed up the directory by deleting files from it.
   *  - Use FAILED_PRECONDITION if the client performs conditional
   *    REST Get/Update/Delete on a resource and the resource on the
   *    server does not match the condition. E.g., conflicting
   *    read-modify-write on the same resource.
   */
  FAILED_PRECONDITION = 9,
  /**
   * The operation was aborted, typically due to a concurrency issue
   * like sequencer check failures, transaction aborts, etc.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION,
   * ABORTED, and UNAVAILABLE.
   */
  ABORTED = 10,
  /**
   * Operation was attempted past the valid range.  E.g., seeking or
   * reading past end of file.
   *
   * Unlike INVALID_ARGUMENT, this error indicates a problem that may
   * be fixed if the system state changes. For example, a 32-bit file
   * system will generate INVALID_ARGUMENT if asked to read at an
   * offset that is not in the range [0,2^32-1], but it will generate
   * OUT_OF_RANGE if asked to read from an offset past the current
   * file size.
   *
   * There is a fair bit of overlap between FAILED_PRECONDITION and
   * OUT_OF_RANGE.  We recommend using OUT_OF_RANGE (the more specific
   * error) when it applies so that callers who are iterating through
   * a space can easily look for an OUT_OF_RANGE error to detect when
   * they are done.
   */
  OUT_OF_RANGE = 11,
  /**
   * Operation is not implemented or not supported/enabled in this service.
   */
  UNIMPLEMENTED = 12,
  /**
   * Internal errors.  Means some invariants expected by underlying
   * system has been broken.  If you see one of these errors,
   * something is very broken.
   */
  INTERNAL = 13,
  /**
   * The service is currently unavailable.  This is a most likely a
   * transient condition and may be corrected by retrying with
   * a backoff.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION,
   * ABORTED, and UNAVAILABLE.
   */
  UNAVAILABLE = 14,
  /**
   * Unrecoverable data loss or corruption.
   */
  DATA_LOSS = 15,
  /**
   * The request does not have valid authentication credentials for the
   * operation.
   */
  UNAUTHENTICATED = 16,
}

/** A text annotation with a set of attributes. */
export interface Annotation {
  /** A user-supplied message describing the event. */
  description: string;
  /** A timestamp for the event event. */
  timestamp: number;
  /** A set of attributes on the annotation. */
  attributes: Attributes;
}

/** An event describing a message sent/received between Spans. */
export interface MessageEvent {
  /** A timestamp for the event. */
  timestamp: number;
  /** Indicates whether the message was sent or received. */
  type: MessageEventType;
  /**
   * An identifier for the MessageEvent's message that can be used to match
   * SENT and RECEIVED MessageEvents. Message event ids should start with 1 for
   * both sent and received messages and increment by 1 for each message
   * sent/received.
   */
  id: number;
  /** The number of uncompressed bytes sent or received. */
  uncompressedSize?: number;
  /**
   * The number of compressed bytes sent or received. If zero or
   * undefined, assumed to be the same size as uncompressed.
   */
  compressedSize?: number;
}

/**
 * A pointer from the current span to another span in the same trace or in a
 * different trace.
 */
export interface Link {
  /** The trace ID for a trace within a project. */
  traceId: string;
  /** The span ID for a span within a trace. */
  spanId: string;
  /** The relationship of the current span relative to the linked. */
  type: LinkType;
  /** A set of attributes on the link. */
  attributes: Attributes;
}

/** Defines the trace options */
export interface TraceOptions {
  /** Root span name */
  name: string;
  /** Trace context */
  spanContext?: SpanContext;
  /** Span kind */
  kind?: SpanKind;
  /** Determines the sampling rate. Ranges from 0.0 to 1.0 */
  samplingRate?: number;
}

/** Defines the span options */
export interface SpanOptions {
  /** Span name */
  name: string;
  /** Span kind */
  kind?: SpanKind;
  /** The new span's parent */
  childOf?: Span;
}

export type TraceState = string;

/** Defines the span context */
export interface SpanContext {
  /** Trace ID */
  traceId: string;
  /** Span ID */
  spanId: string;
  /** Options */
  options?: number;
  /** TraceState */
  traceState?: TraceState;
}

/** Defines an end span event listener */
export interface SpanEventListener {
  /** Happens when a span is started */
  onStartSpan(span: Span): void;
  /** Happens when a span is ended */
  onEndSpan(span: Span): void;
}

/** An event describing a message sent/received between Spans. */
export enum MessageEventType {
  /** Unknown event type. */
  UNSPECIFIED = 0,
  /** Indicates a sent message. */
  SENT = 1,
  /** Indicates a received message. */
  RECEIVED = 2,
}

/**
 * Type of span. Can be used to specify additional relationships between spans
 * in addition to a parent/child relationship.
 */
export enum SpanKind {
  /** Unspecified */
  UNSPECIFIED = 0,
  /**
   * Indicates that the span covers server-side handling of an RPC or other
   * remote network request.
   */
  SERVER = 1,
  /**
   * Indicates that the span covers the client-side wrapper around an RPC or
   * other remote request.
   */
  CLIENT = 2,
}

/**
 * Type of link. The relationship of the current span relative to the linked
 * span.
 */
export enum LinkType {
  /**
   * The relationship of the two spans is unknown, or known but other
   * than parent-child.
   */
  UNSPECIFIED = 0,
  /** The linked span is a child of the current span. */
  CHILD_LINKED_SPAN = 1,
  /** The linked span is a parent of the current span. */
  PARENT_LINKED_SPAN = 2,
}

/** Interface for Span */
export interface Span {
  /** The Span ID of this span */
  readonly id: string;

  /** If the parent span is in another process. */
  remoteParent: boolean;

  /** The span ID of this span's parent. If it's a root span, must be empty */
  parentSpanId: string;

  /** The resource name of the span */
  name: string;

  /** Kind of span. */
  kind: SpanKind;

  /** An object to log information to */
  logger: Logger;

  /** A final status for this span */
  status: Status;

  /** A set of attributes, each in the format [KEY]:[VALUE] */
  attributes: Attributes;

  /** A text annotation with a set of attributes. */
  annotations: Annotation[];

  /** An event describing a message sent/received between Spans. */
  messageEvents: MessageEvent[];

  /** Pointers from the current span to another span */
  links: Link[];

  /** Recursively gets the descendant spans. */
  allDescendants(): Span[];

  /** The list of immediate child spans. */
  spans: Span[];

  /** The number of direct children */
  numberOfChildren: number;

  /** Trace id asscoiated with span. */
  readonly traceId: string;

  /** Trace state associated with span */
  readonly traceState?: TraceState;

  /** Indicates if span was started. */
  readonly started: boolean;

  /** Indicates if span was ended. */
  readonly ended: boolean;

  /**
   * Gives a timestap that indicates the span's start time in RFC3339 UTC
   * "Zulu" format.
   */
  readonly startTime: Date;

  /**
   * Gives a timestap that indicates the span's end time in RFC3339 UTC
   * "Zulu" format.
   */
  readonly endTime: Date;

  /**
   * Gives a timestap that indicates the span's duration in RFC3339 UTC
   * "Zulu" format.
   */
  readonly duration: number;

  /** Gives the TraceContext of the span. */
  readonly spanContext: SpanContext;

  /** Trace Parameters */
  activeTraceParams: TraceParams;

  /** The number of dropped attributes. */
  droppedAttributesCount: number;

  /** The number of dropped links. */
  droppedLinksCount: number;

  /** The number of dropped annotations. */
  droppedAnnotationsCount: number;

  /** The number of dropped message events. */
  droppedMessageEventsCount: number;

  /**
   * Adds an atribute to the span.
   * @param key Describes the value added.
   * @param value The result of an operation.
   */
  addAttribute(key: string, value: string | number | boolean | object): void;

  /**
   * Adds an annotation to the span.
   * @param description Describes the event.
   * @param attributes A set of attributes on the annotation.
   * @param timestamp A timestamp for this event.
   */
  addAnnotation(
    description: string,
    attributes?: Attributes,
    timestamp?: number
  ): void;

  /**
   * Adds a link to the span.
   * @param traceId The trace ID for a trace within a project.
   * @param spanId The span ID for a span within a trace.
   * @param type The relationship of the current span relative to the linked.
   * @param attributes A set of attributes on the link.
   */
  addLink(
    traceId: string,
    spanId: string,
    type: LinkType,
    attributes?: Attributes
  ): void;

  /**
   * Adds a message event to the span.
   * @param type The type of message event.
   * @param id An identifier for the message event.
   * @param timestamp A timestamp for this event.
   * @param uncompressedSize The number of uncompressed bytes sent or received.
   * @param compressedSize The number of compressed bytes sent or received. If
   *     zero or undefined, assumed to be the same size as uncompressed.
   */
  addMessageEvent(
    type: MessageEventType,
    id: number,
    timestamp?: number,
    uncompressedSize?: number,
    compressedSize?: number
  ): void;

  /**
   * Sets a status to the span.
   * @param code The canonical status code.
   * @param message optional A developer-facing error message.
   */
  setStatus(code: CanonicalCode, message?: string): void;

  /** Starts a span. */
  start(): void;

  /** Ends a span and all of its children, recursively. */
  end(): void;

  /** Forces to end a span. */
  truncate(): void;

  /** Starts a new Span instance as a child of this instance */
  startChildSpan(options?: SpanOptions): Span;

  /** Returns whether a span is root or not. */
  isRootSpan(): boolean;
}

/** Interface for TracerBase */
export interface TracerBase extends SpanEventListener {
  /** A sampler that will decide if the span will be sampled or not */
  sampler: Sampler;

  /** A configuration for starting the tracer */
  logger: Logger;

  /** A configuration object for trace parameters */
  activeTraceParams: TraceParams;

  /** A propagation instance */
  readonly propagation: Propagation;

  /** Get the eventListeners from tracer instance */
  readonly eventListeners: SpanEventListener[];

  /** Get the active status from tracer instance */
  readonly active: boolean;

  /**
   * Start a tracer instance
   * @param config Configuration for tracer instace
   * @returns A tracer instance started
   */
  start(config: TracerConfig): this;

  /** Stop the tracer instance */
  stop(): this;

  /**
   * Start a new RootSpan to currentRootSpan
   * @param options Options for tracer instance
   * @param fn Callback function
   * @returns The callback return
   */
  startRootSpan<T>(options: TraceOptions, fn: (root: Span) => T): T;

  /**
   * Register a OnEndSpanEventListener on the tracer instance
   * @param listener An OnEndSpanEventListener instance
   */
  registerSpanEventListener(listener: SpanEventListener): void;

  /**
   * Unregisters an end span event listener.
   * @param listener The listener to unregister.
   */
  unregisterSpanEventListener(listener: SpanEventListener): void;

  /**
   * Start a new Span instance to the currentRootSpan
   * @param [options] A TraceOptions object to start a root span.
   * @returns The new Span instance started
   */
  startChildSpan(options?: SpanOptions): Span;

  /** Sets the current root span. */
  setCurrentRootSpan(root: Span): void;
}

/** Interface for Tracer */
export interface Tracer extends TracerBase {
  /** Get and set the currentRootSpan to tracer instance */
  currentRootSpan: Span;

  /** Clear the currentRootSpan from tracer instance */
  clearCurrentTrace(): void;

  /**
   * Binds the trace context to the given function.
   * This is necessary in order to create child spans correctly in functions
   * that are called asynchronously (for example, in a network response
   * handler).
   * @param fn A function to which to bind the trace context.
   */
  wrap<T>(fn: Func<T>): Func<T>;

  /**
   * Binds the trace context to the given event emitter.
   * This is necessary in order to create child spans correctly in event
   * handlers.
   * @param emitter An event emitter whose handlers should have
   *     the trace context binded to them.
   */
  wrapEmitter(emitter: NodeJS.EventEmitter): void;
}
