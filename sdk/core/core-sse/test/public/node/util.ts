// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PassThrough } from "stream";
import { EventMessage, createSseStream } from "../../../src/index.js";

export function createStream(
  cb: (write: (chunk: Uint8Array) => void) => void,
): AsyncIterable<EventMessage> {
  const stream = new PassThrough();
  cb((c) => stream.write(c));
  stream.end();
  // This is a mock test that doesn't need a true IncomingMessage object
  return createSseStream(stream as any);
}
