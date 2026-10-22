// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi } from "vitest";
import { EventEmitter } from "node:events";
import { Readable, Writable } from "node:stream";
import { concat } from "../../../src/util/concat.js";
import { startBodyStream } from "../../../src/util/nodeBody.js";
import type { ConcatSource } from "../../../src/util/concat.js";

async function streamFor(
  sources: (ConcatSource | (() => ConcatSource))[],
): Promise<NodeJS.ReadableStream> {
  const result = await concat(sources);
  if (typeof result !== "function") throw new Error("Expected a Node stream factory");
  return result();
}

describe("lazy multipart concatenation", () => {
  it.each([false, true])(
    "stops the active part without touching later parts (factory=%s)",
    async (owned) => {
      const source = new Readable({
        read() {
          this.push(Buffer.alloc(64 * 1024));
        },
      });
      const later = vi.fn(() => Readable.from("later"));
      const stream = await streamFor([owned ? () => source : source, later]);
      const wrapper = stream as Readable;
      await new Promise<void>((resolve) => {
        wrapper.once("data", () => {
          wrapper.destroy();
          resolve();
        });
        wrapper.resume();
      });
      expect(later).not.toHaveBeenCalled();
      expect(source.destroyed).toBe(owned);
      expect(source.readableFlowing).toBe(false);
      source.destroy();
    },
  );

  it.each([false, true])(
    "releases a pending Web reader and only cancels owned parts (factory=%s)",
    async (owned) => {
      const canceled = vi.fn();
      let resolvePull!: () => void;
      const pulling = new Promise<void>((resolve) => {
        resolvePull = resolve;
      });
      const source = new ReadableStream<Uint8Array<ArrayBuffer>>({
        pull() {
          resolvePull();
          return new Promise<void>(() => {});
        },
        cancel: canceled,
      });
      const wrapper = await streamFor([owned ? () => source : source]);
      wrapper.resume();
      await pulling;
      await new Promise((resolve) => setImmediate(resolve));
      expect(source.locked).toBe(true);
      (wrapper as Readable).destroy();
      await new Promise((resolve) => setImmediate(resolve));
      expect(source.locked).toBe(false);
      expect(canceled).toHaveBeenCalledTimes(owned ? 1 : 0);
      if (!owned) await source.cancel();
    },
  );

  it("does not acquire any part before reading the wrapper", async () => {
    const factory = vi.fn(() => Readable.from("part"));
    const wrapper = await streamFor([factory]);
    (wrapper as Readable).destroy();
    expect(factory).not.toHaveBeenCalled();
  });

  it("drains high-water-mark parts in order in pull mode", async () => {
    const later = vi.fn(() => Readable.from("later"));
    const wrapper = (await streamFor([
      () => Buffer.alloc(wrapper.readableHighWaterMark),
      later,
    ])) as Readable;
    const chunks: Buffer[] = [];
    for await (const chunk of wrapper) chunks.push(Buffer.from(chunk));
    expect(Buffer.concat(chunks)).toEqual(
      Buffer.concat([Buffer.alloc(wrapper.readableHighWaterMark), Buffer.from("later")]),
    );
    expect(later).toHaveBeenCalledOnce();
  });

  it("does not advance while a pipe destination is backpressured", async () => {
    const later = vi.fn(() => Readable.from("later"));
    const wrapper = (await streamFor([Buffer.alloc(64 * 1024), later])) as Readable;
    let releaseWrite!: () => void;
    let resolveBlocked!: () => void;
    const blocked = new Promise<void>((resolve) => {
      resolveBlocked = resolve;
    });
    const destination = new Writable({
      highWaterMark: 1,
      write(_chunk, _encoding, callback) {
        if (!releaseWrite) {
          releaseWrite = callback;
          resolveBlocked();
        } else {
          callback();
        }
      },
    });
    const finished = new Promise<void>((resolve) => destination.once("finish", resolve));
    wrapper.pipe(destination);
    await blocked;
    await new Promise((resolve) => setImmediate(resolve));
    expect(wrapper.readableFlowing).toBe(false);
    expect(later).not.toHaveBeenCalled();

    releaseWrite();
    await finished;
    expect(later).toHaveBeenCalledOnce();
  });

  it("does not resume a multi-chunk part before pipe backpressure drains", async () => {
    const source = Readable.from([Buffer.alloc(64 * 1024), Buffer.alloc(64 * 1024)]);
    const later = vi.fn(() => Readable.from("later"));
    const wrapper = (await streamFor([source, later])) as Readable;
    let releaseWrite!: () => void;
    let resolveBlocked!: () => void;
    const blocked = new Promise<void>((resolve) => {
      resolveBlocked = resolve;
    });
    let writes = 0;
    const destination = new Writable({
      highWaterMark: 1,
      write(_chunk, _encoding, callback) {
        writes++;
        if (writes === 1) {
          releaseWrite = callback;
          resolveBlocked();
        } else {
          callback();
        }
      },
    });
    const finished = new Promise<void>((resolve) => destination.once("finish", resolve));
    wrapper.pipe(destination);
    await blocked;
    await new Promise((resolve) => setImmediate(resolve));
    expect(source.readableFlowing).toBe(false);
    expect(writes).toBe(1);
    expect(later).not.toHaveBeenCalled();

    releaseWrite();
    await finished;
    expect(writes).toBe(3);
    expect(later).toHaveBeenCalledOnce();
  });

  it("tracks non-negotiated custom streams by identity", () => {
    const source = Object.assign(new EventEmitter(), {
      readable: true,
      pipe: vi.fn(),
      pause: vi.fn(),
      unpipe: vi.fn(),
    }) as unknown as NodeJS.ReadableStream;

    startBodyStream(source);
    expect(() => startBodyStream(source)).toThrow(
      "Cannot resend an already-started request body stream",
    );
  });

  it("rejects replay of the actual one-shot part, not just the fresh wrapper", async () => {
    const part = Readable.from("once");
    const first = await streamFor([part]);
    startBodyStream(first);
    for await (const _chunk of first) {
      /* drain */
    }
    const second = await streamFor([part]);
    expect(() => startBodyStream(second)).toThrow(
      "Cannot resend an already-started request body stream",
    );
  });

  it("rejects an already-ended direct part without replay protection", async () => {
    const part = Readable.from("once");
    const first = await streamFor([part]);
    for await (const _chunk of first) {
      /* drain */
    }
    const second = await streamFor([part]);
    await expect(
      (async () => {
        for await (const _chunk of second) {
          /* drain */
        }
      })(),
    ).rejects.toMatchObject({ name: "RestError", code: "REQUEST_BODY_NOT_REPLAYABLE" });
  });

  it("rejects a partially consumed direct Node stream on a protected retry", async () => {
    let pushed = false;
    const part = new Readable({
      read() {
        if (!pushed) {
          pushed = true;
          this.push("partial");
        }
      },
    });
    const first = (await streamFor([part])) as Readable;
    await new Promise<void>((resolve) => {
      first.once("data", () => {
        first.destroy();
        resolve();
      });
      first.resume();
    });
    const second = await streamFor([part]);
    expect(() => startBodyStream(second)).toThrow(
      "Cannot resend an already-started request body stream",
    );
    part.destroy();
  });

  it("rejects a disturbed direct Web stream on a protected retry", async () => {
    const part = new ReadableStream<Uint8Array<ArrayBuffer>>({
      start(controller) {
        controller.enqueue(Uint8Array.from([1]));
      },
    });
    const first = (await streamFor([part])) as Readable;
    await new Promise<void>((resolve) => {
      first.once("data", () => {
        first.destroy();
        resolve();
      });
      first.resume();
    });
    await new Promise((resolve) => setImmediate(resolve));
    expect(part.locked).toBe(false);
    const second = await streamFor([part]);
    expect(() => startBodyStream(second)).toThrow(
      "Cannot resend an already-started multipart stream",
    );
  });

  it("propagates factory and source errors", async () => {
    const factoryFailure = await streamFor([
      () => {
        throw new Error("factory failure");
      },
    ]);
    await expect(
      (async () => {
        for await (const _chunk of factoryFailure) {
          /* drain */
        }
      })(),
    ).rejects.toThrow("factory failure");
    const sourceFailure = await streamFor([
      () =>
        new Readable({
          read() {
            this.destroy(new Error("source failure"));
          },
        }),
    ]);
    await expect(
      (async () => {
        for await (const _chunk of sourceFailure) {
          /* drain */
        }
      })(),
    ).rejects.toThrow("source failure");
  });
});
