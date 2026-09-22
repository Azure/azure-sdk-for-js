// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { PipelineRequest, PipelineResponse, SendRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import {
  LAYOUT_ENDPOINT_HEADER,
  storageDataLocalityPolicy,
} from "../../src/policies/StorageDataLocalityPolicy.js";

const BLOB_URL = "https://myaccount.blob.core.windows.net/container/blob.txt?comp=x";

/** Runs one request through the policy and returns what the transport saw. */
async function route(url: string, layoutEndpoint?: string): Promise<PipelineRequest> {
  const headers = createHttpHeaders();
  if (layoutEndpoint) {
    headers.set(LAYOUT_ENDPOINT_HEADER, layoutEndpoint);
  }
  let sent: PipelineRequest | undefined;
  const next: SendRequest = async (request) => {
    sent = request;
    return { status: 200, headers: createHttpHeaders(), request } as PipelineResponse;
  };
  await storageDataLocalityPolicy().sendRequest(createPipelineRequest({ url, headers }), next);
  return sent!;
}

describe("storageDataLocalityPolicy", () => {
  it("connects to the layout endpoint while staying addressed to the account", async () => {
    const sent = await route(BLOB_URL, "https://blob.stamp.store.core.windows.net:443/");

    assert.equal(
      sent.url,
      "https://blob.stamp.store.core.windows.net/container/blob.txt?comp=x",
      "path and query must survive the host swap",
    );
    assert.equal(sent.headers.get("Host"), "myaccount.blob.core.windows.net");
  });

  it("carries a non-default port over to the request", async () => {
    const sent = await route(BLOB_URL, "https://blob.stamp.store.core.windows.net:8443/");

    assert.equal(new URL(sent.url).port, "8443");
    assert.equal(sent.headers.get("Host"), "myaccount.blob.core.windows.net");
  });

  it("preserves a non-default port already on the original request", async () => {
    const sent = await route(
      "https://myaccount.blob.core.windows.net:10000/container/blob.txt",
      "https://blob.stamp.store.core.windows.net:443/",
    );

    assert.equal(sent.headers.get("Host"), "myaccount.blob.core.windows.net:10000");
  });

  it("leaves requests without a layout endpoint untouched", async () => {
    const sent = await route(BLOB_URL);

    assert.equal(sent.url, BLOB_URL);
    assert.isUndefined(sent.headers.get("Host"));
  });

  // A malformed endpoint must cost the optimization, never the download.
  it.each(["not a url", "://missing-scheme", "", "blob.stamp.store.core.windows.net:443"])(
    "falls back to the account endpoint for unusable endpoint %o",
    async (endpoint) => {
      const sent = await route(BLOB_URL, endpoint);

      assert.equal(sent.url, BLOB_URL);
      assert.isUndefined(sent.headers.get("Host"));
    },
  );

  it("does not leak the internal header onto the wire", async () => {
    const sent = await route(BLOB_URL, "https://blob.stamp.store.core.windows.net:443/");

    assert.isUndefined(sent.headers.get(LAYOUT_ENDPOINT_HEADER));
  });

  it("stays routed and keeps the account Host when a retry re-enters the policy", async () => {
    const headers = createHttpHeaders();
    headers.set(LAYOUT_ENDPOINT_HEADER, "https://blob.stamp.store.core.windows.net:443/");
    const request = createPipelineRequest({ url: BLOB_URL, headers });
    const next: SendRequest = async (r) =>
      ({ status: 200, headers: createHttpHeaders(), request: r }) as PipelineResponse;
    const policy = storageDataLocalityPolicy();

    await policy.sendRequest(request, next);
    await policy.sendRequest(request, next);

    assert.equal(new URL(request.url).host, "blob.stamp.store.core.windows.net");
    assert.equal(
      request.headers.get("Host"),
      "myaccount.blob.core.windows.net",
      "a second pass must not re-capture the already-swapped host as the logical Host",
    );
  });
});
