// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import { createFile, createFileFromStream } from "../../../src/util/file.js";

describe("file utilities (browser)", function () {
  describe("createFile (browser path)", function () {
    it("creates a File using the native File constructor", function () {
      const content = new Uint8Array([1, 2, 3]);
      const file = createFile(content, "test.txt");
      assert.equal(file.name, "test.txt");
      assert.equal(file.size, 3);
      assert.instanceOf(file, File);
    });

    it("creates a File with custom type option", function () {
      const content = new Uint8Array([10, 20]);
      const file = createFile(content, "data.bin", { type: "application/octet-stream" });
      assert.equal(file.name, "data.bin");
      assert.equal(file.type, "application/octet-stream");
      assert.equal(file.size, 2);
    });

    it("produces correct arrayBuffer output", async function () {
      const content = new Uint8Array([42, 43, 44]);
      const file = createFile(content, "ab.bin");
      const buffer = await file.arrayBuffer();
      const view = new Uint8Array(buffer);
      assert.deepEqual([...view], [42, 43, 44]);
    });

    // SharedArrayBuffer requires cross-origin isolation headers
    it.runIf(typeof SharedArrayBuffer !== "undefined")(
      "handles Uint8Array backed by SharedArrayBuffer via map copy",
      function () {
        const shared = new SharedArrayBuffer(4);
        const view = new Uint8Array(shared);
        view.set([10, 20, 30, 40]);
        const file = createFile(view, "shared.bin");
        assert.equal(file.name, "shared.bin");
        assert.equal(file.size, 4);
        assert.instanceOf(file, File);
      },
    );

    it("handles subarray of a larger buffer", async function () {
      const largeBuffer = new ArrayBuffer(10);
      const fullView = new Uint8Array(largeBuffer);
      fullView.set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const subarray = fullView.subarray(3, 7);
      const file = createFile(subarray, "sub.bin");
      assert.equal(file.size, 4);
      const buffer = await file.arrayBuffer();
      const result = new Uint8Array(buffer);
      assert.deepEqual([...result], [3, 4, 5, 6]);
    });
  });

  describe("createFileFromStream (browser path)", function () {
    it("creates a file from a ReadableStream factory", function () {
      const streamFactory = () =>
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new Uint8Array([1, 2, 3]));
            controller.close();
          },
        });
      const file = createFileFromStream(streamFactory, "stream.txt");
      assert.equal(file.name, "stream.txt");
      assert.equal(file.size, -1);
    });

    it("stream() returns a ReadableStream directly in browser", async function () {
      const streamFactory = () =>
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new Uint8Array([7, 8, 9]));
            controller.close();
          },
        });
      const file = createFileFromStream(streamFactory, "stream.bin");
      const stream = file.stream();
      assert.instanceOf(stream, ReadableStream);
      const reader = stream.getReader();
      const { value } = await reader.read();
      assert.deepEqual([...value!], [7, 8, 9]);
    });

    it("stream() can be called multiple times for retries", async function () {
      const streamFactory = vi.fn<() => ReadableStream<Uint8Array>>();
      streamFactory.mockImplementation(
        () =>
          new ReadableStream<Uint8Array>({
            start(controller) {
              controller.enqueue(new Uint8Array([streamFactory.mock.calls.length]));
              controller.close();
            },
          }),
      );
      const file = createFileFromStream(streamFactory, "retry.bin");

      // First call
      const stream1 = file.stream();
      const reader1 = stream1.getReader();
      const { value: v1 } = await reader1.read();
      assert.equal(v1![0], 1);

      // Second call (simulating retry)
      const stream2 = file.stream();
      const reader2 = stream2.getReader();
      const { value: v2 } = await reader2.read();
      assert.equal(v2![0], 2);

      expect(streamFactory).toHaveBeenCalledTimes(2);
    });
  });
});
