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
 * 1. AAD credentials with access to the Cosmos DB inference service
 * 2. An inference endpoint registered for the Cosmos DB account
 *
 * Environment variables:
 * - SEMANTIC_RERANK_ACCOUNT_ENDPOINT: Cosmos DB account endpoint
 * - AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT: Inference service endpoint
 *     (e.g. "https://{account}.{region}.dbinference.azure.com")
 * - AZURE_TENANT_ID: Azure AD tenant ID (optional, for DefaultAzureCredential)
 *
 * For the full-text-search + rerank test, additionally:
 * - A database "virtualstore" with container "sportinggoods" and sample documents
 */
describe.only("SemanticRerankIntegration", { timeout: 70000 }, () => {
  const accountEndpoint =
    process.env.SEMANTIC_RERANK_ACCOUNT_ENDPOINT ||
    "https://semantic-reranker-test.documents.azure.com:443/";
  const inferenceEndpoint =
    process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT ||
    "https://semantic-reranker-test.eastus2.dbinference.azure.com";

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

  it("should rerank documents with scores, latency, and token usage", async () => {
    // Use a placeholder container — the inference service is container-agnostic,
    // it only needs the inference endpoint and AAD credentials.
    const container = client.database("testdb").container("testcol");

    const documents = [
      "Berlin is the capital of Germany.",
      "Paris is the capital of France.",
      "Madrid is the capital of Spain.",
    ];

    const rerankContext = "What is the capital of France?";

    const result: SemanticRerankResult = await container.semanticRerank(
      rerankContext,
      documents,
      {
        returnDocuments: true,
        topK: 10,
        batchSize: 32,
      },
    );

    // Verify scores are returned and correctly ordered
    assert.isAbove(result.rerankScores.length, 0, "Should have rerank scores");
    assert.isAtMost(result.rerankScores.length, 3, "Should have at most 3 scores");

    // The document about Paris/France should have the highest score
    const topScore = result.rerankScores[0];
    assert.equal(topScore.index, 1, "Paris document (index 1) should rank highest");
    assert.isAbove(topScore.score, 0.5, "Top score should be well above 0.5");
    assert.equal(topScore.document, "Paris is the capital of France.");

    // Verify all scores have required fields
    for (const score of result.rerankScores) {
      assert.isNumber(score.score, "Score should be a number");
      assert.isNumber(score.index, "Index should be a number");
      assert.isString(score.document, "Document should be a string when returnDocuments is true");
    }

    // Verify metadata
    assert.isDefined(result.latency, "Latency should be present in the result");
    assert.isDefined(result.tokenUsage, "Token usage should be present in the result");
    assert.isDefined(result.headers, "Headers should be present in the result");
  });

  it("should rerank without returning documents when returnDocuments is not set", async () => {
    const container = client.database("testdb").container("testcol");

    const documents = [
      "Berlin is the capital of Germany.",
      "Paris is the capital of France.",
    ];

    const result: SemanticRerankResult = await container.semanticRerank(
      "What is the capital of France?",
      documents,
    );

    assert.isAbove(result.rerankScores.length, 0, "Should have rerank scores");
    for (const score of result.rerankScores) {
      assert.isNumber(score.score, "Score should be a number");
      assert.isNumber(score.index, "Index should be a number");
    }
  });

  /**
   * Full end-to-end test: full-text search query from Cosmos DB + semantic reranking.
   * Requires: database "virtualstore", container "sportinggoods" with sample data,
   * and AAD credentials with data-plane access to the Cosmos DB account.
   * Set SEMANTIC_RERANK_ACCOUNT_ENDPOINT to a Cosmos DB account with this data.
   */
  it.skip("should rerank full-text search results from Cosmos DB", async () => {
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
    assert.isDefined(result.latency, "Latency should be present in the result");
    assert.isDefined(result.tokenUsage, "Token usage should be present in the result");
  });
});
