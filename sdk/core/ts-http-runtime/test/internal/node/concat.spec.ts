// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi } from "vitest";
import { Readable } from "node:stream";
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

  it("rejects replay of the actual one-shot part, not just the fresh wrapper", async () => {
    const part = Readable.from("once");
    const first = await streamFor([part]);
    startBodyStream(first, true);
    for await (const _chunk of first) {
      /* drain */
    }
    const second = await streamFor([part]);
    startBodyStream(second, true);
    await expect(
      (async () => {
        for await (const _chunk of second) {
          /* drain */
        }
      })(),
    ).rejects.toMatchObject({ name: "RestError", code: "REQUEST_BODY_NOT_REPLAYABLE" });
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
