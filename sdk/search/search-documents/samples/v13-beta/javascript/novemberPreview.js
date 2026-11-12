// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Graph diagnostics, topic-graph retrieval and asynchronous File ingestion
 * using the 2026-11-01-preview API. Requires existing graph/vector indexes, a knowledge
 * base with a configured tool and a File knowledge source. No resources are provisioned.
 * GRAPH_QUERY must constrain the graph using labels or names from the graph index.
 * The vector index needs a text vectorizer and a populated topic-graph profile on
 * contentVector. The knowledge base needs a model supporting low reasoning, a
 * topic-graph-enabled search-index source and a filterable category field containing
 * "manual". Automatic hints belong in the source's stored queryHints; request-time
 * queryHintOverrides below use explicit fieldValues instead.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const {
  KnowledgeRetrievalClient,
  SearchClient,
  SearchIndexClient,
} = require("@azure/search-documents");
require("dotenv").config();

async function main() {
  const graphQuery = process.env.GRAPH_QUERY;
  if (!graphQuery) {
    throw new Error("Set GRAPH_QUERY to a constrained query matching the graph index's schema.");
  }
  const endpoint = process.env.ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const options = { serviceVersion: "2026-11-01-preview" };
  const graphClient = new SearchClient(
    endpoint,
    process.env.GRAPH_INDEX_NAME || "",
    credential,
    options,
  );

  const graph = await graphClient.graph(graphQuery, {
    executionMode: "execute",
    includeStatistics: true,
    includeDiagnostics: true,
    provenance: { kind: "ids" },
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
          topicGraph: { kind: "diverse", diversityFactor: 0.5, minDiversityPoolSize: 500 },
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
    retrievalReasoningEffort: { kind: "low" },
    includeActivity: true,
    knowledgeSourceParams: [
      {
        kind: "searchIndex",
        knowledgeSourceName: process.env.KNOWLEDGE_SOURCE_NAME || "",
        topicGraph: { kind: "balanced", minDiversityPoolSize: 500 },
        queryHintOverrides: {
          filters: [{ field: "category", fieldValues: ["manual"] }],
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
