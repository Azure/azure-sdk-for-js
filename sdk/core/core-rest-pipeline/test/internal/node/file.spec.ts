// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { Readable } from "stream";
import {
  createFile,
  createFileFromStream,
  getRawContent,
  hasRawContent,
} from "../../../src/util/file.js";

describe("file utilities", function () {
  describe("createFile", function () {
    it("creates a file with default options", function () {
      const content = new Uint8Array([1, 2, 3]);
      const file = createFile(content, "test.txt");
      assert.equal(file.name, "test.txt");
      assert.equal(file.size, 3);
      assert.equal(file.type, "");
    });

    it("creates a file with custom options", function () {
      const content = new Uint8Array([1, 2, 3]);
      const file = createFile(content, "test.txt", {
        type: "text/plain",
        lastModified: 12345,
        webkitRelativePath: "path/test.txt",
      });
      assert.equal(file.name, "test.txt");
      assert.equal(file.type, "text/plain");
    });

    it("has raw content", function () {
      const content = new Uint8Array([1, 2, 3]);
      const file = createFile(content, "test.txt");
      assert.isTrue(hasRawContent(file));
      const raw = getRawContent(file);
      assert.instanceOf(raw, Uint8Array);
    });

    it("returns a working arrayBuffer", async function () {
      const content = new Uint8Array([10, 20, 30]);
      const file = createFile(content, "test.bin");
      const buffer = await file.arrayBuffer();
      const view = new Uint8Array(buffer);
      assert.equal(view[0], 10);
      assert.equal(view[1], 20);
      assert.equal(view[2], 30);
    });

    it("returns a working stream", async function () {
      const content = new Uint8Array([1, 2, 3]);
      const file = createFile(content, "test.bin");
      const stream = file.stream();
      const reader = stream.getReader();
      const chunks: Uint8Array[] = [];
      let result = await reader.read();
      while (!result.done) {
        chunks.push(result.value);
        result = await reader.read();
      }
      assert.isNotEmpty(chunks);
    });
  });

  describe("createFileFromStream", function () {
    it("creates a file from a web stream factory", function () {
      const streamFactory = () =>
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new Uint8Array([1, 2, 3]));
            controller.close();
          },
        });
      const file = createFileFromStream(streamFactory, "stream.txt");
      assert.equal(file.name, "stream.txt");
      assert.equal(file.size, -1); // default when no size specified
      assert.equal(file.type, "");
    });

    it("creates a file from stream with options", function () {
      const streamFactory = () =>
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new Uint8Array([1, 2]));
            controller.close();
          },
        });
      const file = createFileFromStream(streamFactory, "stream.txt", {
        size: 100,
        type: "application/octet-stream",
        lastModified: 99999,
        webkitRelativePath: "dir/stream.txt",
      });
      assert.equal(file.size, 100);
      assert.equal(file.type, "application/octet-stream");
    });

    it("has raw content pointing to the stream factory", function () {
      const streamFactory = () =>
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.close();
          },
        });
      const file = createFileFromStream(streamFactory, "stream.txt");
      assert.isTrue(hasRawContent(file));
    });

    it("stream() returns the web stream from factory", async function () {
      const streamFactory = () =>
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new Uint8Array([4, 5, 6]));
            controller.close();
          },
        });
      const file = createFileFromStream(streamFactory, "stream.txt");
      const stream = file.stream();
      const reader = stream.getReader();
      const result = await reader.read();
      assert.deepEqual([...result.value!], [4, 5, 6]);
    });

    it("stream() throws when a Node.js stream is provided", function () {
      // Create a factory that returns a Node-like readable stream (has pipe method)
      const nodeStreamFactory = () =>
        new Readable({
          read() {
            this.push(null);
          },
        });
      const file = createFileFromStream(nodeStreamFactory, "node-stream.txt");
      assert.throws(
        () => file.stream(),
        /Not supported: a Node stream was provided as input to createFileFromStream/,
      );
    });

    it("throws unimplemented for arrayBuffer", async function () {
      const streamFactory = () =>
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.close();
          },
        });
      const file = createFileFromStream(streamFactory, "stream.txt");
      assert.throws(() => file.arrayBuffer(), /Not implemented/);
    });

    it("throws unimplemented for text", function () {
      const streamFactory = () =>
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.close();
          },
        });
      const file = createFileFromStream(streamFactory, "stream.txt");
      assert.throws(() => file.text(), /Not implemented/);
    });

    it("throws unimplemented for slice", function () {
      const streamFactory = () =>
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.close();
          },
        });
      const file = createFileFromStream(streamFactory, "stream.txt");
      assert.throws(() => file.slice(), /Not implemented/);
    });

    it("throws unimplemented for bytes", function () {
      const streamFactory = () =>
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.close();
          },
        });
      const file = createFileFromStream(streamFactory, "stream.txt");
      assert.throws(() => file.bytes(), /Not implemented/);
    });
  });

  describe("getRawContent", function () {
    it("returns the blob itself when it has no raw content", function () {
      const blob = new Blob(["hello"]);
      const raw = getRawContent(blob);
      assert.strictEqual(raw, blob);
    });
  });

  describe("hasRawContent", function () {
    it("returns false for plain objects", function () {
      assert.isFalse(hasRawContent({}));
    });

    it("returns false for a non-file object", function () {
      assert.isFalse(hasRawContent({ name: "not a file" }));
    });
  });

  describe("createFile with SharedArrayBuffer content", function () {
    it("handles Uint8Array backed by SharedArrayBuffer", async function () {
      const shared = new SharedArrayBuffer(3);
      const view = new Uint8Array(shared);
      view.set([7, 8, 9]);
      const file = createFile(view, "shared.bin");
      assert.equal(file.name, "shared.bin");
      assert.equal(file.size, 3);
      // Call arrayBuffer() to exercise the toArrayBuffer SharedArrayBuffer path
      const buffer = await file.arrayBuffer();
      const result = new Uint8Array(buffer);
      assert.equal(result[0], 7);
      assert.equal(result[1], 8);
      assert.equal(result[2], 9);
    });
  });

  describe("createFile with subarray content", function () {
    it("handles Uint8Array that is a subarray of a larger buffer", function () {
      const largeBuffer = new ArrayBuffer(10);
      const view = new Uint8Array(largeBuffer);
      view.set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const subarray = view.subarray(2, 5);
      const file = createFile(subarray, "subarray.bin");
      assert.equal(file.size, 3);
      assert.equal(file.name, "subarray.bin");
    });
  });
});
