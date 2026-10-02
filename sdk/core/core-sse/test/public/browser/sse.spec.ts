// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { buildSseTests } from "../sse.js";
import { createStream } from "./util.js";
import { createSseStream } from "../../../src/index.js";
import { assert, it, vi } from "vitest";

buildSseTests("Browser", createStream);

it("cancels a live browser response even before its terminal event is read", async () => {
  let canceled = false;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
    },
    cancel() {
      canceled = true;
    },
  });
  const stream = createSseStream(body, { isTerminalEvent: (event) => event.data === "[DONE]" });
  await vi.waitFor(() => assert.isTrue(canceled));
  const reader = stream.getReader();

  assert.equal((await reader.read()).value?.data, "[DONE]");
  assert.isTrue((await reader.read()).done);
});
