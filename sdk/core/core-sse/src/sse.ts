// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { IncomingMessage } from "node:http";
import { EventMessage, EventMessageStream, PartialSome } from "./models.js";
import { createStream, ensureAsyncIterable } from "./utils.js";

enum ControlChars {
  NewLine = 10,
  CarriageReturn = 13,
  Space = 32,
  Colon = 58,
}

/**
 * Processes a response stream into a stream of events.
 * @param chunkStream - A stream of Uint8Array chunks
 * @returns An async iterable of EventMessage objects
 */
export function createSseStream(chunkStream: ReadableStream<Uint8Array>): EventMessageStream;
/**
 * Processes a response stream into a stream of events.
 * @param chunkStream - An async iterable of Uint8Array chunks
 * @returns An async iterable of EventMessage objects
 */
export function createSseStream(chunkStream: IncomingMessage): EventMessageStream;
export function createSseStream(
  chunkStream: IncomingMessage | ReadableStream<Uint8Array>,
): EventMessageStream {
  const { cancel, iterable } = ensureAsyncIterable(chunkStream);
  const asyncIter = toMessage(toLine(iterable));
  return createStream(asyncIter, cancel);
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
  chunkIter: AsyncIterable<Uint8Array>,
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
  lineIter: AsyncIterable<{ line: Uint8Array; fieldLen: number }>,
): AsyncIterableIterator<EventMessage> {
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
