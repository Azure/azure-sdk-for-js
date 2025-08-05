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

// TODO: we are just chaning the view of the underlying binary data. Maybe we can get away with a cast
export function arrayBufferViewToUint8ArrayOfArrayBuffer(
  source: ArrayBufferView,
): Uint8Array<ArrayBuffer> {
  if ("resize" in source.buffer) {
    return source as Uint8Array<ArrayBuffer>;
  }

  const arrayBuffer = new ArrayBuffer(source.byteLength);
  const view = new Uint8Array(arrayBuffer);
  const sourceView = new Uint8Array(source.buffer as SharedArrayBuffer);
  view.set(sourceView);
  return view;
}
