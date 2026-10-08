// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createReconnectingSseStream } from "../../../src/index.js";
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
