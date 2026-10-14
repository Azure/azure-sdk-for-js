// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createReconnectingSseStream, type SseConnectOptions } from "../../../src/index.js";
import { expect, it, vi } from "vitest";
import { buildReconnectingSseTests } from "../reconnectingSse.js";

buildReconnectingSseTests("Browser", ({ chunks = [], error, hang, onCancel, onEnqueueChunk }) => {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      onEnqueueChunk?.((chunk) => controller.enqueue(encoder.encode(chunk)));
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      if (error) {
        controller.error(error);
      } else if (!hang) {
        controller.close();
      }
    },
    cancel() {
      onCancel?.();
    },
  });
});

it.each(["abort", "cancel", "dispose"] as const)(
  "starts web body cancellation before immediately aborting on %s",
  async (mode) => {
    const aborter = new AbortController();
    const { promise: cancellationGate, resolve: finishCancellation } =
      Promise.withResolvers<void>();
    const abortedWhenCanceled: boolean[] = [];
    const bodies: ReadableStream<Uint8Array>[] = [];
    const connect = vi.fn(async ({ abortSignal }: SseConnectOptions) => {
      const body = new ReadableStream<Uint8Array>({
        cancel() {
          abortedWhenCanceled.push(abortSignal.aborted);
          return cancellationGate;
        },
      });
      bodies.push(body);
      return {
        status: 200,
        headers: { "content-type": "text/event-stream" },
        body,
      };
    });
    const stream = await createReconnectingSseStream(connect, {
      abortSignal: aborter.signal,
      retryDelayInMs: 0,
      maxRetries: 0,
    });
    const reader = stream.getReader();
    const read = reader.read();
    const result =
      mode === "abort"
        ? expect(read).rejects.toMatchObject({ name: "AbortError" })
        : expect(read).resolves.toMatchObject({ done: true });
    let cleanup: PromiseLike<void> | undefined;

    try {
      if (mode === "abort") {
        aborter.abort();
      } else if (mode === "cancel") {
        cleanup = reader.cancel();
      } else {
        cleanup = stream[Symbol.asyncDispose]();
      }
      expect(abortedWhenCanceled).toEqual([false]);
      expect(connect.mock.calls[0][0].abortSignal.aborted).toBe(true);
    } finally {
      finishCancellation();
      await cleanup;
      await result;
      reader.releaseLock();
    }
    expect(bodies[0].locked).toBe(false);
    expect(connect).toHaveBeenCalledOnce();
  },
);

it("preserves a validator error when its response reader remains locked", async () => {
  const expected = new Error("Validator rejected response body");
  await expect(
    createReconnectingSseStream(
      async () => ({
        body: new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("validation response"));
          },
        }),
      }),
      {
        validateResponse: async (response) => {
          const reader = (response.body as ReadableStream<Uint8Array>).getReader();
          await reader.read();
          throw expected;
        },
      },
    ),
  ).rejects.toBe(expected);
});

it("fails on invalid web stream chunks without reconnecting", async () => {
  const connect = vi.fn(async () => ({
    status: 200,
    headers: { "content-type": "text/event-stream" },
    body: new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(42 as unknown as Uint8Array);
      },
    }),
  }));
  const stream = await createReconnectingSseStream(connect, {
    retryDelayInMs: 0,
    maxRetries: 1,
  });

  await expect(stream.getReader().read()).rejects.toThrow(
    "Expected the SSE stream to contain Uint8Array chunks.",
  );
  expect(connect).toHaveBeenCalledTimes(1);
});
