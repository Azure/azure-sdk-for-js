// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { Readable } from "node:stream";
import { PooledBuffer } from "$internal/PooledBuffer.js";

/**
 * Helper to collect stream data into a single Buffer.
 */
async function readStream(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

describe("PooledBuffer", () => {
  it("fills and reads data when constructed with exact capacity", async () => {
    const data = Buffer.from("HelloPooledBuffer");
    const pooled = new PooledBuffer(data.length, [data], data.length);

    const result = await readStream(pooled.getReadableStream());

    assert.equal(result.toString(), data.toString(), "Streamed data should match");
    assert.equal(pooled.size, data.length, "PooledBuffer should have size equal to data length");
  });

  it("does not exceed capacity if data is larger", async () => {
    const capacity = 5;
    const data = Buffer.from("LongerThanCapacity");

    const pooled = new PooledBuffer(capacity, [data], data.length);

    const result = await readStream(pooled.getReadableStream());
    assert.equal(result.toString(), "Longe", "Data in the stream should be truncated to capacity");
    assert.equal(pooled.size, capacity, "Size should match capacity, not the full data length");
  });

  it("fills data later using fill()", async () => {
    const capacity = 10;
    const partialData1 = Buffer.from("ABC");

    const pooled = new PooledBuffer(capacity);

    pooled.fill([partialData1], partialData1.length);
    assert.equal(pooled.size, 3);

    const result = await readStream(pooled.getReadableStream());
    assert.equal(result.toString(), "ABC", "All appended data should be streamed in order");
    assert.equal(pooled.size, 3);
  });
});
