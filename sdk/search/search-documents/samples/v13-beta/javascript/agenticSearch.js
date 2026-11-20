// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Run direct agentic search with reasoning-token diagnostics, then reuse the
 * index through a Microsoft Retriever 1 knowledge base. No external chat deployment is needed.
 *
 * Set ENDPOINT. Authenticate with DefaultAzureCredential or AZURE_SEARCH_API_KEY.
 * Requires semantic ranker and standard (paid) Knowledge Retrieval on the Search service;
 * Microsoft Retriever 1 has no free tier. The sample does not change service billing settings.
 * Creates and removes a uniquely named index, source, and knowledge base.
 */

const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");
const { delay } = require("@azure/core-util");
const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential, SearchIndexClient } = require("@azure/search-documents");
const { SearchClient: ProtocolSearchClient } = require("@azure/search-documents/search");
const { SearchIndexClient: ProtocolIndexClient } = require("@azure/search-documents/searchIndex");
require("dotenv/config");

async function main() {
  const endpoint = process.env.ENDPOINT;
  assert(endpoint, "Set ENDPOINT.");
  const credential = process.env.AZURE_SEARCH_API_KEY
    ? new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY)
    : new DefaultAzureCredential();
  const options = { serviceVersion: "2026-11-01-preview" };
  const protocolOptions = { apiVersion: options.serviceVersion };
  const client = new SearchIndexClient(endpoint, credential, options);
  const indexName = `sample-agentic-${randomUUID()}`;
  const sourceName = `ks-${indexName}`;
  const baseName = `kb-${indexName}`;
  const cleanup = [];
  try {
    await client.createIndex({
      name: indexName,
      fields: [
        { name: "id", type: "Edm.String", key: true },
        { name: "content", type: "Edm.String", searchable: true },
      ],
      semanticSearch: {
        defaultConfigurationName: "content",
        configurations: [
          { name: "content", prioritizedFields: { contentFields: [{ name: "content" }] } },
        ],
      },
    });
    cleanup.push(() => client.deleteIndex(indexName));
    const documents = client.getSearchClient(indexName);
    await documents.uploadDocuments(
      [
        { id: "pool", content: "The Alpine hotel has an indoor pool and free parking." },
        { id: "family", content: "The Alpine hotel offers family rooms and breakfast." },
        { id: "city", content: "The Central hotel has a restaurant but no swimming pool." },
      ],
      { throwOnAnyFailure: true },
    );
    for (let attempt = 0; ; attempt++) {
      if ((await documents.getDocumentsCount()) === 3) break;
      assert(attempt < 30, "Timed out waiting for the sample documents.");
      await delay(1000);
    }
    const query = "Which hotel has a pool and family rooms?";
    const direct = new ProtocolSearchClient(endpoint, credential, indexName, protocolOptions);
    const result = await direct.searchPost({
      searchText: query,
      queryType: "agentic",
      semanticConfigurationName: "content",
      agenticOptions: { maxRuntimeInSeconds: 10 },
      debug: "agentic",
      top: 3,
    });
    assert(result.results.length, "Direct agentic search must return documents.");
    assert(result.debugInfo?.agentic, "Agentic diagnostics must be present.");
    console.log("Direct results:", result.results);
    console.log("Subqueries:", result.debugInfo.agentic.subQueries);
    console.log("Reasoning tokens:", result.debugInfo.agentic.usage?.reasoningTokens);

    await client.createKnowledgeSource({
      name: sourceName,
      kind: "searchIndex",
      searchIndexParameters: {
        searchIndexName: indexName,
        searchFields: [{ name: "content" }],
        semanticConfigurationName: "content",
      },
    });
    cleanup.push(() => client.deleteKnowledgeSource(sourceName));
    await client.createKnowledgeBase({
      name: baseName,
      knowledgeSources: [{ name: sourceName }],
      models: [{ kind: "microsoftRetriever1" }],
      retrievalReasoningEffort: { kind: "minimal" },
      outputMode: "extractiveData",
    });
    cleanup.push(() => client.deleteKnowledgeBase(baseName));
    const protocol = new ProtocolIndexClient(endpoint, credential, protocolOptions);
    assert.equal(
      (await protocol.getKnowledgeBase(baseName)).models?.[0].kind,
      "microsoftRetriever1",
    );
    const retrieved = await client.getKnowledgeRetrievalClient(baseName).retrieve({
      intents: [{ type: "semantic", search: query }],
      includeActivity: true,
    });
    assert(retrieved.references?.length, "MR1 retrieval must return source references.");
    console.log("MR1 results:", retrieved.response, retrieved.references, retrieved.activity);
  } finally {
    for (const remove of cleanup.reverse()) {
      await remove().catch((error) => {
        console.error(
          "Owned-resource cleanup failed:",
          error instanceof Error ? error.message : "Unknown error",
        );
        process.exitCode = 1;
      });
    }
  }
}

main().catch((error) => {
  console.error("Sample failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});

module.exports = { main };
