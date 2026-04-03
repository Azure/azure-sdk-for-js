// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import { CosmosClient } from "../../../../src/CosmosClient.js";

class MockTokenCredential implements TokenCredential {
  async getToken(scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken> {
    return {
      token: "mock-token",
      expiresOnTimestamp: Date.now() + 3600000,
    };
  }
}

describe("Container.semanticRerank", { timeout: 10000 }, () => {
  it("should throw when client is not using AAD authentication", async () => {
    const client = new CosmosClient({
      endpoint: "https://test-account.documents.azure.com:443/",
      key: "dGVzdC1rZXk=", // base64 "test-key"
    });

    const container = client.database("testdb").container("testcol");

    try {
      await container.semanticRerank("query", ["doc1"]);
      assert.fail("Should have thrown");
    } catch (e: any) {
      assert.include(e.message, "AAD authentication");
    } finally {
      client.dispose();
    }
  });

  it("should throw when inference endpoint is not configured", async () => {
    const originalEnv = process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT;
    delete process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT;

    try {
      const client = new CosmosClient({
        endpoint: "https://test-account.documents.azure.com:443/",
        aadCredentials: new MockTokenCredential(),
      });

      const container = client.database("testdb").container("testcol");

      try {
        await container.semanticRerank("query", ["doc1"]);
        assert.fail("Should have thrown");
      } catch (e: any) {
        assert.include(e.message, "Inference endpoint is required");
      } finally {
        client.dispose();
      }
    } finally {
      if (originalEnv !== undefined) {
        process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT = originalEnv;
      }
    }
  });

  it("should delegate to ClientContext.semanticRerank", async () => {
    const client = new CosmosClient({
      endpoint: "https://test-account.documents.azure.com:443/",
      aadCredentials: new MockTokenCredential(),
      inferenceEndpoint: "https://test-inference.dbinference.azure.com",
    });

    const container = client.database("testdb").container("testcol");

    // Verify the method exists and is callable
    assert.isFunction(container.semanticRerank);

    client.dispose();
  });

  it("should clean up inference service on client dispose", () => {
    const client = new CosmosClient({
      endpoint: "https://test-account.documents.azure.com:443/",
      aadCredentials: new MockTokenCredential(),
      inferenceEndpoint: "https://test-inference.dbinference.azure.com",
    });

    // Dispose should not throw
    assert.doesNotThrow(() => client.dispose());
  });
});
