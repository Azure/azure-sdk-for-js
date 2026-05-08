// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { streamToBuffer, streamToBuffer2 } from "../../src/utils/utils.js";
import { describe, it, assert } from "vitest";

describe("streamToBuffer helpers", () => {
  // Build a Readable that already has multiple chunks queued internally before any
  // consumer attaches a `readable` listener. This forces the consumer to drain
  // multiple buffered chunks from a single `readable` event - the exact scenario
  // that regressed in Node.js v26 (see nodejs/node#60441).
  function makeMultiChunkStream(chunks: Buffer[]): Readable {
    const stream = new Readable({ read() {} });
    for (const chunk of chunks) {
      stream.push(chunk);
    }
    stream.push(null);
    return stream;
  }

  describe("streamToBuffer", () => {
    it("reads exactly `count` bytes when multiple chunks are pre-buffered", async () => {
      const chunks = [Buffer.from("hello "), Buffer.from("buffered "), Buffer.from("world!")];
      const expected = Buffer.concat(chunks);
      const stream = makeMultiChunkStream(chunks);

      const output = Buffer.alloc(expected.length);
      await streamToBuffer(stream, output, 0, expected.length);

      assert.deepEqual(output, expected);
    });

    it("fills the requested slice with multi-chunk data and stops at `count`", async () => {
      const chunks = [Buffer.from("AAAA"), Buffer.from("BBBB"), Buffer.from("CCCC")];
      const stream = makeMultiChunkStream(chunks);

      // Pre-fill output with marker bytes so we can verify only [offset, end) is touched.
      const marker = 0xff;
      const output = Buffer.alloc(20, marker);
      const offset = 4;
      const end = 14; // request 10 bytes; stream has 12 available

      await streamToBuffer(stream, output, offset, end);

      for (let i = 0; i < offset; i++) {
        assert.strictEqual(output[i], marker, `byte ${i} (before offset) modified`);
      }
      for (let i = end; i < output.length; i++) {
        assert.strictEqual(output[i], marker, `byte ${i} (after end) modified`);
      }
      assert.deepEqual(
        output.subarray(offset, end),
        Buffer.concat(chunks).subarray(0, end - offset),
      );
    });

    it("rejects when the stream ends before `count` bytes are read", async () => {
      const chunks = [Buffer.from("abc"), Buffer.from("def")];
      const stream = makeMultiChunkStream(chunks);

      const output = Buffer.alloc(10);
      let caught: Error | undefined;
      try {
        await streamToBuffer(stream, output, 0, 10);
      } catch (err: any) {
        caught = err;
      }
      assert.isDefined(caught, "Expected streamToBuffer to reject");
      assert.match(caught!.message, /Stream drains before/);
    });
  });

  describe("streamToBuffer2", () => {
    it("reads all bytes when multiple chunks are pre-buffered", async () => {
      const chunks = [Buffer.from("first "), Buffer.from("second "), Buffer.from("third")];
      const expected = Buffer.concat(chunks);
      const stream = makeMultiChunkStream(chunks);

      const output = Buffer.alloc(expected.length);
      const bytesRead = await streamToBuffer2(stream, output);

      assert.strictEqual(bytesRead, expected.length);
      assert.deepEqual(output, expected);
    });

    it("rejects when concatenated chunks exceed the buffer size", async () => {
      const chunks = [Buffer.from("AAAA"), Buffer.from("BBBB"), Buffer.from("CCCC")];
      const stream = makeMultiChunkStream(chunks);

      const output = Buffer.alloc(8); // total chunks = 12 bytes > 8
      let caught: Error | undefined;
      try {
        await streamToBuffer2(stream, output);
      } catch (err: any) {
        caught = err;
      }
      assert.isDefined(caught, "Expected streamToBuffer2 to reject");
      assert.match(caught!.message, /Stream exceeds buffer size/);
    });
  });
});
