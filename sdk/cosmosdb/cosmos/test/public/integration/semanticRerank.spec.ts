// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import { CosmosClient } from "../../../src/index.js";
import type { SemanticRerankResult } from "../../../src/index.js";
import { describe, it, assert, beforeAll, afterAll } from "vitest";

/**
 * Integration tests for the Semantic Rerank feature.
 *
 * These tests require:
 * 1. A Cosmos DB account with full-text search enabled (e.g. "inferencee2etest")
 * 2. A database "virtualstore" with container "sportinggoods" and sample documents
 * 3. An inference endpoint (e.g. "https://inferencee2etest.dbinference.azure.com")
 * 4. AAD credentials with access to both the Cosmos DB account and the inference service
 *
 * Environment variables:
 * - SEMANTIC_RERANK_ACCOUNT_ENDPOINT: Cosmos DB account endpoint
 *     (default: "https://inferencee2etest.documents.azure.com:443/")
 * - AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT: Inference service endpoint
 *     (default: "https://inferencee2etest.dbinference.azure.com")
 * - AZURE_TENANT_ID: Azure AD tenant ID (optional, for DefaultAzureCredential)
 */
describe("Semantic Rerank Integration", { timeout: 70000 }, () => {
  const accountEndpoint =
    process.env.SEMANTIC_RERANK_ACCOUNT_ENDPOINT ||
    "https://inferencee2etest.documents.azure.com:443/";
  const inferenceEndpoint =
    process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT ||
    "https://inferencee2etest.dbinference.azure.com";

  let client: CosmosClient;

  beforeAll(() => {
    const aadCredentials = new DefaultAzureCredential();
    client = new CosmosClient({
      endpoint: accountEndpoint,
      aadCredentials,
      inferenceEndpoint,
    });
  });

  afterAll(() => {
    client?.dispose();
  });

  it("should rerank full-text search results with scores, latency, and token usage", async () => {
    const db = client.database("virtualstore");
    const container = db.container("sportinggoods");

    // Step 1: Query documents using full-text search
    const searchText = "integrated pull-up bar";
    const queryString = `
      SELECT TOP 15 c.id, c.Name, c.Brand, c.Description
      FROM c
      WHERE FullTextContains(c.Description, "${searchText}")
      ORDER BY RANK FullTextScore(c.Description, "${searchText}")
    `;

    const queryIterator = container.items.query(queryString, {
      maxItemCount: 15,
    });

    const documents: string[] = [];
    while (queryIterator.hasMoreResults()) {
      const { resources } = await queryIterator.fetchNext();
      if (resources) {
        for (const item of resources) {
          documents.push(JSON.stringify(item));
        }
      }
    }

    assert.isAbove(documents.length, 0, "Should have documents from full-text search query");

    // Step 2: Rerank the documents using semantic reranker
    const rerankContext =
      "most economical with multiple pulley adjustmnets and ideal for home gyms";

    const result: SemanticRerankResult = await container.semanticRerank(rerankContext, documents, {
      returnDocuments: true,
      topK: 10,
      batchSize: 32,
      sort: true,
    });

    // Step 3: Verify the rerank result
    assert.isAbove(result.rerankScores.length, 0, "Should have rerank scores");
    assert.strictEqual(
      result.rerankScores[0].index,
      4,
      "First ranked result should have original index 4",
    );
    assert.isDefined(result.latency, "Latency should be present in the result");
    assert.isDefined(result.tokenUsage, "Token usage should be present in the result");
  });
});
