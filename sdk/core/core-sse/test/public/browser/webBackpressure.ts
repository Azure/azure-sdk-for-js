// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createReconnectingSseStream,
  createSseStream,
  type EventMessageStream,
} from "../../../src/index.js";
import { describe, expect, it, vi, type SuiteCollector } from "vitest";

async function pauseConsumer(): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
}

async function* terminalMapper(
  stream: EventMessageStream,
  deserialize: (data: string) => { final: boolean },
): AsyncIterableIterator<{ final: boolean }> {
  const iterator = stream[Symbol.asyncIterator]();
  const first = await iterator.next();
  if (first.done) {
    throw new Error("Expected a terminal event.");
  }
  const value = deserialize(first.value.data);
  await iterator.return?.();
  yield value;
}

export function buildWebBackpressureTests(runtimeName: string): SuiteCollector {
  return describe(`[${runtimeName}] Web SSE backpressure`, () => {
    it.each(["return", "paused return", "break", "terminal mapper"] as const)(
      "does not pull a trailing frame before %s",
      async (mode) => {
        let pulls = 0;
        const pullsAtCancel: number[] = [];
        const cancel = vi.fn(() => {
          pullsAtCancel.push(pulls);
        });
        const body = new ReadableStream<Uint8Array>(
          {
            pull(controller) {
              pulls++;
              controller.enqueue(
                new TextEncoder().encode(`event: done\ndata: {"final":${pulls === 1}}\n\n`),
              );
            },
            cancel,
          },
          // Exclude transport buffering so only core-owned pulls are counted.
          { highWaterMark: 0 },
        );
        const rawCancel = vi.spyOn(body, "cancel");
        const stream = createSseStream(body);
        let pullsAtInspection: number | undefined;
        try {
          if (mode === "terminal mapper") {
            const deserialize = vi.fn((data: string) => {
              pullsAtInspection = pulls;
              return JSON.parse(data) as { final: boolean };
            });
            const iterator = terminalMapper(stream, deserialize);
            const first = await iterator.next();
            expect(first).toEqual({ done: false, value: { final: true } });
            expect(deserialize).toHaveBeenCalledOnce();
            expect(body.locked).toBe(false);
            await pauseConsumer();
            expect(await iterator.next()).toEqual({ done: true, value: undefined });
          } else if (mode === "break") {
            const values: string[] = [];
            for await (const event of stream) {
              values.push(event.data);
              break;
            }
            expect(values).toEqual(['{"final":true}']);
            pullsAtInspection = pulls;
          } else {
            const iterator = stream[Symbol.asyncIterator]();
            const first = await iterator.next();
            expect(first.value?.data).toBe('{"final":true}');
            pullsAtInspection = pulls;
            if (mode === "paused return") {
              await pauseConsumer();
            }
            await iterator.return?.();
          }

          expect({ pullsAtInspection, pullsAtCancel, pulls }).toEqual({
            pullsAtInspection: 1,
            pullsAtCancel: [1],
            pulls: 1,
          });
          expect(cancel).toHaveBeenCalledOnce();
          expect(rawCancel).not.toHaveBeenCalled();
          expect(body.locked).toBe(false);
        } finally {
          await stream[Symbol.asyncDispose]();
          rawCancel.mockRestore();
        }
      },
    );

    it("waits for demand before the first frame and between ordinary events", async () => {
      let pulls = 0;
      const cancel = vi.fn();
      const body = new ReadableStream<Uint8Array>(
        {
          pull(controller) {
            pulls++;
            if (pulls <= 2) {
              controller.enqueue(new TextEncoder().encode(`data: ${pulls}\n\n`));
            } else {
              controller.close();
            }
          },
          cancel,
        },
        { highWaterMark: 0 },
      );
      const stream = createSseStream(body);
      const iterator = stream[Symbol.asyncIterator]();
      try {
        await pauseConsumer();
        expect(pulls).toBe(0);
        expect((await iterator.next()).value?.data).toBe("1");
        await pauseConsumer();
        expect(pulls).toBe(1);
        expect((await iterator.next()).value?.data).toBe("2");
        await pauseConsumer();
        expect(pulls).toBe(2);
        expect((await iterator.next()).done).toBe(true);
        expect(pulls).toBe(3);
        expect(body.locked).toBe(false);
        expect(cancel).not.toHaveBeenCalled();
      } finally {
        await iterator.return?.();
        await stream[Symbol.asyncDispose]();
      }
    });

    it("allows return while the unrequested trailing input would stall", async () => {
      const pull = vi.fn((controller: ReadableStreamDefaultController<Uint8Array>) => {
        if (pull.mock.calls.length === 1) {
          controller.enqueue(new TextEncoder().encode("data: first\n\n"));
        }
      });
      const cancel = vi.fn();
      const body = new ReadableStream<Uint8Array>({ pull, cancel }, { highWaterMark: 0 });
      const stream = createSseStream(body);
      const iterator = stream[Symbol.asyncIterator]();
      try {
        expect((await iterator.next()).value?.data).toBe("first");
        await pauseConsumer();
        await iterator.return?.();
        expect(pull).toHaveBeenCalledOnce();
        expect(cancel).toHaveBeenCalledOnce();
        expect(body.locked).toBe(false);
      } finally {
        await stream[Symbol.asyncDispose]();
      }
    });

    it("settles a requested stalled read on cancellation", async () => {
      const pull = vi.fn();
      const cancel = vi.fn();
      const body = new ReadableStream<Uint8Array>({ pull, cancel }, { highWaterMark: 0 });
      const stream = createSseStream(body);
      const reader = stream.getReader();
      try {
        const read = reader.read();
        await vi.waitFor(() => expect(pull).toHaveBeenCalledOnce());
        await reader.cancel();
        await expect(read).resolves.toEqual({ done: true, value: undefined });
        expect(cancel).toHaveBeenCalledOnce();
        expect(body.locked).toBe(false);
      } finally {
        reader.releaseLock();
        await stream[Symbol.asyncDispose]();
      }
    });

    it("cancels an unread stream without pulling its body", async () => {
      const pull = vi.fn();
      const cancel = vi.fn();
      const body = new ReadableStream<Uint8Array>({ pull, cancel }, { highWaterMark: 0 });
      const stream = createSseStream(body);
      await pauseConsumer();
      await stream.cancel();
      expect(pull).not.toHaveBeenCalled();
      expect(cancel).toHaveBeenCalledOnce();
      expect(body.locked).toBe(false);
    });

    it.each(["terminal callback", "reconnecting"] as const)(
      "retains eager processing for an unread %s stream",
      async (mode) => {
        const cancel = vi.fn();
        const pull = vi.fn((controller: ReadableStreamDefaultController<Uint8Array>) => {
          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        });
        const body = new ReadableStream<Uint8Array>({ pull, cancel }, { highWaterMark: 0 });
        const isTerminalEvent = (event: { data: string }): boolean => event.data === "[DONE]";
        const stream =
          mode === "terminal callback"
            ? createSseStream(body, { isTerminalEvent })
            : await createReconnectingSseStream(
                async () => ({
                  status: 200,
                  headers: { "content-type": "text/event-stream" },
                  body,
                }),
                { isTerminalEvent },
              );
        try {
          await vi.waitFor(() => expect(cancel).toHaveBeenCalledOnce());
          expect(pull).toHaveBeenCalledOnce();
          expect(body.locked).toBe(false);
          const values: string[] = [];
          for await (const event of stream) {
            values.push(event.data);
          }
          expect(values).toEqual(["[DONE]"]);
        } finally {
          await stream[Symbol.asyncDispose]();
        }
      },
    );

    it("preserves a body cancellation error when the consumer returns", async () => {
      const failure = new Error("body cancellation failed");
      const cancel = vi.fn(() => Promise.reject(failure));
      const body = new ReadableStream<Uint8Array>(
        {
          pull(controller) {
            controller.enqueue(new TextEncoder().encode("data: first\n\n"));
          },
          cancel,
        },
        { highWaterMark: 0 },
      );
      const iterator = createSseStream(body)[Symbol.asyncIterator]();
      expect((await iterator.next()).value?.data).toBe("first");
      await expect(iterator.return?.()).rejects.toBe(failure);
      expect(cancel).toHaveBeenCalledOnce();
      expect(body.locked).toBe(false);
    });

    it.each(["source", "parser"] as const)(
      "preserves %s errors and releases the body reader",
      async (mode) => {
        const failure = new Error("body read failed");
        const cancel = vi.fn(() => Promise.reject(new Error("cleanup failed")));
        const body = new ReadableStream<Uint8Array>(
          {
            pull(controller) {
              if (mode === "source") {
                controller.error(failure);
              } else {
                controller.enqueue(new TextEncoder().encode("retry: 9007199254740992\n\n"));
              }
            },
            cancel,
          },
          { highWaterMark: 0 },
        );
        const stream = createSseStream(body);
        const reader = stream.getReader();
        try {
          if (mode === "parser") {
            await expect(reader.read()).rejects.toBeInstanceOf(RangeError);
          } else {
            await expect(reader.read()).rejects.toBe(failure);
          }
          expect(body.locked).toBe(false);
          expect(cancel).toHaveBeenCalledTimes(mode === "parser" ? 1 : 0);
        } finally {
          reader.releaseLock();
          await stream[Symbol.asyncDispose]();
        }
      },
    );
  });
}
