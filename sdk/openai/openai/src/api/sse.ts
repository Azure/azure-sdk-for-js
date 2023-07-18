// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { StreamableMethod } from "@azure-rest/core-client";
import { getStream } from "./getStream.js";

export async function getSSEs<TResponse, TEvent>(
  response: StreamableMethod<TResponse>,
  toEvent: (obj: Record<string, any>) => TEvent
): Promise<AsyncIterable<TEvent>> {
  const stream = getStream(response);
  let prevLineIfIncomplete = "";
  let started = false;
  return streamToEvents(stream, (chunk) => {
    if (!chunk.startsWith("data: ") && !started) {
      throw new Error(chunk);
    }
    started = true;
    const events: TEvent[] = [];
    for (let str of chunk.split("\n\n")) {
      if (str.startsWith("data: ")) {
        str = str.slice(6);
      }
      if (["", "[DONE]", "[DONE]\n"].includes(str)) {
        return events;
      }
      try {
        const event = JSON.parse(prevLineIfIncomplete + str);
        prevLineIfIncomplete = "";
        events.push(toEvent(event));
      } catch (e) {
        prevLineIfIncomplete += str;
      }
    }
    return events;
  });
}

async function* streamToEvents<T>(
  stream: AsyncIterable<string>,
  processChunk: (chunk: string) => T[]
): AsyncIterable<T> {
  for await (const chunk of stream) {
    yield* processChunk(chunk);
  }
}
