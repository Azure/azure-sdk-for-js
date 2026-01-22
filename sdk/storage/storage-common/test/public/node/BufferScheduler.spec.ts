// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { PassThrough } from "node:stream";
import { BufferScheduler } from "@azure/storage-common";

describe("BufferScheduler", () => {
  it("handles a small amount of data", async () => {
    const stream = new PassThrough();
    const testData = Buffer.from("Hello BufferScheduler ESM!");
    const results: Buffer[] = [];

    async function outgoingHandler(
      body: () => NodeJS.ReadableStream,
      _length: number,
    ): Promise<void> {
      const chunks: Buffer[] = [];
      for await (const chunk of body()) {
        if (Buffer.isBuffer(chunk)) {
          chunks.push(chunk);
        }
      }
      results.push(Buffer.concat(chunks));
    }

    const scheduler = new BufferScheduler(stream, 8, 2, outgoingHandler, 1);
    const schedulerPromise = scheduler.do();

    stream.write(testData);
    stream.end();

    await schedulerPromise;

    const combined = Buffer.concat(results);
    assert.equal(combined.toString(), testData.toString(), "All data should match");
  });

  it("respects concurrency", async () => {
    const stream = new PassThrough();
    const testData = Buffer.from("MLoremIpsumData123456789");
    const collected: Buffer[] = [];

    async function slowHandler(body: () => NodeJS.ReadableStream): Promise<void> {
      const chunks: Buffer[] = [];
      for await (const chunk of body()) {
        if (Buffer.isBuffer(chunk)) {
          chunks.push(chunk);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
      collected.push(Buffer.concat(chunks));
    }

    const scheduler = new BufferScheduler(stream, 5, 4, slowHandler, 1);
    const schedulerPromise = scheduler.do();

    stream.write(testData.slice(0, 10));
    stream.write(testData.slice(10));
    stream.end();

    await schedulerPromise;

    const combined = Buffer.concat(collected);
    assert.equal(combined.toString(), testData.toString(), "All data should eventually arrive");
  });

  it("offset increments correctly with multiple buffers", async () => {
    const stream = new PassThrough();
    const data1 = Buffer.from("12345");
    const data2 = Buffer.from("67890");
    const offsetLog: number[] = [];

    async function handlerWithOffset(
      body: () => NodeJS.ReadableStream,
      _length: number,
      offset: number | undefined,
    ): Promise<void> {
      offsetLog.push(offset!);
      for await (const _ of body()) {
        // Consume the stream data
      }
    }

    const scheduler = new BufferScheduler(stream, 5, 2, handlerWithOffset, 2);
    const schedulerPromise = scheduler.do();

    stream.write(data1);
    stream.write(data2);
    stream.end();

    await schedulerPromise;

    assert.deepEqual(offsetLog, [0, 5], "Offset should track the starting point of each buffer");
  });
});
