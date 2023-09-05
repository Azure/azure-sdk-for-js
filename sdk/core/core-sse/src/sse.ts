// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const enum ControlChars {
  NewLine = 10,
  CarriageReturn = 13,
  Space = 32,
  Colon = 58,
}

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

type PartialSome<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Processes a response stream into a stream of events.
 * @param chunkIter - A stream of Uint8Array chunks
 * @returns An async iterable of EventMessage objects
 */
export function iterateSseStream(
  chunkIter: ReadableStream<Uint8Array>
): AsyncIterable<EventMessage>;
/**
 * Processes a response stream into a stream of events.
 * @param chunkIter - An async iterable of Uint8Array chunks
 * @returns An async iterable of EventMessage objects
 */
export function iterateSseStream(chunkIter: AsyncIterable<Uint8Array>): AsyncIterable<EventMessage>;
export function iterateSseStream(
  chunkIter: AsyncIterable<Uint8Array> | ReadableStream<Uint8Array>
): AsyncIterable<EventMessage> {
  return toMessage(toLine(ensureAsyncIterable(chunkIter)));
}

function ensureAsyncIterable(
  chunkIter: AsyncIterable<Uint8Array> | ReadableStream<Uint8Array>
): AsyncIterable<Uint8Array> {
  return isReadableStream(chunkIter) && (chunkIter as any)[Symbol.asyncIterator] === undefined
    ? toAsyncIterable(chunkIter)
    : (chunkIter as AsyncIterable<Uint8Array>);
}

function isReadableStream(body: unknown): body is ReadableStream {
  return Boolean(
    body &&
      typeof (body as ReadableStream).getReader === "function" &&
      typeof (body as ReadableStream).tee === "function"
  );
}

async function* toAsyncIterable<T>(stream: ReadableStream<T>): AsyncIterable<T> {
  const reader = stream.getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

function concatBuffer(a: Uint8Array, b: Uint8Array): Uint8Array {
  const res = new Uint8Array(a.length + b.length);
  res.set(a);
  res.set(b, a.length);
  return res;
}

function createMessage(): PartialSome<EventMessage, "data"> {
  return {
    data: undefined,
    event: "",
    id: "",
    retry: undefined,
  };
}

async function* toLine(
  chunkIter: AsyncIterable<Uint8Array>
): AsyncIterable<{ line: Uint8Array; fieldLen: number }> {
  let buf: Uint8Array | undefined;
  let bufIdx = 0;
  let fieldLen = -1;
  let discardTrailingNewline = false;
  for await (const chunk of chunkIter) {
    if (buf === undefined) {
      buf = chunk;
      bufIdx = 0;
      fieldLen = -1;
    } else {
      buf = concatBuffer(buf, chunk);
    }
    const bufLen = buf.length;
    let start = 0;
    while (bufIdx < bufLen) {
      if (discardTrailingNewline) {
        if (buf[bufIdx] === ControlChars.NewLine) {
          start = ++bufIdx;
        }
        discardTrailingNewline = false;
      }
      let end = -1;
      for (; bufIdx < bufLen && end === -1; ++bufIdx) {
        switch (buf[bufIdx]) {
          case ControlChars.Colon:
            if (fieldLen === -1) {
              fieldLen = bufIdx - start;
            }
            break;
          case ControlChars.CarriageReturn:
            // We need to discard the trailing newline if any but can't do
            // that now because we need to dispatch the current line first.
            discardTrailingNewline = true;
            end = bufIdx;
            break;
          case ControlChars.NewLine:
            end = bufIdx;
            break;
        }
      }
      if (end === -1) {
        // We reached the end of the buffer but the line hasn't ended.
        // Wait for the next chunk and then continue parsing:
        break;
      }
      yield { line: buf.subarray(start, end), fieldLen };
      start = bufIdx; // we're now on the next line
      fieldLen = -1;
    }
    if (start === bufLen) {
      buf = undefined;
    } else if (start !== 0) {
      // discard already processed lines
      buf = buf.subarray(start);
      bufIdx -= start;
    }
  }
}

async function* toMessage(
  lineIter: AsyncIterable<{ line: Uint8Array; fieldLen: number }>
): AsyncIterable<EventMessage> {
  let message = createMessage();
  const decoder = new TextDecoder();
  for await (const { line, fieldLen } of lineIter) {
    if (line.length === 0 && message.data !== undefined) {
      // empty line denotes end of message. Yield and start a new message:
      yield message as EventMessage;
      message = createMessage();
    } else if (fieldLen > 0) {
      // exclude comments and lines with no values
      // line is of format "<field>:<value>" or "<field>: <value>"
      // https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
      const field = decoder.decode(line.subarray(0, fieldLen));
      const valueOffset = fieldLen + (line[fieldLen + 1] === ControlChars.Space ? 2 : 1);
      const value = decoder.decode(line.subarray(valueOffset));

      switch (field) {
        case "data":
          message.data = message.data ? message.data + "\n" + value : value;
          break;
        case "event":
          message.event = value;
          break;
        case "id":
          message.id = value;
          break;
        case "retry": {
          const retry = parseInt(value, 10);
          if (!isNaN(retry)) {
            message.retry = retry;
          }
          break;
        }
      }
    }
  }
}
