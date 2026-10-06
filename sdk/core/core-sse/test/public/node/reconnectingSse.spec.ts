// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { createReconnectingSseStream, type NodeJSReadableStream } from "../../../src/index.js";
import { expect, it, vi } from "vitest";
import { buildReconnectingSseTests } from "../reconnectingSse.js";

buildReconnectingSseTests("Node", ({ chunks = [], error, hang, onCancel, onEnqueueChunk }) => {
  let started = false;
  const stream = new Readable({
    read() {
      if (started) {
        return;
      }
      started = true;
      onEnqueueChunk?.((chunk) => this.push(chunk));
      for (const chunk of chunks) {
        this.push(chunk);
      }
      if (error) {
        this.destroy(error);
      } else if (!hang) {
        this.push(null);
      }
    },
  });
  stream.setEncoding("utf8");
  stream.once("close", onCancel ?? (() => {}));
  return stream as NodeJSReadableStream;
});

it("fails on invalid Node stream chunks without reconnecting", async () => {
  const connect = vi.fn(async () => ({
    body: Readable.from([42]),
    status: 200,
    headers: { "content-type": "text/event-stream" },
  }));
  const stream = await createReconnectingSseStream(connect, {
    retryDelayInMs: 0,
    maxRetries: 1,
  });

  await expect(stream.getReader().read()).rejects.toThrow(
    "Expected the SSE stream to contain Uint8Array or string chunks.",
  );
  expect(connect).toHaveBeenCalledTimes(1);
});
