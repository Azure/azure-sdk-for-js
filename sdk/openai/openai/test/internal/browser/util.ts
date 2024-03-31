// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client, getClient } from "@azure-rest/core-client";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

export function createStream(cb: (write: (chunk: Uint8Array) => void) => void): ReadableStream {
  return new ReadableStream({
    start(controller) {
      cb((c) => controller.enqueue(c));
      controller.close();
    },
  });
}

export function createClient(cb: () => ReadableStream): Client {
  return getClient("https://example.org", {
    httpClient: {
      sendRequest: (request) =>
        Promise.resolve({
          request,
          status: 200,
          headers: createHttpHeaders(),
          browserStreamBody: cb(),
        }),
    },
  });
}
