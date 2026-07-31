// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FeatureFlagClient } from "../../src/index.js";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { assert, describe, it } from "vitest";

describe("FeatureFlagClient", () => {
  it("supports primitive add and set overloads", async () => {
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
            name: isAdd ? "primitive-add" : "primitive-set",
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

    const added = await client.addFeatureFlag("primitive-add", true, "test-label");
    const set = await client.setFeatureFlag("primitive-set", false, "test-label");

    assert.equal(added.name, "primitive-add");
    assert.equal(added.enabled, true);
    assert.equal(set.name, "primitive-set");
    assert.equal(set.enabled, false);
    assert.include(requests[0].url, "/ff/primitive-add");
    assert.include(requests[0].url, "label=test-label");
    assert.equal(requests[0].headers.get("if-none-match"), "*");
    assert.include(requests[1].url, "/ff/primitive-set");
    assert.include(requests[1].url, "label=test-label");
  });

  it("sends accept-datetime and if-none-match on every revisions page request", async () => {
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
    const pageEtags = ["etag-1", "etag-2"];

    let pageNumber = 0;
    for await (const page of client
      .listFeatureFlagRevisions({ acceptDateTime, pageEtags })
      .byPage()) {
      pageNumber++;
      assert.equal(page.etag, `etag-${pageNumber}`);
    }

    assert.lengthOf(requests, 2);
    for (const [index, request] of requests.entries()) {
      assert.equal(request.headers.get("accept-datetime"), acceptDateTime.toISOString());
      assert.equal(request.headers.get("if-none-match"), `"${pageEtags[index]}"`);
    }
  });
});
