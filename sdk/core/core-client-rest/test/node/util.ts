// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client, getClient } from "../../src";
import { PassThrough } from "stream";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

export function createStream(
  cb: (write: (chunk: Uint8Array) => void) => void
): NodeJS.ReadableStream {
  const stream = new PassThrough();
  cb((c) => stream.write(c));
  stream.end();
  return stream;
}

export function createClient(
  cb: () => NodeJS.ReadableStream,
  { status }: { status?: number } = {}
): Client {
  return getClient("https://example.org", {
    httpClient: {
      sendRequest: (request) =>
        Promise.resolve({
          request,
          status: status ?? 200,
          headers: createHttpHeaders(),
          readableStreamBody: cb(),
        }),
    },
  });
}
