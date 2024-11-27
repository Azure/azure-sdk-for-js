// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Represents a message sent in an event stream
 * https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format
 */
export interface EventMessage {
  /** The event ID to set the EventSource object's last event ID value. */
  id: string;
  /** A string identifying the type of event described. */
  event: string;
  /** The event data */
  data: string;
  /** The reconnection interval (in milliseconds) to wait before retrying the connection */
  retry?: number;
}

/**
 * A stream of event messages
 */
export interface EventMessageStream
  extends ReadableStream<EventMessage>,
    AsyncDisposable,
    AsyncIterable<EventMessage> {}

export type PartialSome<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
