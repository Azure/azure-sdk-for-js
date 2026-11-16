// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventMessage } from "@azure/core-sse";

/**
 * Describes how to handle a single Server-Sent Event variant when decoding an
 * SSE (`text/event-stream`) response.
 */
export interface SseEventDescriptor<T> {
  /**
   * The SSE `event:` field name this descriptor handles. `undefined` matches the unnamed
   * `message` event (variants with no event name).
   */
  eventName?: string;
  /**
   * Whether receiving this event closes the source and yields one final payload.
   */
  isTerminal: boolean;
  /**
   * The raw `data` string required to match a constant payload, including nonterminal constants.
   * A match ends the stream only when `isTerminal` is true.
   */
  terminalValue?: string;
  /**
   * Selects an unnamed JSON model variant using its wire discriminator property and values.
   */
  discriminator?: { propertyName: string; values: string[] };
  /**
   * The content type of the event's `data` payload (e.g. `application/json`, `text/plain`).
   * JSON payloads are parsed before deserialization; non-JSON payloads are passed through as
   * the raw `data` string. Defaults to JSON when omitted.
   */
  contentType?: string;
  /**
   * Deserializes the event's `data` payload into the target type. The input is the JSON-parsed
   * value for JSON payloads, or the raw `data` string otherwise. Matched constant values
   * are passed through as raw strings so their generated deserializers can return the typed constant.
   */
  deserialize: (data: any) => T;
}

function isJsonContentType(contentType: string | undefined): boolean {
  return contentType === undefined || /\bjson\b/i.test(contentType);
}

function resolveDescriptor<T>(
  event: EventMessage,
  descriptors: SseEventDescriptor<T>[],
): { descriptor: SseEventDescriptor<T>; payload: unknown } | undefined {
  const discriminated: SseEventDescriptor<T>[] = [];
  let fallback: SseEventDescriptor<T> | undefined;
  for (const descriptor of descriptors) {
    if (event.event ? descriptor.eventName !== event.event : descriptor.eventName !== undefined) {
      continue;
    }
    if (descriptor.terminalValue !== undefined) {
      if (descriptor.terminalValue === event.data) {
        return { descriptor, payload: event.data };
      }
    } else if (descriptor.discriminator) {
      discriminated.push(descriptor);
    } else {
      fallback ??= descriptor;
    }
  }
  let jsonPayload: unknown;
  if (discriminated.length > 0) {
    jsonPayload = parseJsonEvent(event);
    if (typeof jsonPayload === "object" && jsonPayload !== null && !Array.isArray(jsonPayload)) {
      const payload = jsonPayload;
      const descriptor = discriminated.find(({ discriminator }) => {
        if (!discriminator) {
          return false;
        }
        const value = Reflect.get(payload, discriminator.propertyName);
        return typeof value === "string" && discriminator.values.includes(value);
      });
      if (descriptor) {
        return { descriptor, payload };
      }
    }
  }
  if (!fallback) {
    return undefined;
  }
  return {
    descriptor: fallback,
    payload: !isJsonContentType(fallback.contentType)
      ? event.data
      : discriminated.length > 0
        ? jsonPayload
        : parseJsonEvent(event),
  };
}

function parseJsonEvent(event: EventMessage): unknown {
  try {
    return JSON.parse(event.data);
  } catch (error) {
    const eventName = event.event || "message";
    throw new Error(`Unable to deserialize event "${eventName}".`, { cause: error });
  }
}

/**
 * Decodes a Server-Sent Events (SSE, `text/event-stream`) response body, dispatching each
 * event to the matching {@link SseEventDescriptor} by its `event:` name and yielding the
 * deserialized payload.
 *
 * The source is closed before delivering a terminal payload, with cleanup failures reported after
 * yielding it. A constant sentinel is only compared against events with the same `event:` name,
 * so an unrelated event carrying the same `data` cannot end the stream.
 *
 * Events whose name or payload discriminator matches no descriptor are ignored. A generic payload
 * descriptor can handle unknown discriminator values without selecting an unrelated model variant.
 * Payload mapping starts when the returned iterable is consumed. The one-connection source
 * parses raw SSE events but does not reconnect, resume event IDs, or apply retry delays.
 */
export async function* readSseStream<T>(
  events: AsyncIterable<EventMessage>,
  descriptors: SseEventDescriptor<T>[],
): AsyncIterable<T> {
  const iterator = events[Symbol.asyncIterator]();
  let closePromise: Promise<IteratorResult<EventMessage>> | undefined;
  // Explicit terminal cleanup and for-await cleanup share the same iterator return.
  const close = () =>
    (closePromise ??= (async () =>
      iterator.return ? iterator.return() : { done: true, value: undefined })());
  const source: AsyncIterable<EventMessage> = {
    [Symbol.asyncIterator]: () => ({ next: () => iterator.next(), return: close }),
  };
  for await (const event of source) {
    const resolved = resolveDescriptor(event, descriptors);
    if (!resolved) {
      continue;
    }
    const { descriptor, payload } = resolved;
    const item = descriptor.deserialize(payload);
    if (descriptor.isTerminal) {
      try {
        await close();
      } catch (error) {
        yield item;
        throw error;
      }
    }
    yield item;
    if (descriptor.isTerminal) {
      return;
    }
  }
}
