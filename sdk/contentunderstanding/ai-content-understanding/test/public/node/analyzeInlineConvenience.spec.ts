// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Hermetic tests for the inline analyze convenience wrappers.
 *
 * The service returns HTTP 200 even when the inline `OperationState` ends in
 * `Failed`/`Canceled`. The JS convenience methods (`analyzeInline`,
 * `analyzeBinaryInline`) must fail-fast with a `RestError` (code
 * `InlineAnalyzeOperationFailed`) rather than silently returning a partial
 * `AnalysisResult`. On `Succeeded`, they must unwrap the envelope and return
 * the `AnalysisResult` directly.
 *
 * The JS SDK ships a single async API surface (no sync/async twin), so the four
 * inline convenience methods (`analyze`, `analyzeBinary`, `analyzeInline`,
 * `analyzeBinaryInline`) each get one assertion covering their end-to-end wire
 * routing and result shape.
 */

import { describe, it, assert } from "vitest";
import { AzureKeyCredential } from "@azure/core-auth";
import { RestError } from "@azure/core-rest-pipeline";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { ContentUnderstandingClient, KnownVersions } from "../../../src/index.js";

const FAILED_INLINE_BODY = JSON.stringify({
  status: "Failed",
  error: {
    code: "InternalServerError",
    message: "An unexpected error occurred.",
  },
});

const SUCCEEDED_INLINE_BODY = JSON.stringify({
  status: "Succeeded",
  result: {
    analyzerId: "prebuilt-layout",
    apiVersion: "2026-06-01-preview",
    createdAt: "2026-07-29T00:00:00Z",
    contents: [
      {
        kind: "document",
        markdown: "# Invoice",
        startPageNumber: 1,
        endPageNumber: 1,
      },
    ],
  },
});

/**
 * Stubs an `HttpClient` that always returns HTTP 200 with the given body and
 * records the requests it received.
 */
function createStubHttpClient(bodyAsText: string): {
  httpClient: HttpClient;
  requests: PipelineRequest[];
} {
  const requests: PipelineRequest[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      requests.push(request);
      return {
        request,
        status: 200,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText,
      };
    },
  };
  return { httpClient, requests };
}

function createClientWithStub(bodyAsText: string): {
  client: ContentUnderstandingClient;
  requests: PipelineRequest[];
} {
  const { httpClient, requests } = createStubHttpClient(bodyAsText);
  const client = new ContentUnderstandingClient(
    "https://example.services.ai.azure.com",
    new AzureKeyCredential("fake-key"),
    {
      apiVersion: KnownVersions.V20260601Preview,
      httpClient,
    },
  );
  return { client, requests };
}

describe("Inline analyze convenience methods", () => {
  it("analyzeInline throws RestError when OperationState is Failed", async () => {
    const { client, requests } = createClientWithStub(FAILED_INLINE_BODY);

    let caught: RestError | undefined;
    try {
      await client.analyzeInline("prebuilt-layout", [{ url: "https://example.com/doc.pdf" }]);
    } catch (err) {
      if (err instanceof RestError) {
        caught = err;
      } else {
        throw err;
      }
    }

    assert.ok(caught, "analyzeInline should throw when OperationState is not Succeeded");
    assert.equal(
      caught?.code,
      "InlineAnalyzeOperationFailed",
      "the inline convenience wrapper must surface a well-known error code",
    );
    assert.equal(requests.length, 1, "Exactly one HTTP request should have been made");
  });

  it("analyzeBinaryInline throws RestError when OperationState is Failed", async () => {
    const { client, requests } = createClientWithStub(FAILED_INLINE_BODY);

    let caught: RestError | undefined;
    try {
      await client.analyzeBinaryInline("prebuilt-layout", new Uint8Array([1, 2, 3]), {
        contentType: "application/pdf",
      });
    } catch (err) {
      if (err instanceof RestError) {
        caught = err;
      } else {
        throw err;
      }
    }

    assert.ok(caught, "analyzeBinaryInline should throw when OperationState is not Succeeded");
    assert.equal(caught?.code, "InlineAnalyzeOperationFailed");
    assert.equal(requests.length, 1);
  });

  it("analyzeInline returns unwrapped AnalysisResult when OperationState is Succeeded", async () => {
    const { client, requests } = createClientWithStub(SUCCEEDED_INLINE_BODY);

    const result = await client.analyzeInline("prebuilt-layout", [
      { url: "https://example.com/doc.pdf" },
    ]);

    assert.ok(result, "Succeeded state should return a non-null AnalysisResult");
    assert.equal(
      result.analyzerId,
      "prebuilt-layout",
      "the inline convenience wrapper must unwrap the envelope so callers see AnalysisResult directly",
    );
    assert.equal(result.contents?.length, 1, "Content array should survive unwrap");
    assert.equal(requests.length, 1);
  });

  it("analyzeBinaryInline returns unwrapped AnalysisResult when OperationState is Succeeded", async () => {
    const { client, requests } = createClientWithStub(SUCCEEDED_INLINE_BODY);

    const result = await client.analyzeBinaryInline("prebuilt-layout", new Uint8Array([1, 2, 3]), {
      contentType: "application/pdf",
    });

    assert.ok(result);
    assert.equal(result.analyzerId, "prebuilt-layout");
    assert.equal(result.contents?.length, 1);
    assert.equal(requests.length, 1);
  });
});
