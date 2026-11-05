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

it("cancels an unread Azure Search response.completed event", async () => {
  let canceled = false;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        new TextEncoder().encode(
          'event: response.completed\ndata: {"statusCode":200,"response":{}}\n\n',
        ),
      );
    },
    cancel() {
      canceled = true;
    },
  });
  const stream = createSseStream(body, {
    isTerminalEvent: (event) => event.event === "response.completed" || event.event === "error",
  });

  await vi.waitFor(() => assert.isTrue(canceled));
  const reader = stream.getReader();
  const { value } = await reader.read();
  assert.isDefined(value);
  assert.equal(value?.event, "response.completed");
  assert.deepEqual(JSON.parse(value.data), { statusCode: 200, response: {} });
  assert.isTrue((await reader.read()).done);
});
