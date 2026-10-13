// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { createSseStream } from "../../../src/index.js";
import { buildWebBackpressureTests } from "../browser/webBackpressure.js";
import { describe, expect, it, vi } from "vitest";

buildWebBackpressureTests("Node native Web");

describe("[Node] SSE backpressure", () => {
  it("does not start its source before consumer demand and reads ordinary events through EOF", async () => {
    const pulls = vi.fn();
    const closed = vi.fn();
    const body = Readable.from(
      (async function* () {
        try {
          for (const data of ["first", "second"]) {
            pulls();
            yield new TextEncoder().encode(`data: ${data}\n\n`);
          }
        } finally {
          closed();
        }
      })(),
      { highWaterMark: 0 },
    );
    const stream = createSseStream(body);
    const iterator = stream[Symbol.asyncIterator]();
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      expect(pulls).not.toHaveBeenCalled();
      expect((await iterator.next()).value?.data).toBe("first");
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      expect(pulls).toHaveBeenCalledOnce();
      expect((await iterator.next()).value?.data).toBe("second");
      expect((await iterator.next()).done).toBe(true);
      expect(pulls).toHaveBeenCalledTimes(2);
      expect(closed).toHaveBeenCalledOnce();
    } finally {
      await iterator.return?.();
      await stream[Symbol.asyncDispose]();
    }
  });

  it("preserves a source failure on the requested next event", async () => {
    const failure = new Error("source failed");
    const closed = vi.fn();
    const body = Readable.from(
      (async function* () {
        try {
          yield new TextEncoder().encode("data: first\n\n");
          throw failure;
        } finally {
          closed();
        }
      })(),
      { highWaterMark: 0 },
    );
    const stream = createSseStream(body);
    const iterator = stream[Symbol.asyncIterator]();
    try {
      expect((await iterator.next()).value?.data).toBe("first");
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      expect(closed).not.toHaveBeenCalled();
      await expect(iterator.next()).rejects.toBe(failure);
      expect(closed).toHaveBeenCalledOnce();
      expect(body.destroyed).toBe(true);
    } finally {
      await iterator.return?.();
      await stream[Symbol.asyncDispose]();
    }
  });

  it.each(["return", "paused return", "break"] as const)(
    "does not request the trailing source chunk before %s",
    async (mode) => {
      const trailing = vi.fn();
      const closed = vi.fn();
      const body = Readable.from(
        (async function* () {
          try {
            yield new TextEncoder().encode('event: done\ndata: {"final":true}\n\n');
            trailing();
            yield new TextEncoder().encode('event: done\ndata: {"final":false}\n\n');
          } finally {
            closed();
          }
        })(),
        { highWaterMark: 0 },
      );
      const stream = createSseStream(body);
      try {
        if (mode === "break") {
          for await (const event of stream) {
            expect(event.data).toBe('{"final":true}');
            break;
          }
        } else {
          const iterator = stream[Symbol.asyncIterator]();
          expect((await iterator.next()).value?.data).toBe('{"final":true}');
          if (mode === "paused return") {
            await new Promise<void>((resolve) => setTimeout(resolve, 0));
          }
          await iterator.return?.();
        }
        expect(trailing).not.toHaveBeenCalled();
        await vi.waitFor(() => expect(closed).toHaveBeenCalledOnce());
        expect(body.destroyed).toBe(true);
      } finally {
        await stream[Symbol.asyncDispose]();
      }
    },
  );
});
