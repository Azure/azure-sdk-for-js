// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { expect } from "vitest";

export async function expectWav(
  audio: { blobBody?: Promise<Blob>; readableStreamBody?: NodeJS.ReadableStream },
  channels: number,
): Promise<void> {
  let bytes: Uint8Array;
  if (audio.blobBody) {
    bytes = new Uint8Array(await (await audio.blobBody).arrayBuffer());
  } else {
    if (!audio.readableStreamBody) {
      throw new Error("Audio response did not contain a readable body.");
    }
    const { buffer } = await import("node:stream/consumers");
    bytes = await buffer(audio.readableStreamBody);
  }
  expect(bytes.length).toBeGreaterThan(44);
  expect(String.fromCharCode(...bytes.subarray(0, 4))).toBe("RIFF");
  expect(String.fromCharCode(...bytes.subarray(8, 12))).toBe("WAVE");
  const header = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  expect(header.getUint32(4, true) + 8).toBe(bytes.length);
  expect(header.getUint16(22, true)).toBe(channels);
  expect(header.getUint32(24, true)).toBe(24000);
  expect(header.getUint16(34, true)).toBe(16);
}
