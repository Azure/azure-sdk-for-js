// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FeatureFlagClient } from "../../src/index.js";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { assert, describe, it } from "vitest";

describe("FeatureFlagClient", () => {
  it("uses the feature flag identity for get and delete requests", async () => {
    const requests: PipelineRequest[] = [];
    const mockHttpClient: HttpClient = {
      sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
        requests.push(request);
        return {
          request,
          status: requests.length === 1 ? 200 : 204,
          headers: createHttpHeaders(),
          bodyAsText:
            requests.length === 1
              ? JSON.stringify({ name: "identity-flag?suffix", enabled: true, label: "test-label" })
              : undefined,
        };
      },
    };
    const client = new FeatureFlagClient(
      "https://example.azconfig.io",
      {
        getToken: async () => ({ token: "token", expiresOnTimestamp: Date.now() + 60_000 }),
      },
      { httpClient: mockHttpClient },
    );
    const id = { name: "identity-flag?suffix", label: "test-label", etag: '"identity-etag"' };

    await client.getFeatureFlag(id, { onlyIfChanged: true });
    await client.deleteFeatureFlag(id, { onlyIfUnchanged: true });

    assert.include(requests[0].url, "/ff/identity-flag%3Fsuffix");
    assert.include(requests[0].url, "label=test-label");
    assert.equal(requests[0].headers.get("if-none-match"), '"identity-etag"');
    assert.include(requests[1].url, "/ff/identity-flag%3Fsuffix");
    assert.include(requests[1].url, "label=test-label");
    assert.equal(requests[1].headers.get("if-match"), '"identity-etag"');
  });

  it("supports object add and set parameters", async () => {
    const requests: PipelineRequest[] = [];
    const mockHttpClient: HttpClient = {
      sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
        requests.push(request);
        const isAdd = requests.length === 1;
        return {
          request,
          status: 200,
          headers: createHttpHeaders(),
          bodyAsText: JSON.stringify({
            name: isAdd ? "primitive-add?suffix" : "primitive-set?suffix",
            enabled: isAdd,
            label: "test-label",
          }),
        };
      },
    };
    const client = new FeatureFlagClient(
      "https://example.azconfig.io",
      {
        getToken: async () => ({ token: "token", expiresOnTimestamp: Date.now() + 60_000 }),
      },
      { httpClient: mockHttpClient },
    );

    const added = await client.addFeatureFlag({
      name: "primitive-add?suffix",
      enabled: true,
      label: "test-label",
    });
    const set = await client.setFeatureFlag({
      name: "primitive-set?suffix",
      enabled: false,
      label: "test-label",
    });

    assert.equal(added.name, "primitive-add?suffix");
    assert.equal(added.enabled, true);
    assert.equal(set.name, "primitive-set?suffix");
    assert.equal(set.enabled, false);
    assert.include(requests[0].url, "/ff/primitive-add%3Fsuffix");
    assert.include(requests[0].url, "label=test-label");
    assert.equal(requests[0].headers.get("if-none-match"), "*");
    assert.include(requests[1].url, "/ff/primitive-set%3Fsuffix");
    assert.include(requests[1].url, "label=test-label");
  });

  it("sends accept-datetime on every revisions page request", async () => {
    const requests: PipelineRequest[] = [];
    const mockHttpClient: HttpClient = {
      sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
        requests.push(request);
        const nextLink =
          requests.length === 1
            ? "https://example.azconfig.io/ff-revisions?api-version=2026-05-01-preview&after=next"
            : undefined;
        return {
          request,
          status: 200,
          headers: createHttpHeaders(),
          bodyAsText: JSON.stringify({
            items: [],
            etag: `etag-${requests.length}`,
            "@nextLink": nextLink,
          }),
        };
      },
    };
    const client = new FeatureFlagClient(
      "https://example.azconfig.io",
      {
        getToken: async () => ({ token: "token", expiresOnTimestamp: Date.now() + 60_000 }),
      },
      { httpClient: mockHttpClient },
    );
    const acceptDateTime = new Date("2026-07-31T12:34:56.000Z");

    let pageCount = 0;
    for await (const _page of client.listFeatureFlagRevisions({ acceptDateTime }).byPage()) {
      pageCount++;
    }

    assert.equal(pageCount, 2);
    assert.lengthOf(requests, 2);
    for (const request of requests) {
      assert.equal(request.headers.get("accept-datetime"), acceptDateTime.toISOString());
      assert.isUndefined(request.headers.get("if-none-match"));
    }
  });

  it("URL-encodes feature flag list filters", async () => {
    const requests: PipelineRequest[] = [];
    const mockHttpClient: HttpClient = {
      sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
        requests.push(request);
        return {
          request,
          status: 200,
          headers: createHttpHeaders(),
          bodyAsText: JSON.stringify({ items: [] }),
        };
      },
    };
    const client = new FeatureFlagClient(
      "https://example.azconfig.io",
      {
        getToken: async () => ({ token: "token", expiresOnTimestamp: Date.now() + 60_000 }),
      },
      { httpClient: mockHttpClient },
    );
    const tagsFilter = ["tier=beta & canary"];
    const nameFilter = "flag?name";
    const labelFilter = "label&value";

    for await (const _page of client
      .listFeatureFlags({ tagsFilter, nameFilter, labelFilter })
      .byPage()) {
      // Iterate to send the request.
    }
    for await (const _page of client
      .listFeatureFlagRevisions({ tagsFilter, nameFilter, labelFilter })
      .byPage()) {
      // Iterate to send the request.
    }

    assert.lengthOf(requests, 2);
    for (const request of requests) {
      assert.include(request.url, "tags=tier%3Dbeta%20%26%20canary");
      assert.include(request.url, "name=flag%3Fname");
      assert.include(request.url, "label=label%26value");
    }
  });
});
