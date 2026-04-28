// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeBuffer } from "@azure/core-rest-pipeline";

/**
 * Checks whether a value is a Node.js Buffer.
 */
export function isBuffer(value: unknown): value is NodeBuffer {
  return Buffer.isBuffer(value);
}

/**
 * Allocates a new zero-filled Buffer of the given size.
 */
export function allocBuffer(size: number): NodeBuffer {
  return Buffer.alloc(size);
}

/**
 * Creates a Buffer from an ArrayBuffer, with optional offset and length.
 */
export function bufferFromArrayBuffer(
  ab: ArrayBuffer,
  byteOffset?: number,
  length?: number,
): NodeBuffer {
  return Buffer.from(ab, byteOffset, length);
}

/**
 * Returns the byte length of a buffer.
 */
export function getBufferLength(buffer: NodeBuffer): number {
  return buffer.length;
}

/**
 * Creates a Blob from the given data.
 */
export function createBlobFromData(data: Blob | ArrayBuffer | ArrayBufferView): Blob {
  if (data instanceof Blob) {
    return data;
  } else if (data instanceof ArrayBuffer) {
    return new Blob([data]);
  } else {
    const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    return new Blob([ab as ArrayBuffer]);
  }
}
