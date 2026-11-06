// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Graph diagnostics, topic-graph retrieval and asynchronous File ingestion
 * using the 2026-11-01-preview API. Requires existing graph/vector indexes, a knowledge
 * base with a configured tool and a File knowledge source. No resources are provisioned.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const {
  KnowledgeRetrievalClient,
  SearchClient,
  SearchIndexClient,
} = require("@azure/search-documents");
require("dotenv").config();

async function main() {
  const endpoint = process.env.ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const options = { serviceVersion: "2026-11-01-preview" };
  const graphClient = new SearchClient(
    endpoint,
    process.env.GRAPH_INDEX_NAME || "",
    credential,
    options,
  );

  const graph = await graphClient.graph(process.env.GRAPH_QUERY || "MATCH (n) RETURN n", {
    executionMode: "execute",
    includeStatistics: true,
    includeDiagnostics: true,
    provenance: { kind: "none" },
  });
  for (const row of graph.value) {
    console.log(row.additionalProperties, row.provenance);
  }
  console.log(graph.statistics, graph.diagnostics);

  const vectorClient = new SearchClient(
    endpoint,
    process.env.INDEX_NAME || "",
    credential,
    options,
  );
  const results = await vectorClient.search("Explain the connected topics", {
    vectorSearchOptions: {
      queries: [
        {
          kind: "text",
          text: "Explain the connected topics",
          fields: ["contentVector"],
          topicGraph: { kind: "diverse", diversityFactor: 0.5, minDiversityPoolSize: 30 },
        },
      ],
    },
  });
  for await (const result of results.results) {
    console.log(result.document);
  }

  const retrievalClient = new KnowledgeRetrievalClient(
    endpoint,
    process.env.KNOWLEDGE_BASE_NAME || "",
    credential,
    options,
  );
  const response = await retrievalClient.retrieve({
    toolName: process.env.KNOWLEDGE_BASE_TOOL_NAME || "",
    intents: [{ type: "semantic", search: "What facts connect these topics?" }],
    includeActivity: true,
    knowledgeSourceParams: [
      {
        kind: "searchIndex",
        knowledgeSourceName: process.env.KNOWLEDGE_SOURCE_NAME || "",
        topicGraph: { kind: "balanced", minDiversityPoolSize: 20 },
        queryHintOverrides: {
          filters: [
            { field: "category", autoConfiguration: { cacheTtl: 60, maxFacetValueCount: 50 } },
          ],
        },
      },
    ],
  });
  console.log(response.response, response.activity, response.references);

  const indexClient = new SearchIndexClient(endpoint, credential, options);
  const sourceName = process.env.FILE_KNOWLEDGE_SOURCE_NAME || "";
  // Keep the thenable poller without awaiting it to observe progress before completion.
  const poller = indexClient.beginIngestKnowledgeSourceFile(sourceName, {
    metadata: { fileName: "samples/november-preview.txt", metadata: { category: "sample" } },
    content: {
      contents: new TextEncoder().encode("Graph retrieval connects facts across documents."),
      contentType: "text/plain",
    },
  });
  poller.onProgress((state) => console.log("Ingestion status:", state.status));
  const file = await poller.pollUntilDone();
  console.log("Ingested file:", file.fileId, file.createdAt);

  for await (const operation of indexClient.listKnowledgeSourceFileIngestionOperations(
    sourceName,
  )) {
    console.log(operation.id, operation.status, operation.error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = { main };
