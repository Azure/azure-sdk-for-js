// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { errorWithCause, onStream } from "./util.js";

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

function getLines(
  onLine: (line: Uint8Array, fieldLen: number) => void
): (chunk: Uint8Array) => void {
  let buf: Uint8Array | undefined;
  let bufIdx: number;
  let fieldLen: number;
  let discardTrailingNewline = false;
  return function onChunk(chunk: Uint8Array) {
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
      onLine(buf.subarray(start, end), fieldLen);
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
  };
}

function concatBuffer(a: Uint8Array, b: Uint8Array): Uint8Array {
  const res = new Uint8Array(a.length + b.length);
  res.set(a);
  res.set(b, a.length);
  return res;
}

function getMessages(
  onId: (id: string) => void,
  onRetry: (intervalInMs: number) => void,
  onMessage: (msg: EventMessage) => void
): (line: Uint8Array, fieldLen: number) => void {
  let message = createMessage();
  const decoder = new TextDecoder();
  return function onLine(line: Uint8Array, fieldLen: number) {
    if (line.length === 0 && message.data !== undefined) {
      // empty line denotes end of message. Trigger the callback and start a new message:
      onMessage(message as EventMessage);
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
          onId((message.id = value));
          break;
        case "retry": {
          const retry = parseInt(value, 10);
          if (!isNaN(retry)) {
            onRetry((message.retry = retry));
          }
          break;
        }
      }
    }
  };
}

type PartialSome<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

function createMessage(): PartialSome<EventMessage, "data"> {
  return {
    data: undefined,
    event: "",
    id: "",
    retry: undefined,
  };
}

export function onSSE(
  iter: AsyncIterable<Uint8Array>,
  onMessage: (msg: EventMessage) => void
): Promise<void> {
  function onId(): void {
    /** empty body */
  }
  function onRetry(): void {
    /** empty body */
  }
  return onStream(iter, getLines(getMessages(onId, onRetry, onMessage))).catch((reason) => {
    throw errorWithCause(
      "Error reading the server-sent events stream. See 'cause' for more details",
      reason
    );
  });
}
