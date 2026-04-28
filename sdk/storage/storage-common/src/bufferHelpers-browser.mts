// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeBuffer } from "@azure/core-rest-pipeline";

/**
 * In the browser, Buffer is not available. This always returns false.
 */
export function isBuffer(_value: unknown): _value is NodeBuffer {
  return false;
}

/**
 * In the browser, Buffer is not available. This always throws.
 */
export function allocBuffer(_size: number): NodeBuffer {
  throw new Error("Buffer is not available in this environment.");
}

/**
 * In the browser, Buffer is not available. This always throws.
 */
export function bufferFromString(_str: string, _encoding?: string): NodeBuffer {
  throw new Error("Buffer is not available in this environment.");
}

/**
 * In the browser, Buffer is not available. This always throws.
 */
export function bufferFromArrayBuffer(
  _ab: ArrayBuffer,
  _byteOffset?: number,
  _length?: number,
): NodeBuffer {
  throw new Error("Buffer is not available in this environment.");
}

/**
 * In the browser, Buffer is not available. This always throws.
 */
export function getBufferLength(_buffer: NodeBuffer): number {
  throw new Error("Buffer is not available in this environment.");
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
