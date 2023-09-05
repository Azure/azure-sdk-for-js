// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PassThrough } from "stream";
import { EventMessage, iterateSseStream } from "../../src/index.js";

export function createStream(
  cb: (write: (chunk: Uint8Array) => void) => void
): AsyncIterable<EventMessage> {
  const stream = new PassThrough();
  cb((c) => stream.write(c));
  stream.end();
  return iterateSseStream(stream);
}
