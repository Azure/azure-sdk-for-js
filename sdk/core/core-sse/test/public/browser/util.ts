// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type EventMessageStream, createSseStream } from "../../../src/index.js";

export function createStream(cb: (write: (chunk: Uint8Array) => void) => void): EventMessageStream {
  const stream = new ReadableStream({
    start(controller) {
      cb((c) => controller.enqueue(c));
      controller.close();
    },
  });
  return createSseStream(stream);
}
