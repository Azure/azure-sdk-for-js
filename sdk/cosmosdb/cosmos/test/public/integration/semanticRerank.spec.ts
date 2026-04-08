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
describe("SemanticRerankIntegration", { timeout: 120000 }, () => {
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
   * Full end-to-end test: inserts sample documents into a pre-existing database and container
   * with full-text search enabled, runs a full-text search query, then reranks the results
   * using the inference service. Cleans up inserted items at the end.
   *
   * Prerequisite: database "rerank-test" with container "products" (partitioned by /category,
   * fullTextPolicy on /description) must exist on the Cosmos DB account. These are created
   * via ARM management plane since Cosmos DB data-plane RBAC does not support database/container
   * creation.
   */
  it("should rerank full-text search results from Cosmos DB", async () => {
    const container = client.database("rerank-test").container("products");

    // Step 1: Insert sample sporting goods documents
    const sampleItems = [
      {
        id: "sr-1",
        category: "fitness",
        name: "ProFit Power Tower",
        description:
          "Professional power tower with integrated pull-up bar, dip station, and vertical knee raise. Heavy-duty steel frame supports up to 300 lbs. Multiple grip positions for varied workouts. Ideal for home gyms with limited space.",
      },
      {
        id: "sr-2",
        category: "fitness",
        name: "FlexForce Cable Machine",
        description:
          "Compact cable crossover machine with multiple pulley adjustments. Features 200 lb weight stack and smooth motion guide rods. Perfect for strength training exercises including chest flys, lat pulldowns, and cable rows.",
      },
      {
        id: "sr-3",
        category: "fitness",
        name: "IronGrip Adjustable Dumbbells",
        description:
          "Quick-change adjustable dumbbell set ranging from 5 to 52.5 lbs per hand. Replaces 15 sets of weights. Space-saving design with durable steel construction and comfortable grip.",
      },
      {
        id: "sr-4",
        category: "fitness",
        name: "EnduraRun Treadmill",
        description:
          "Folding treadmill with cushioned running deck and 12 incline levels. Built-in heart rate monitor and Bluetooth speaker. Supports speeds up to 12 mph. Compact folding design for apartment living.",
      },
      {
        id: "sr-5",
        category: "fitness",
        name: "BudgetFlex Home Gym",
        description:
          "Most economical home gym system with integrated pull-up bar and multiple pulley adjustments. Affordable yet sturdy construction ideal for home gyms. Includes leg press attachment and preacher curl pad.",
      },
      {
        id: "sr-6",
        category: "outdoor",
        name: "TrailBlazer Hiking Backpack",
        description:
          "Lightweight 50L hiking backpack with waterproof rain cover. Ergonomic back panel with breathable mesh. Multiple compartments and hydration bladder compatible. Perfect for multi-day backpacking trips.",
      },
      {
        id: "sr-7",
        category: "outdoor",
        name: "Summit Pro Climbing Harness",
        description:
          "UIAA-certified climbing harness with adjustable leg loops and gear loops. Lightweight design at only 350g. Padded waistbelt for comfort on long routes. Compatible with all standard carabiners.",
      },
      {
        id: "sr-8",
        category: "fitness",
        name: "UltraFlex Resistance Bands",
        description:
          "Set of 5 premium latex resistance bands with varying tension levels. Includes door anchor, ankle straps, and carrying bag. Great for physical therapy, stretching, and home workouts.",
      },
    ];

    try {
      for (const item of sampleItems) {
        await container.items.upsert(item);
      }

      // Wait for the full-text index to build on newly inserted documents
      await new Promise((resolve) => setTimeout(resolve, 10000));

      // Step 2: Query documents using full-text search
      const searchText = "pull-up bar home gym";
      const queryString = `
        SELECT TOP 10 c.id, c.name, c.description
        FROM c
        WHERE FullTextContains(c.description, '${searchText}')
        ORDER BY RANK FullTextScore(c.description, '${searchText}')
      `;

      const queryIterator = container.items.query(queryString, {
        maxItemCount: 10,
        forceQueryPlan: true,
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

      // Step 3: Rerank the FTS results using semantic reranker
      const rerankContext =
        "most economical with multiple pulley adjustments and ideal for home gyms";

      const result: SemanticRerankResult = await container.semanticRerank(
        rerankContext,
        documents,
        {
          returnDocuments: true,
          topK: 10,
          batchSize: 32,
        },
      );

      // Step 4: Verify the rerank result
      assert.isAbove(result.rerankScores.length, 0, "Should have rerank scores");
      assert.isDefined(result.latency, "Latency should be present");
      assert.isDefined(result.tokenUsage, "Token usage should be present");

      // The BudgetFlex Home Gym (id: "sr-5") should rank highest since its description
      // directly matches the rerank context about "most economical" and "pulley adjustments"
      const topDoc = result.rerankScores[0];
      assert.isNotNull(topDoc.document, "Top document should be returned");
      assert.include(
        topDoc.document!,
        "economical",
        "Top result should be the most relevant to the rerank context",
      );
    } finally {
      // Clean up: delete inserted items
      for (const item of sampleItems) {
        try {
          await container.item(item.id, item.category).delete();
        } catch {
          // Ignore cleanup errors
        }
      }
    }
  });
});
