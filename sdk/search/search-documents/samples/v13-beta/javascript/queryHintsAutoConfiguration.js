// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Ground knowledge-base filters in index facets without manually listing
 * field values, then optionally retrieve a newly indexed country after the grounding TTL.
 *
 * Set ENDPOINT, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_CHAT_DEPLOYMENT_NAME, and
 * AZURE_OPENAI_CHAT_MODEL_NAME. Optional AZURE_SEARCH_API_KEY and AZURE_OPENAI_API_KEY
 * replace identity authentication. Requires November preview, semantic ranker, and
 * model access. Set QUERY_HINT_REFRESH=true to exercise a new facet value after a
 * 60-second TTL. This demonstrates availability after refresh, not cache-hit telemetry.
 * No request-time filter forces the result. Only this run's index, source, and KB are removed.
 */

const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");
const { delay } = require("@azure/core-util");
const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential, SearchIndexClient } = require("@azure/search-documents");
const { SearchIndexClient: ProtocolIndexClient } = require("@azure/search-documents/searchIndex");
const { KnowledgeBaseRetrievalClient } = require("@azure/search-documents/knowledgeBaseRetrieval");
require("dotenv/config");

async function main() {
  const endpoint = process.env.ENDPOINT;
  const resourceUrl = process.env.AZURE_OPENAI_ENDPOINT;
  const deploymentId = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME;
  const modelName = process.env.AZURE_OPENAI_CHAT_MODEL_NAME;
  assert(
    endpoint && resourceUrl && deploymentId && modelName,
    "Set Search and chat model settings.",
  );
  const credential = process.env.AZURE_SEARCH_API_KEY
    ? new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY)
    : new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential, {
    serviceVersion: "2026-11-01-preview",
  });
  const protocolOptions = { apiVersion: "2026-11-01-preview" };
  const protocol = new ProtocolIndexClient(endpoint, credential, protocolOptions);
  const indexName = `sample-hints-${randomUUID()}`;
  const sourceName = `ks-${indexName}`;
  const baseName = `kb-${indexName}`;
  const cleanup = [];
  try {
    await client.createIndex({
      name: indexName,
      fields: [
        { name: "id", type: "Edm.String", key: true },
        { name: "country", type: "Edm.String", filterable: true, facetable: true },
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
    const search = client.getSearchClient(indexName);
    await search.uploadDocuments(
      [
        { id: "ca-1", country: "Canada", content: "Hotel guest benefits include free internet." },
        { id: "ca-2", country: "Canada", content: "Hotel guest benefits include breakfast." },
        { id: "us-1", country: "United States", content: "Hotel guest benefits include parking." },
      ],
      { throwOnAnyFailure: true },
    );
    async function waitForCount(expected) {
      for (let attempt = 0; ; attempt++) {
        if ((await search.getDocumentsCount()) === expected) return;
        assert(attempt < 30, "Timed out waiting for the sample documents.");
        await delay(1000);
      }
    }
    await waitForCount(3);
    const facets = await search.search("*", { facets: ["country,count:16"], top: 0 });
    assert(facets.facets?.country?.length, "The fixture must expose country facets.");
    console.log("Available country facets:", facets.facets);
    await client.createKnowledgeSource({
      name: sourceName,
      kind: "searchIndex",
      searchIndexParameters: {
        searchIndexName: indexName,
        searchFields: [{ name: "content" }],
        semanticConfigurationName: "content",
        queryHints: {
          filters: [
            {
              field: "country",
              autoConfiguration: { cacheTtl: 60, maxFacetValueCount: 16 },
              filterInstructions:
                "When a country is specified, filter country using its exact resolved facet value.",
            },
          ],
        },
      },
    });
    cleanup.push(() => client.deleteKnowledgeSource(sourceName));
    const stored = await protocol.getKnowledgeSource(sourceName);
    assert("searchIndexParameters" in stored, "Expected a search-index source.");
    const hint = stored.searchIndexParameters.queryHints?.filters?.[0];
    assert.equal(hint?.autoConfiguration?.cacheTtl, 60);
    assert.equal(
      hint?.fieldValues,
      undefined,
      "Grounding must come from facets, not a manual list.",
    );
    await client.createKnowledgeBase({
      name: baseName,
      knowledgeSources: [{ name: sourceName }],
      models: [
        {
          kind: "azureOpenAI",
          azureOpenAIParameters: {
            resourceUrl,
            deploymentId,
            modelName,
            apiKey: process.env.AZURE_OPENAI_API_KEY,
          },
        },
      ],
      retrievalReasoningEffort: { kind: "low" },
      outputMode: "extractiveData",
    });
    cleanup.push(() => client.deleteKnowledgeBase(baseName));
    const retrieval = new KnowledgeBaseRetrievalClient(
      endpoint,
      credential,
      baseName,
      protocolOptions,
    );
    async function retrieveCountry(country, keys) {
      const result = await retrieval.retrieve({
        messages: [
          {
            role: "user",
            content: [{ type: "text", text: `Find hotel guest benefits in ${country} only.` }],
          },
        ],
        includeActivity: true,
      });
      assert(
        !result.activity?.some((activity) => activity.error),
        "Retrieval must not hide errors.",
      );
      const filters = result.activity?.flatMap((activity) =>
        "queryHintProcessing" in activity && activity.queryHintProcessing?.generatedFilter
          ? [activity.queryHintProcessing.generatedFilter]
          : [],
      );
      assert(
        filters?.some((filter) => filter.includes("country") && filter.includes(country)),
        "The planner must report the automatically grounded country filter.",
      );
      assert(result.references?.length, "Country retrieval must return supporting documents.");
      for (const reference of result.references) {
        assert(
          reference.type === "searchIndex" &&
            "docKey" in reference &&
            keys.includes(reference.docKey ?? ""),
          "A reference escaped the requested country's sample documents.",
        );
      }
      console.log("Generated country filters:", filters);
    }
    await retrieveCountry("Canada", ["ca-1", "ca-2"]);
    if (process.env.QUERY_HINT_REFRESH === "true") {
      await search.uploadDocuments(
        [
          {
            id: "jp-1",
            country: "Japan",
            content: "Hotel guest benefits include a garden breakfast.",
          },
        ],
        { throwOnAnyFailure: true },
      );
      await waitForCount(4);
      console.log("Waiting for the 60-second grounding TTL before querying the new country.");
      await delay(65_000);
      await retrieveCountry("Japan", ["jp-1"]);
    }
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
