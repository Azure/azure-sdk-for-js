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
 * A core-v1 style client, which is the shape `StoragePipelineOptions.httpClient` expects.
 * Snapshots each request, since the live object may be mutated after the response comes back.
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
    // Node rejects this, because it cannot derive the account name needed to sign. The browser
    // never signs — the session policy is a bearer passthrough — so the guard must not fire.
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
