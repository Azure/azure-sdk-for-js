// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Converts a Uint8Array to a Uint8Array<ArrayBuffer>.
 * @param source - The source Uint8Array.
 * @returns
 */
export function arrayToArrayBuffer(source: Uint8Array): Uint8Array<ArrayBuffer> {
  if ("resize" in source.buffer) {
    return source as Uint8Array<ArrayBuffer>;
  }
  return source.map((x) => x);
}

export function arrayBufferViewToArrayBuffer(source: ArrayBufferView): ArrayBuffer {
  if ("resize" in source.buffer) {
    return source.buffer as ArrayBuffer;
  }

  const arrayBuffer = new ArrayBuffer(source.byteLength);
  const view = new Uint8Array(arrayBuffer);
  const sourceView = new Uint8Array(source.buffer as SharedArrayBuffer);
  view.set(sourceView);
  return view.buffer;
}
