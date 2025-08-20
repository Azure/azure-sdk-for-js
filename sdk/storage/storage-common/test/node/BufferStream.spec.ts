// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect } from "vitest";
import { BuffersStream } from "$internal/BuffersStream.js";

describe("BuffersStream", () => {
  it("should read all data from a single buffer", async () => {
    const bufferData = Buffer.from("Hello, BuffersStream!");
    const stream = new BuffersStream([bufferData], bufferData.length);

    let receivedData = Buffer.alloc(0);
    stream.on("data", (chunk) => {
      receivedData = Buffer.concat([receivedData, chunk]);
    });

    await new Promise((resolve) => {
      stream.on("end", resolve);
    });

    expect(receivedData.toString()).toBe("Hello, BuffersStream!");
  });

  it("should read partial data from multiple buffers", async () => {
    const part1 = Buffer.from("Hello, ");
    const part2 = Buffer.from("Buffers");
    const part3 = Buffer.from("Stream");
    const buffers = [part1, part2, part3];

    // Only read the first part + half of the second
    const partialLength = part1.length + Math.floor(part2.length / 2);
    const stream = new BuffersStream(buffers, partialLength);

    let receivedData = Buffer.alloc(0);
    stream.on("data", (chunk) => {
      receivedData = Buffer.concat([receivedData, chunk]);
    });

    await new Promise((resolve) => {
      stream.on("end", resolve);
    });

    assert.equal(receivedData.toString(), "Hello, Buf");
  });

  it("should push null after reading all data", async () => {
    const data = Buffer.from("Test data");
    const stream = new BuffersStream([data], data.length);

    let readChunkCount = 0;
    stream.on("data", () => {
      readChunkCount++;
    });

    let ended = false;
    stream.on("end", () => {
      ended = true;
    });

    await new Promise((resolve) => {
      stream.on("close", resolve);
    });

    assert.isTrue(ended);
    expect(readChunkCount).toBeGreaterThan(0);
  });
});
