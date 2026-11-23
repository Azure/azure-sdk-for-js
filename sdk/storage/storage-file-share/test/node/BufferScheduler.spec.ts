// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { PassThrough } from "node:stream";
import { BufferScheduler } from "../../src/utils/BufferScheduler.js";

describe("BufferScheduler", () => {
  it("rejects without reading the stream when the signal is already aborted", async () => {
    const stream = new PassThrough();
    const scheduler = new BufferScheduler(stream, 8, 2, async () => {}, 1);

    let error: unknown;
    try {
      await scheduler.do({ abortSignal: AbortSignal.abort() });
    } catch (e) {
      error = e;
    }

    assert.equal((error as Error)?.name, "AbortError", "do() should reject with an AbortError");
    assert.equal(stream.listenerCount("data"), 0, "do() should not read the stream");
    // An error the stream raises later, as a file stream does when its file can't be opened,
    // must not end the process.
    assert.doesNotThrow(() => stream.emit("error", new Error("ENOENT: no such file or directory")));
  });

  it("starts no queued upload and leaves the stream alone when running uploads end after an abort", async () => {
    const stream = new PassThrough();
    const startedOffsets: number[] = [];
    let finish!: () => void;
    let fail!: (err: Error) => void;
    const finished = new Promise<void>((resolve) => {
      finish = resolve;
    });
    const failed = new Promise<void>((_resolve, reject) => {
      fail = reject;
    });
    const scheduler = new BufferScheduler(
      stream,
      4,
      4,
      async (_buffer, offset) => {
        startedOffsets.push(offset!);
        await (offset === 0 ? finished : failed);
      },
      2,
    );
    const abortController = new AbortController();
    const schedulerPromise = scheduler.do({ abortSignal: abortController.signal });

    // Four buffers: two uploads run and two buffers wait in the queue.
    stream.write(Buffer.from("1234567890123456"));
    await new Promise((resolve) => setImmediate(resolve));
    abortController.abort();

    let error: unknown;
    try {
      await schedulerPromise;
    } catch (e) {
      error = e;
    }
    assert.equal((error as Error)?.name, "AbortError", "do() should reject with an AbortError");

    // The caller drains the stream while the running uploads end, one way or the other.
    stream.resume();
    finish();
    fail(new Error("The operation was aborted."));
    stream.write(Buffer.from("abcdefgh"));
    await new Promise((resolve) => setImmediate(resolve));

    assert.deepEqual(
      startedOffsets,
      [0, 4],
      "queued buffers should not be uploaded after the abort",
    );
    assert.isFalse(stream.isPaused(), "the stream should keep flowing");
    // A later error from the stream must not end the process.
    assert.doesNotThrow(() => stream.emit("error", new Error("ENOENT: no such file or directory")));
  });
});
