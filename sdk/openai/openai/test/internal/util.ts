// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";

export async function assertAsyncIterable<T>(
  iter: AsyncIterable<T>,
  count: number,
  validate: (x: T) => void
): Promise<void> {
  let i = 0;
  for await (const item of iter) {
    validate(item);
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

export function* createChunkedEvent(str: string, chunkLen: number): Generator<Uint8Array> {
  const bytes = encoder.encode(str);
  yield dataPrefix;
  for (let i = 0; i < bytes.length; i += chunkLen) {
    const chunk = bytes.slice(i, i + chunkLen);
    yield chunk;
  }
  yield eventEnd;
}

export function* genEvents(iter: Generator<Uint8Array>): Iterable<Uint8Array> {
  for (const value of iter) {
    yield createDataEvent(value);
  }
}

export function* genLines(iter: Generator<Uint8Array>): Iterable<Uint8Array> {
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

export function* genComments(iter: Generator<Uint8Array>): Generator<Uint8Array> {
  for (const value of iter) {
    yield createComment(value);
  }
  yield lineEnd;
}
