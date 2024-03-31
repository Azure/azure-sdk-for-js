// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "vitest";

export async function assertAsyncIterable<T>(
  iter: AsyncIterable<T>,
  count: number,
  validate: (x: T, idx: number) => void,
): Promise<void> {
  let i = 0;
  for await (const item of iter) {
    validate(item, i);
    i++;
  }
  assert.equal(i, count);
}

function concatBuffer(a: Uint8Array, b: Uint8Array): Uint8Array {
  const res = new Uint8Array(a.length + b.length);
  res.set(a);
  res.set(b, a.length);
  return res;
}

export const encoder = new TextEncoder();
export const decoder = new TextDecoder();

const dataPrefix = encoder.encode("data: ");
const idPrefix = encoder.encode("id: ");
const commentPrefix = encoder.encode(":");
const eventPrefix = encoder.encode("event: ");
const retryPrefix = encoder.encode("retry: ");
const eventEnd = encoder.encode("\n\n");
const lineEnd = encoder.encode("\n");

export function createDataEvent(data: Uint8Array): Uint8Array {
  return concatBuffer(dataPrefix, concatBuffer(data, eventEnd));
}

export function createDataLine(data: Uint8Array): Uint8Array {
  return concatBuffer(dataPrefix, concatBuffer(data, lineEnd));
}

export function createComment(data: Uint8Array): Uint8Array {
  return concatBuffer(commentPrefix, concatBuffer(data, lineEnd));
}

export function createId(data: Uint8Array): Uint8Array {
  return concatBuffer(idPrefix, concatBuffer(data, lineEnd));
}

export function createType(data: Uint8Array): Uint8Array {
  return concatBuffer(eventPrefix, concatBuffer(data, lineEnd));
}

export function createRetry(data: Uint8Array): Uint8Array {
  return concatBuffer(retryPrefix, concatBuffer(data, lineEnd));
}

export function* createChunkedEvent(str: string, chunkLen: number): Iterable<Uint8Array> {
  const bytes = encoder.encode(str);
  yield dataPrefix;
  for (let i = 0; i < bytes.length; i += chunkLen) {
    const chunk = bytes.slice(i, i + chunkLen);
    yield chunk;
  }
  yield eventEnd;
}

export function* genEvents(iter: Iterable<Uint8Array>): Iterable<Uint8Array> {
  for (const value of iter) {
    yield createDataEvent(value);
  }
}

function* take<T>(iter: Iterable<T>, count: number): Iterable<T[]> {
  let res: T[] = [];
  for (const item of iter) {
    if (res.length === count) {
      yield res;
      res = [];
    }
    res.push(item);
  }
  if (res.length > 0) {
    yield res;
  }
}

function* stream(iter: Iterable<Uint8Array>): Iterable<number> {
  for (const value of iter) {
    yield* value;
  }
}

export function* genChunks(iter: Iterable<Uint8Array>, chunkLen: number): Iterable<Uint8Array> {
  for (const value of take(stream(iter), chunkLen)) {
    yield Uint8Array.from(value);
  }
}

export function* genLines(iter: Iterable<Uint8Array>): Iterable<Uint8Array> {
  for (const value of iter) {
    yield createDataLine(value);
  }
  yield lineEnd;
}

export function* genStrs(count: number): Generator<Uint8Array> {
  for (let i = 0; i < count; i++) {
    yield encoder.encode(`foo${i}`);
  }
}

export function* genComments(iter: Iterable<Uint8Array>): Iterable<Uint8Array> {
  for (const value of iter) {
    yield createComment(value);
  }
  yield lineEnd;
}
