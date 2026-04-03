// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, beforeEach } from "vitest";
import type { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import type { HttpClient, PipelineResponse, SendRequest } from "@azure/core-rest-pipeline";
import { InferenceService } from "../../../../src/inference/InferenceService.js";
import type { CosmosClientOptions } from "../../../../src/CosmosClientOptions.js";

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
    inferenceEndpoint: "https://test-inference.dbinference.azure.com",
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
      const originalEnv = process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT;
      delete process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT;
      try {
        assert.throws(
          () =>
            new InferenceService({
              endpoint: "https://test.documents.azure.com",
              aadCredentials: new MockTokenCredential(),
            }),
          /Inference endpoint is required/,
        );
      } finally {
        if (originalEnv !== undefined) {
          process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT = originalEnv;
        }
      }
    });

    it("should succeed with valid AAD credentials and inference endpoint", () => {
      const service = new InferenceService(createMockOptions());
      assert.isDefined(service);
    });

    it("should read inference endpoint from environment variable as fallback", () => {
      const originalEnv = process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT;
      process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT =
        "https://env-inference.dbinference.azure.com";
      try {
        const service = new InferenceService({
          endpoint: "https://test.documents.azure.com",
          aadCredentials: new MockTokenCredential(),
        });
        assert.isDefined(service);
      } finally {
        if (originalEnv !== undefined) {
          process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT = originalEnv;
        } else {
          delete process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT;
        }
      }
    });

    it("should prefer client option over environment variable", () => {
      const originalEnv = process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT;
      process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT =
        "https://env-inference.dbinference.azure.com";
      try {
        // Should not throw - uses client option
        const service = new InferenceService(
          createMockOptions({
            inferenceEndpoint: "https://client-option-inference.dbinference.azure.com",
          }),
        );
        assert.isDefined(service);
      } finally {
        if (originalEnv !== undefined) {
          process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT = originalEnv;
        } else {
          delete process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT;
        }
      }
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
            { document: { id: "1", name: "Doc 1" }, score: 0.95, index: 0 },
            { document: { id: "2", name: "Doc 2" }, score: 0.8, index: 1 },
          ],
          latency: { total_ms: 100 },
          token_usage: { prompt_tokens: 50, total_tokens: 100 },
        }),
      };

      // Access private pipeline to mock sendRequest
      const pipeline = (service as any).pipeline;
      const originalSendRequest = pipeline.sendRequest.bind(pipeline);
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
      assert.deepEqual(result.rerankScores[0].document, { id: "1", name: "Doc 1" });
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
        returnDocuments: true,
        topK: 10,
        batchSize: 32,
        sort: true,
        additionalOptions: { custom_param: "value" },
      });

      const parsedBody = JSON.parse(capturedBody!);
      assert.equal(parsedBody.return_documents, true);
      assert.equal(parsedBody.top_k, 10);
      assert.equal(parsedBody.batch_size, 32);
      assert.equal(parsedBody.sort, true);
      assert.equal(parsedBody.custom_param, "value");
    });

    it("should throw on non-success HTTP status", async () => {
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
        assert.include(e.message, "status 500");
      }
    });

    it("should handle empty scores in response", async () => {
      const service = new InferenceService(createMockOptions());

      const pipeline = (service as any).pipeline;
      pipeline.sendRequest = async () => ({
        headers: { toJSON: () => ({}) } as any,
        request: {} as any,
        status: 200,
        bodyAsText: JSON.stringify({}),
      });

      const result = await service.semanticRerank("query", ["doc"]);
      assert.deepEqual(result.rerankScores, []);
      assert.isUndefined(result.latency);
      assert.isUndefined(result.tokenUsage);
    });

    it("should handle null document in score", async () => {
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
      assert.isNull(result.rerankScores[0].document);
      assert.equal(result.rerankScores[0].score, 0.9);
    });
  });
});
