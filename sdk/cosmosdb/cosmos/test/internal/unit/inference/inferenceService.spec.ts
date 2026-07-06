// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import type { HttpClient, PipelineResponse } from "@azure/core-rest-pipeline";
import { InferenceService } from "../../../../src/inference/InferenceService.js";
import type { CosmosClientOptions } from "../../../../src/CosmosClientOptions.js";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../../../../src/diagnostics/DiagnosticNodeInternal.js";
import { CosmosDbDiagnosticLevel } from "../../../../src/diagnostics/CosmosDbDiagnosticLevel.js";

class MockTokenCredential implements TokenCredential {
  async getToken(scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken> {
    return {
      token: "mock-token",
      expiresOnTimestamp: Date.now() + 3600000,
    };
  }
}

function createMockOptions(overrides?: Partial<CosmosClientOptions>): CosmosClientOptions {
  return {
    endpoint: "https://test-account.documents.azure.com:443/",
    aadCredentials: new MockTokenCredential(),
    enablePreviewFeatures: {
      semanticRerank: {
        inferenceEndpoint: "https://test-inference.dbinference.azure.com",
      },
    },
    ...overrides,
  };
}

describe("InferenceService", { timeout: 10000 }, () => {
  describe("constructor", () => {
    it("should throw when aadCredentials is not provided", () => {
      assert.throws(
        () => new InferenceService({ endpoint: "https://test.documents.azure.com" }),
        /AAD authentication/,
      );
    });

    it("should throw when no inference endpoint is configured", () => {
      assert.throws(
        () =>
          new InferenceService({
            endpoint: "https://test.documents.azure.com",
            aadCredentials: new MockTokenCredential(),
          }),
        /Inference endpoint is required/,
      );
    });

    it("should use inferenceEndpoint from enablePreviewFeatures", () => {
      const service = new InferenceService(
        createMockOptions({
          enablePreviewFeatures: {
            semanticRerank: {
              inferenceEndpoint: "https://options-inference.dbinference.azure.com",
            },
          },
        }),
      );
      const resolvedUrl = (service as any).inferenceEndpointUrl as string;
      assert.include(resolvedUrl, "options-inference");
    });

    it("should succeed with valid AAD credentials and inference endpoint", () => {
      const service = new InferenceService(createMockOptions());
      assert.isDefined(service);
    });
  });

  describe("semanticRerank", () => {
    it("should send correct payload with basic parameters", async () => {
      let capturedBody: string | undefined;

      const service = new InferenceService(createMockOptions());

      // Replace the pipeline's sendRequest to capture the request
      const mockResponse: PipelineResponse = {
        headers: {
          toJSON: () => ({ "x-ms-request-id": "test-id" }),
        } as any,
        request: {} as any,
        status: 200,
        bodyAsText: JSON.stringify({
          Scores: [
            { document: "Doc 1 content", score: 0.95, index: 0 },
            { document: "Doc 2 content", score: 0.8, index: 1 },
          ],
          latency: { total_ms: 100 },
          token_usage: { prompt_tokens: 50, total_tokens: 100 },
        }),
      };

      // Access private pipeline to mock sendRequest
      const pipeline = (service as any).pipeline;
      pipeline.sendRequest = async (client: HttpClient, request: any) => {
        capturedBody = request.body;
        return mockResponse;
      };

      const result = await service.semanticRerank("test query", ["doc1", "doc2"]);

      assert.isDefined(capturedBody);
      const parsedBody = JSON.parse(capturedBody!);
      assert.equal(parsedBody.query, "test query");
      assert.deepEqual(parsedBody.documents, ["doc1", "doc2"]);

      // Verify response parsing
      assert.equal(result.rerankScores.length, 2);
      assert.equal(result.rerankScores[0].score, 0.95);
      assert.equal(result.rerankScores[0].index, 0);
      assert.equal(result.rerankScores[0].document, "Doc 1 content");
      assert.equal(result.rerankScores[1].score, 0.8);
      assert.isDefined(result.latency);
      assert.isDefined(result.tokenUsage);
      assert.isDefined(result.headers);
    });

    it("should include optional parameters in payload", async () => {
      let capturedBody: string | undefined;

      const service = new InferenceService(createMockOptions());

      const pipeline = (service as any).pipeline;
      pipeline.sendRequest = async (_client: HttpClient, request: any) => {
        capturedBody = request.body;
        return {
          headers: { toJSON: () => ({}) } as any,
          request: {} as any,
          status: 200,
          bodyAsText: JSON.stringify({ Scores: [] }),
        };
      };

      await service.semanticRerank("test query", ["doc1"], {
        return_documents: true,
        top_k: 10,
        batch_size: 32,
        sort: true,
        custom_param: "value",
      });

      const parsedBody = JSON.parse(capturedBody!);
      assert.equal(parsedBody.return_documents, true);
      assert.equal(parsedBody.top_k, 10);
      assert.equal(parsedBody.batch_size, 32);
      assert.equal(parsedBody.sort, true);
      assert.equal(parsedBody.custom_param, "value");
    });

    it("should throw on non-success HTTP status with plain text body", async () => {
      const service = new InferenceService(createMockOptions());

      const pipeline = (service as any).pipeline;
      pipeline.sendRequest = async () => ({
        headers: { toJSON: () => ({}) } as any,
        request: {} as any,
        status: 500,
        bodyAsText: "Internal Server Error",
      });

      try {
        await service.semanticRerank("query", ["doc"]);
        assert.fail("Should have thrown");
      } catch (e: any) {
        assert.equal(e.code, 500);
        assert.equal(e.body.code, "500");
        assert.include(e.body.message, "Internal Server Error");
      }
    });

    it("should surface structured error payload from service", async () => {
      const service = new InferenceService(createMockOptions());

      const pipeline = (service as any).pipeline;
      pipeline.sendRequest = async () => ({
        headers: { toJSON: () => ({ "x-ms-request-id": "err-id" }) } as any,
        request: {} as any,
        status: 400,
        bodyAsText: JSON.stringify({
          code: "InvalidRequest",
          message: "Error while formatting json document for the target paths Tas.",
          details: null,
        }),
      });

      try {
        await service.semanticRerank("query", ["doc"]);
        assert.fail("Should have thrown");
      } catch (e: any) {
        // HTTP status on `code`; service error payload on `body`.
        assert.equal(e.code, 400);
        assert.equal(e.body.code, "InvalidRequest");
        assert.include(e.body.message, "Error while formatting json document");
        // Non-`code` fields are appended even when null.
        assert.include(e.body.message, "details: null");
        assert.isDefined(e.headers);
      }
    });

    it("should include document_type and target_paths in payload", async () => {
      let capturedBody: string | undefined;

      const service = new InferenceService(createMockOptions());

      const pipeline = (service as any).pipeline;
      pipeline.sendRequest = async (_client: HttpClient, request: any) => {
        capturedBody = request.body;
        return {
          headers: { toJSON: () => ({}) } as any,
          request: {} as any,
          status: 200,
          bodyAsText: JSON.stringify({ Scores: [] }),
        };
      };

      await service.semanticRerank("test query", ["doc1"], {
        document_type: "json",
        target_paths: "/name,/description",
      });

      const parsedBody = JSON.parse(capturedBody!);
      assert.equal(parsedBody.document_type, "json");
      assert.equal(parsedBody.target_paths, "/name,/description");
    });

    it("should throw when response has no Scores array", async () => {
      const service = new InferenceService(createMockOptions());

      const pipeline = (service as any).pipeline;
      pipeline.sendRequest = async () => ({
        headers: { toJSON: () => ({}) } as any,
        request: {} as any,
        status: 200,
        bodyAsText: JSON.stringify({}),
      });

      try {
        await service.semanticRerank("query", ["doc"]);
        assert.fail("Should have thrown");
      } catch (e: any) {
        assert.include(e.message, "Scores array");
      }
    });

    it("should default document to empty string when the field is null", async () => {
      const service = new InferenceService(createMockOptions());

      const pipeline = (service as any).pipeline;
      pipeline.sendRequest = async () => ({
        headers: { toJSON: () => ({}) } as any,
        request: {} as any,
        status: 200,
        bodyAsText: JSON.stringify({
          Scores: [{ document: null, score: 0.9, index: 0 }],
        }),
      });

      const result = await service.semanticRerank("query", ["doc"]);
      assert.equal(result.rerankScores.length, 1);
      assert.equal(result.rerankScores[0].document, "");
      assert.equal(result.rerankScores[0].score, 0.9);
    });

    it("should record an HTTP_REQUEST diagnostic child when a diagnostic node is provided", async () => {
      const service = new InferenceService(createMockOptions());

      const pipeline = (service as any).pipeline;
      pipeline.sendRequest = async () => ({
        headers: { toJSON: () => ({}) } as any,
        request: {} as any,
        status: 200,
        bodyAsText: JSON.stringify({ Scores: [] }),
      });

      const node = new DiagnosticNodeInternal(
        CosmosDbDiagnosticLevel.debug,
        DiagnosticNodeType.CLIENT_REQUEST_NODE,
        null as any,
      );

      await service.semanticRerank("query", ["doc"], undefined, node);

      assert.equal(node.children.length, 1);
      assert.equal(node.children[0].nodeType, DiagnosticNodeType.HTTP_REQUEST);
    });
  });
});
