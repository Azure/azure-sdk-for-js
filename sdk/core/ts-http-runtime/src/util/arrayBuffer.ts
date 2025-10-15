// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Converts an ArrayBufferView to an ArrayBuffer.
 * @param source - The source ArrayBufferView.
 * @returns The resulting ArrayBuffer.
 */
export function arrayBufferViewToArrayBuffer(source: ArrayBufferView): ArrayBuffer {
  if (
    source.buffer instanceof ArrayBuffer &&
    source.byteOffset === 0 &&
    source.byteLength === source.buffer.byteLength
  ) {
    return source.buffer;
  }

  const arrayBuffer = new ArrayBuffer(source.byteLength);
  const view = new Uint8Array(arrayBuffer);
  const sourceView = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
  view.set(sourceView);
  return view.buffer;
}
