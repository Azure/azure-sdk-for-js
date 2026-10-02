// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { buildSseTests } from "../sse.js";
import { createStream } from "./util.js";
import { createSseStream } from "../../../src/index.js";
import { PassThrough } from "node:stream";
import { assert, it, vi } from "vitest";

buildSseTests("Node", createStream);

it("cancels a live Node response even before its terminal event is read", async () => {
  const body = new PassThrough();
  body.write("data: [DONE]\n\n");
  const stream = createSseStream(body, { isTerminalEvent: (event) => event.data === "[DONE]" });
  await vi.waitFor(() => assert.isTrue(body.destroyed));
  const reader = stream.getReader();

  assert.equal((await reader.read()).value?.data, "[DONE]");
  assert.isTrue((await reader.read()).done);
});
