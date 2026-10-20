// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { AzureKeyCredential } from "@azure/core-auth";
import type { HttpClient, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, RestError } from "@azure/core-rest-pipeline";
import { KnowledgeRetrievalClient } from "../../src/knowledgeRetrievalClient.js";
import { SearchClient } from "../../src/searchClient.js";
import { SearchIndexClient } from "../../src/searchIndexClient.js";
import { SearchIndexerClient } from "../../src/searchIndexerClient.js";

const endpoint = "https://example.search.windows.net";
const credential = new AzureKeyCredential("key");
const serviceError = { code: "NotFound", message: "Resource not found" };
const emptyError = {
  message: "Unexpected status code: 404",
  code: undefined,
  details: undefined,
};

describe.each([
  { name: "missing", bodyAsText: undefined, expectedError: emptyError },
  { name: "empty", bodyAsText: "", expectedError: emptyError },
  { name: "null", bodyAsText: "null", expectedError: emptyError },
  {
    name: "structured",
    bodyAsText: JSON.stringify({ error: serviceError }),
    expectedError: { ...serviceError, details: { error: serviceError } },
  },
])("service errors with $name response bodies", ({ bodyAsText, expectedError }) => {
  it.each([
    {
      name: "document lookup",
      run: (httpClient: HttpClient) =>
        new SearchClient(endpoint, "idx", credential, { httpClient }).getDocument("missing"),
    },
    {
      name: "index lookup",
      run: (httpClient: HttpClient) =>
        new SearchIndexClient(endpoint, credential, { httpClient }).getIndex("missing"),
    },
    {
      name: "indexer lookup",
      run: (httpClient: HttpClient) =>
        new SearchIndexerClient(endpoint, credential, { httpClient }).getIndexer("missing"),
    },
    {
      name: "knowledge retrieval",
      run: (httpClient: HttpClient) =>
        new KnowledgeRetrievalClient(endpoint, "base", credential, { httpClient }).retrieve({
          intents: [{ type: "semantic", search: "hotel" }],
        }),
    },
  ])("$name preserves the RestError and HTTP status", async ({ run }) => {
    const httpClient: HttpClient = {
      async sendRequest(request): Promise<PipelineResponse> {
        return {
          request,
          status: 404,
          headers: createHttpHeaders({ "content-type": "application/json" }),
          bodyAsText,
        };
      },
    };

    const result = run(httpClient);

    await expect(result).rejects.toBeInstanceOf(RestError);
    await expect(result).rejects.toMatchObject({
      ...expectedError,
      statusCode: 404,
      response: { status: 404 },
    });
  });
});
