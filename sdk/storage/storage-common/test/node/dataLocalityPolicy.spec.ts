// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import type * as CoreUtil from "@azure/core-util";
import type {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import {
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import {
  LAYOUT_ENDPOINT_HEADER,
  storageDataLocalityPolicy,
} from "../../src/policies/StorageDataLocalityPolicy.js";
import { storageRetryPolicy } from "../../src/policies/StorageRetryPolicyV2.js";

const platform = vi.hoisted(() => ({ isNodeLike: true }));
vi.mock("@azure/core-util", async (importOriginal) => ({
  ...(await importOriginal<typeof CoreUtil>()),
  get isNodeLike() {
    return platform.isNodeLike;
  },
}));

const BLOB_URL = "https://myaccount.blob.core.windows.net/container/blob.txt?comp=x";

/** What the transport received. The policy restores the request once the attempt is over. */
interface Sent {
  url: string;
  host?: string;
  layoutHeader?: string;
}

function snapshot(request: PipelineRequest): Sent {
  return {
    url: request.url,
    host: request.headers.get("Host"),
    layoutHeader: request.headers.get(LAYOUT_ENDPOINT_HEADER),
  };
}

/** Runs one request through the policy and returns what the transport saw. */
async function route(url: string, layoutEndpoint?: string): Promise<Sent> {
  const headers = createHttpHeaders();
  if (layoutEndpoint) {
    headers.set(LAYOUT_ENDPOINT_HEADER, layoutEndpoint);
  }
  let sent: Sent | undefined;
  const next: SendRequest = async (request) => {
    sent = snapshot(request);
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
    assert.equal(sent.host, "myaccount.blob.core.windows.net");
  });

  it("carries a non-default port over to the request", async () => {
    const sent = await route(BLOB_URL, "https://blob.stamp.store.core.windows.net:8443/");

    assert.equal(new URL(sent.url).port, "8443");
    assert.equal(sent.host, "myaccount.blob.core.windows.net");
  });

  it("preserves a non-default port already on the original request", async () => {
    const sent = await route(
      "https://myaccount.blob.core.windows.net:10000/container/blob.txt",
      "https://blob.stamp.store.core.windows.net:443/",
    );

    assert.equal(sent.host, "myaccount.blob.core.windows.net:10000");
  });

  it("leaves requests without a layout endpoint untouched", async () => {
    const sent = await route(BLOB_URL);

    assert.equal(sent.url, BLOB_URL);
    assert.isUndefined(sent.host);
  });

  // The live service sends an absolute URI, but the REST spec documents a bare `hostname:port`.
  it.each([
    "https://blob.stamp.store.core.windows.net:8443/",
    "blob.stamp.store.core.windows.net:8443",
  ])("routes endpoint %o", async (endpoint) => {
    const sent = await route(BLOB_URL, endpoint);

    assert.equal(
      sent.url,
      "https://blob.stamp.store.core.windows.net:8443/container/blob.txt?comp=x",
    );
    assert.equal(sent.host, "myaccount.blob.core.windows.net");
  });

  // A malformed endpoint must cost the optimization, never the download.
  it.each(["not a url", "://missing-scheme", ""])(
    "falls back to the account endpoint for unusable endpoint %o",
    async (endpoint) => {
      const sent = await route(BLOB_URL, endpoint);

      assert.equal(sent.url, BLOB_URL);
      assert.isUndefined(sent.host);
    },
  );

  it("does not leak the internal header onto the wire", async () => {
    const sent = await route(BLOB_URL, "https://blob.stamp.store.core.windows.net:443/");

    assert.isUndefined(sent.layoutHeader);
  });

  it("ignores the endpoint outside Node.js, which cannot set Host", async () => {
    platform.isNodeLike = false;
    try {
      const sent = await route(BLOB_URL, "https://blob.stamp.store.core.windows.net:443/");

      assert.equal(sent.url, BLOB_URL);
      assert.isUndefined(sent.host);
      assert.isUndefined(sent.layoutHeader, "the header must not reach a CORS preflight");
    } finally {
      platform.isNodeLike = true;
    }
  });
});

describe("storageDataLocalityPolicy under storageRetryPolicy", () => {
  /** Sends a routed request whose first attempt fails with 503, and returns every attempt. */
  async function sendRetried(secondaryHost?: string): Promise<Sent[]> {
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(
      storageRetryPolicy({ maxTries: 2, retryDelayInMs: 1, maxRetryDelayInMs: 1, secondaryHost }),
      { phase: "Retry" },
    );
    pipeline.addPolicy(storageDataLocalityPolicy(), { afterPhase: "Sign" });

    const attempts: Sent[] = [];
    const httpClient: HttpClient = {
      async sendRequest(request) {
        attempts.push(snapshot(request));
        return { status: attempts.length === 1 ? 503 : 200, headers: createHttpHeaders(), request };
      },
    };
    const headers = createHttpHeaders();
    headers.set(LAYOUT_ENDPOINT_HEADER, "https://blob.stamp.store.core.windows.net:443/");
    await pipeline.sendRequest(httpClient, createPipelineRequest({ url: BLOB_URL, headers }));
    return attempts;
  }

  // The retry policy resets the URL before every attempt.
  it("routes a retried attempt again", async () => {
    const attempts = await sendRetried();

    assert.lengthOf(attempts, 2);
    for (const attempt of attempts) {
      assert.equal(new URL(attempt.url).host, "blob.stamp.store.core.windows.net");
      assert.equal(attempt.host, "myaccount.blob.core.windows.net");
      assert.isUndefined(attempt.layoutHeader);
    }
  });

  it("sends a secondary retry to the secondary without the primary Host", async () => {
    const attempts = await sendRetried("myaccount-secondary.blob.core.windows.net");

    assert.lengthOf(attempts, 2);
    assert.equal(new URL(attempts[0].url).host, "blob.stamp.store.core.windows.net");
    assert.equal(new URL(attempts[1].url).host, "myaccount-secondary.blob.core.windows.net");
    assert.isUndefined(attempts[1].host);
  });
});
