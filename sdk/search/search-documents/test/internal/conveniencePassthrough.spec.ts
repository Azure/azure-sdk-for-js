// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assert, describe, it } from "vitest";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { AzureKeyCredential } from "../../src/index.js";
import { SearchIndexClient } from "../../src/searchIndexClient.js";

function captureClient(
  body: unknown,
  captured: PipelineRequest[],
  status = 200,
): SearchIndexClient {
  return new SearchIndexClient("https://example.search.windows.net", new AzureKeyCredential("k"), {
    additionalPolicies: [
      {
        position: "perCall",
        policy: {
          name: "capture",
          async sendRequest(request): Promise<PipelineResponse> {
            captured.push(request);
            return {
              request,
              status,
              headers: request.headers,
              bodyAsText: JSON.stringify(body),
            } as unknown as PipelineResponse;
          },
        },
      },
    ],
  });
}

describe("convenience layer carries generated fields", () => {
  it("forwards listing parameters to the request", async () => {
    const captured: PipelineRequest[] = [];
    const client = captureClient({ value: [] }, captured);

    for await (const _ of client.listIndexes({
      search: "prod",
      pageSize: 5,
      searchType: "prefix",
    })) {
      /* drain */
    }

    const url = captured[0].url;
    assert.include(url, "search=prod");
    assert.include(url, "pageSize=5");
    assert.include(url, "searchType=prefix");
  });

  it("round-trips resultsProcessing on a knowledge source", async () => {
    const captured: PipelineRequest[] = [];
    const client = captureClient(
      {
        name: "ks",
        kind: "searchIndex",
        resultsProcessing: "none",
        searchIndexParameters: { searchIndexName: "idx" },
      },
      captured,
      201,
    );

    const created = await client.createKnowledgeSource({
      name: "ks",
      kind: "searchIndex",
      resultsProcessing: "none",
      searchIndexParameters: { searchIndexName: "idx" },
    });

    assert.equal(JSON.parse(captured[0].body as string).resultsProcessing, "none");
    assert.equal(created.resultsProcessing, "none");
  });

  it("round-trips retrieveDefaults on a knowledge base", async () => {
    const captured: PipelineRequest[] = [];
    const retrieveDefaults = { maxOutputSizeInTokens: 4096 };
    const client = captureClient(
      { name: "kb", knowledgeSources: [], retrieveDefaults },
      captured,
      201,
    );

    const created = await client.createKnowledgeBase({
      name: "kb",
      knowledgeSources: [],
      retrieveDefaults,
    });

    assert.equal(
      JSON.parse(captured[0].body as string).retrieveDefaults.maxOutputSizeInTokens,
      4096,
    );
    assert.equal(created.retrieveDefaults?.maxOutputSizeInTokens, 4096);
  });

  it("round-trips workIQParameters on a WorkIQ knowledge source", async () => {
    const captured: PipelineRequest[] = [];
    const workIQParameters = {
      entraAppAuthentication: {
        applicationId: "app",
        federatedCredentialId: "cred",
        tenantId: "tenant",
      },
    };
    const client = captureClient({ name: "wiq", kind: "workIQ", workIQParameters }, captured, 201);

    const created = await client.createKnowledgeSource({
      name: "wiq",
      kind: "workIQ",
      workIQParameters,
    });

    assert.deepEqual(JSON.parse(captured[0].body as string).workIQParameters, workIQParameters);
    assert.deepEqual(
      (created as { workIQParameters?: unknown }).workIQParameters,
      workIQParameters,
    );
  });
});
