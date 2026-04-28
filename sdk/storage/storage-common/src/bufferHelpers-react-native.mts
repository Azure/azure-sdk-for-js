// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeBuffer } from "@azure/core-rest-pipeline";

/**
 * In React Native, Buffer is not available. This always returns false.
 */
export function isBuffer(_value: unknown): _value is NodeBuffer {
  return false;
}

/**
 * In React Native, Buffer is not available. This always throws.
 */
export function allocBuffer(_size: number): NodeBuffer {
  throw new Error("Buffer is not available in this environment.");
}

/**
 * In React Native, Buffer is not available. This always throws.
 */
export function bufferFromString(_str: string, _encoding?: string): NodeBuffer {
  throw new Error("Buffer is not available in this environment.");
}

/**
 * In React Native, Buffer is not available. This always throws.
 */
export function bufferFromArrayBuffer(
  _ab: ArrayBuffer,
  _byteOffset?: number,
  _length?: number,
): NodeBuffer {
  throw new Error("Buffer is not available in this environment.");
}

/**
 * In React Native, Buffer is not available. This always throws.
 */
export function getBufferLength(_buffer: NodeBuffer): number {
  throw new Error("Buffer is not available in this environment.");
}

/**
 * Creates a Blob from the given data in React Native.
 * React Native's Blob constructor accepts ArrayBuffer at runtime but the type
 * definitions only declare (string | Blob)[]. We work around this by using
 * an internal constructor type.
 */
export function createBlobFromData(data: Blob | ArrayBuffer | ArrayBufferView): Blob {
  if (data instanceof Blob) {
    return data;
  }
  // React Native's Blob constructor supports ArrayBuffer at runtime.
  // Use an indirect constructor reference to avoid the restrictive RN type.
  const BlobCtor = Blob as { new (parts: unknown[]): Blob };
  if (data instanceof ArrayBuffer) {
    return new BlobCtor([data]);
  } else {
    const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    return new BlobCtor([ab]);
  }
}
