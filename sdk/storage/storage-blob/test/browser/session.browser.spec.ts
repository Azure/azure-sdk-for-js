// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { AccessToken, TokenCredential } from "@azure/core-auth";
import type { WebResourceLike } from "@azure/core-http-compat";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { BlobClient } from "../../src/index.js";

const CUSTOM_DOMAIN = "https://storage.mycustomdomain.com/mycontainer/blob.txt";
const BLOB_URL = "https://myaccount.blob.core.windows.net/mycontainer/blob.txt";

const credential: TokenCredential = {
  getToken: async (): Promise<AccessToken> => ({
    token: "fake-bearer-token",
    expiresOnTimestamp: Date.now() + 3600 * 1000,
  }),
};

interface SeenRequest {
  url: string;
  authorization: string | undefined;
}

/**
 * Fake HTTP client that answers every request with an empty 200 instead of calling the service.
 * It keeps a copy of each request's URL and auth header as it was sent, because the SDK can
 * change the same request object afterwards.
 */
function recordingHttpClient(): { httpClient: any; seen: SeenRequest[] } {
  const seen: SeenRequest[] = [];
  const httpClient = {
    sendRequest: async (request: WebResourceLike): Promise<any> => {
      seen.push({ url: request.url, authorization: request.headers.get("authorization") });
      return {
        request,
        status: 200,
        headers: toHttpHeadersLike(createHttpHeaders({ "content-length": "0" })),
        bodyAsText: "",
        parsedBody: "",
      };
    },
  };
  return { httpClient, seen };
}

describe("session authentication in the browser", () => {
  it("accepts a custom endpoint with sessions enabled", () => {
    // On Node.js this throws, because a custom domain doesn't contain the account name (see
    // sessionWiring.spec.ts). The browser never uses sessions, so here it must not throw.
    assert.doesNotThrow(
      () => new BlobClient(CUSTOM_DOMAIN, credential, { sessionOptions: { mode: "enabled" } }),
    );
  });

  it("still signs with bearer and never calls Create Session when sessions are enabled", async () => {
    const { httpClient, seen } = recordingHttpClient();
    const client = new BlobClient(BLOB_URL, credential, {
      sessionOptions: { mode: "enabled" },
      httpClient,
    });

    // Only the outgoing request matters here; the fake response is too thin to deserialize.
    await client.download().catch(() => undefined);

    assert.isNotEmpty(seen, "the download must have reached the transport");
    for (const request of seen) {
      assert.notInclude(request.url, "comp=session", "the browser must never call Create Session");
      assert.strictEqual(
        request.authorization,
        "Bearer fake-bearer-token",
        `expected bearer authentication for ${request.url}`,
      );
    }
  });
});
