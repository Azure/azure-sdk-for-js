// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { WebResourceLike } from "@azure/core-http-compat";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { AnonymousCredential, BlockBlobClient } from "../../src/index.js";

const BLOB_URL = "https://myaccount.blob.core.windows.net/mycontainer/blob";

interface SeenRequest {
  method: string;
  expect: string | undefined;
}

/**
 * Fake HTTP client that answers every request with an empty 201 instead of calling the service.
 * It keeps a copy of each request's method and `Expect` header as it was sent.
 */
function recordingHttpClient(): { httpClient: any; seen: SeenRequest[] } {
  const seen: SeenRequest[] = [];
  const httpClient = {
    sendRequest: async (request: WebResourceLike): Promise<any> => {
      seen.push({ method: request.method, expect: request.headers.get("expect") });
      return {
        request,
        status: 201,
        headers: toHttpHeadersLike(createHttpHeaders({ "content-length": "0" })),
        bodyAsText: "",
        parsedBody: "",
      };
    },
  };
  return { httpClient, seen };
}

describe("Expect: 100-continue in the browser", () => {
  it('never sends the header, even with mode "always"', async () => {
    const { httpClient, seen } = recordingHttpClient();
    const client = new BlockBlobClient(BLOB_URL, new AnonymousCredential(), {
      httpClient,
      request100ContinueOptions: { mode: "always" },
    });

    await client.upload("hello", 5);

    assert.deepStrictEqual(seen, [{ method: "PUT", expect: undefined }]);
  });
});
