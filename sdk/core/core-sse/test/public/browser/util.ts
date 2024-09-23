// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventMessage, createSseStream } from "../../../src/index.js";

export function createStream(
  cb: (write: (chunk: Uint8Array) => void) => void,
): AsyncIterable<EventMessage> {
  const stream = new ReadableStream({
    start(controller) {
      cb((c) => controller.enqueue(c));
      controller.close();
    },
  });
  return createSseStream(stream);
}
