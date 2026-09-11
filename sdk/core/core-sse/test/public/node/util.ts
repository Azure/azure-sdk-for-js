// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PassThrough } from "stream";
import { type EventMessageStream, createSseStream } from "../../../src/index.js";

export function createStream(cb: (write: (chunk: Uint8Array) => void) => void): EventMessageStream {
  const stream = new PassThrough();
  cb((c) => stream.write(c));
  stream.end();
  return createSseStream(stream);
}
