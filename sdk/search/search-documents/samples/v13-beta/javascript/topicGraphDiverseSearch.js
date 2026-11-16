// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Set up and populate a Topic Graph corpus and sidecar, compare ordinary,
 * diverse, balanced, and inherited search modes, then retrieve through a knowledge
 * base with stored and runtime settings. Deletes only resources created by this run.
 *
 * Requires ENDPOINT, AZURE_OPENAI_ENDPOINT, and AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME.
 * Set AZURE_OPENAI_EMBEDDING_MODEL_NAME to the underlying model, not the deployment
 * alias (defaults to text-embedding-3-small). Supported models are ada-002, 3-small,
 * and 3-large; all vectors in this sample have 1536 dimensions.
 * Authenticate with DefaultAzureCredential. The caller needs index/document/KB
 * permissions and Cognitive Services OpenAI User on the embedding resource.
 * Search also needs a managed identity with that OpenAI role and network access.
 * Enable semantic ranker and use a service supporting 2026-11-01-preview Topic Graph.
 *
 * This is a MOCK fixture: nine synthetic documents and three sampled document
 * embeddings standing in for topic centroids, not a production topic graph.
 * Embedding and vectorization incur Azure OpenAI usage; no chat deployment is needed.
 * Topic coverage/order is data-dependent, not an equal-quota or quality guarantee.
 */

const { randomUUID } = require("node:crypto");
const { delay } = require("@azure/core-util");
const { DefaultAzureCredential, getBearerTokenProvider } = require("@azure/identity");
const { SearchIndexClient } = require("@azure/search-documents");
const { AzureOpenAI } = require("openai");
require("dotenv").config();

const queryText = "How can I improve reliability, latency, and cost of a search service?";
const dimensions = 1536;
const k = 6;

async function waitForDocuments(client, expected) {
  for (let attempt = 0; attempt < 30; attempt++) {
    if ((await client.getDocumentsCount()) === expected) return;
    await delay(1000);
  }
  throw new Error(`Expected ${expected} searchable documents in ${client.indexName}.`);
}

async function showSearch(client, label, query) {
  const response = await client.search("*", {
    vectorSearchOptions: { queries: [query] },
    select: ["id", "title", "content", "topic"],
    top: k,
  });
  const rows = [];
  for await (const hit of response.results) {
    if ("contentVector" in hit.document) {
      throw new Error("The hidden corpus vector must not be returned.");
    }
    rows.push({ id: hit.document.id, topic: hit.document.topic, score: hit.score });
  }
  if (rows.length !== k || new Set(rows.map((row) => row.id)).size !== k) {
    throw new Error(`${label}: expected ${k} unique documents.`);
  }
  console.log(label, rows);
}

async function main() {
  const endpoint = process.env.ENDPOINT;
  const openAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const deployment = process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME;
  const model = process.env.AZURE_OPENAI_EMBEDDING_MODEL_NAME || "text-embedding-3-small";
  if (!endpoint || !openAIEndpoint || !deployment) {
    throw new Error(
      "Set ENDPOINT, AZURE_OPENAI_ENDPOINT, and AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME.",
    );
  }
  if (
    model !== "text-embedding-ada-002" &&
    model !== "text-embedding-3-small" &&
    model !== "text-embedding-3-large"
  ) {
    throw new Error("Set AZURE_OPENAI_EMBEDDING_MODEL_NAME to a supported embedding model.");
  }

  const credential = new DefaultAzureCredential();
  const indexClient = new SearchIndexClient(endpoint, credential, {
    serviceVersion: "2026-11-01-preview",
  });
  const openAI = new AzureOpenAI({
    endpoint: openAIEndpoint,
    deployment,
    apiVersion: "2024-02-01",
    azureADTokenProvider: getBearerTokenProvider(
      credential,
      "https://cognitiveservices.azure.com/.default",
    ),
  });
  const topics = [
    {
      topic: "reliability",
      texts: [
        "Use replicas and health probes to keep a search service available.",
        "Retry transient search failures with bounded backoff and jitter.",
        "Monitor availability and use staged deployments with rollback.",
      ],
    },
    {
      topic: "performance",
      texts: [
        "Tune vector indexes and candidate counts to reduce query latency.",
        "Profile search execution and cache repeated work.",
        "Use selective filters and bounded result sizes for efficient search.",
      ],
    },
    {
      topic: "cost",
      texts: [
        "Rightsize replicas and partitions while preserving availability.",
        "Reduce vector storage costs with quantization.",
        "Control search costs with batching and utilization monitoring.",
      ],
    },
  ];
  const chunks = topics.flatMap(({ topic, texts }) =>
    texts.map((content, index) => ({
      id: `${topic}-${index + 1}`,
      title: `${topic} guidance ${index + 1}`,
      content,
      topic,
    })),
  );
  const inputs = [...chunks.map((chunk) => chunk.content), queryText];
  const embeddingResponse = await openAI.embeddings.create({
    model: deployment,
    input: inputs,
    encoding_format: "float",
    ...(model === "text-embedding-ada-002" ? {} : { dimensions }),
  });
  const byIndex = new Map(embeddingResponse.data.map((item) => [item.index, item.embedding]));
  if (byIndex.size !== inputs.length || embeddingResponse.data.length !== inputs.length) {
    throw new Error("Expected one embedding per document and query.");
  }
  const vectors = inputs.map((_, index) => {
    const vector = byIndex.get(index);
    if (vector?.length !== dimensions || !vector.every(Number.isFinite)) {
      throw new Error(`Embedding ${index} must have ${dimensions} finite values.`);
    }
    return vector;
  });

  const suffix = randomUUID();
  const corpusName = `topicgraph-chunks-${suffix}`;
  const sidecarName = `topicgraph-centroids-${suffix}`;
  const sourceName = `topicgraph-source-${suffix}`;
  const baseName = `topicgraph-base-${suffix}`;
  let corpusCreated = false;
  let sidecarCreated = false;
  let sourceCreated = false;
  let baseCreated = false;
  try {
    await indexClient.createIndex({
      name: corpusName,
      fields: [
        { name: "id", type: "Edm.String", key: true, filterable: true },
        { name: "title", type: "Edm.String", searchable: true },
        { name: "content", type: "Edm.String", searchable: true },
        { name: "topic", type: "Edm.String", filterable: true, facetable: true },
        {
          name: "contentVector",
          type: "Collection(Edm.Single)",
          searchable: true,
          hidden: true,
          stored: true,
          vectorSearchDimensions: dimensions,
          vectorSearchProfileName: "chunk-vectors",
        },
      ],
      vectorSearch: {
        algorithms: [{ name: "cosine-hnsw", kind: "hnsw", parameters: { metric: "cosine" } }],
        profiles: [
          {
            name: "chunk-vectors",
            algorithmConfigurationName: "cosine-hnsw",
            vectorizerName: "embeddings",
          },
        ],
        vectorizers: [
          {
            vectorizerName: "embeddings",
            kind: "azureOpenAI",
            parameters: { resourceUrl: openAIEndpoint, deploymentId: deployment, modelName: model },
          },
        ],
      },
      semanticSearch: {
        defaultConfigurationName: "content-semantic",
        configurations: [
          {
            name: "content-semantic",
            prioritizedFields: {
              titleField: { name: "title" },
              contentFields: [{ name: "content" }],
            },
          },
        ],
      },
    });
    corpusCreated = true;
    await indexClient.createIndex({
      name: sidecarName,
      fields: [
        { name: "id", type: "Edm.String", key: true },
        { name: "subject_id", type: "Edm.String" },
        {
          name: "object_vector",
          type: "Collection(Edm.Single)",
          searchable: true,
          stored: true,
          vectorSearchDimensions: dimensions,
          vectorSearchProfileName: "centroid-vectors",
        },
      ],
      vectorSearch: {
        algorithms: [{ name: "cosine-hnsw", kind: "hnsw", parameters: { metric: "cosine" } }],
        profiles: [{ name: "centroid-vectors", algorithmConfigurationName: "cosine-hnsw" }],
      },
    });
    sidecarCreated = true;

    // Link only after the sidecar exists; preserve the schema and guard against another writer.
    const corpus = await indexClient.getIndex(corpusName);
    if (!corpus.etag) throw new Error("Cannot safely link the corpus without its ETag.");
    await indexClient.createOrUpdateIndex(
      {
        ...corpus,
        fields: corpus.fields.map((field) =>
          field.name === "contentVector" ? { ...field, topicGraphProfile: "topics" } : field,
        ),
        vectorSearch: {
          ...corpus.vectorSearch,
          topicGraphProfiles: [
            {
              name: "topics",
              indexName: sidecarName,
              defaultKind: "balanced",
              defaultMinDiversityPoolSize: 1000,
            },
          ],
        },
      },
      { onlyIfUnchanged: true },
    );
    const client = indexClient.getSearchClient(corpusName);
    const sidecar = indexClient.getSearchClient(sidecarName);
    const corpusUpload = await client.uploadDocuments(
      chunks.map((chunk, index) => ({ ...chunk, contentVector: vectors[index] })),
    );
    const sidecarUpload = await sidecar.uploadDocuments(
      topics.map(({ topic }, index) => ({
        id: `centroid-${topic}`,
        subject_id: `topic:${topic}`,
        object_vector: vectors[index * 3],
      })),
    );
    if ([...corpusUpload.results, ...sidecarUpload.results].some((result) => !result.succeeded)) {
      throw new Error("A corpus or sidecar document failed to upload.");
    }
    await waitForDocuments(client, chunks.length);
    await waitForDocuments(sidecar, topics.length);

    // Explicit none bypasses the profile default; omission would inherit balanced.
    for (const topicGraph of [
      { kind: "none" },
      { kind: "diverse", diversityFactor: 0.2, minDiversityPoolSize: 500 },
      { kind: "balanced", minDiversityPoolSize: 500 },
    ]) {
      await showSearch(client, topicGraph.kind, {
        kind: "vector",
        fields: ["contentVector"],
        vector: vectors[chunks.length],
        kNearestNeighborsCount: k,
        topicGraph,
      });
    }
    // This also verifies that Search can reach and authenticate to the embedding deployment.
    await showSearch(client, "text query: inherited balanced/1000", {
      kind: "text",
      text: queryText,
      fields: ["contentVector"],
      kNearestNeighborsCount: k,
    });

    await indexClient.createKnowledgeSource({
      name: sourceName,
      kind: "searchIndex",
      resultsProcessing: "none",
      searchIndexParameters: {
        searchIndexName: corpusName,
        semanticConfigurationName: "content-semantic",
        sourceDataFields: ["id", "title", "content", "topic"].map((name) => ({ name })),
        searchFields: ["title", "content", "contentVector"].map((name) => ({ name })),
        topicGraph: { kind: "diverse", diversityFactor: 0.2, minDiversityPoolSize: 500 },
      },
    });
    sourceCreated = true;
    await indexClient.createKnowledgeBase({
      name: baseName,
      knowledgeSources: [{ name: sourceName }],
      outputMode: "extractiveData",
      retrievalReasoningEffort: { kind: "minimal" },
    });
    baseCreated = true;
    const retrievalClient = indexClient.getKnowledgeRetrievalClient(baseName);
    // Runtime objects replace, rather than merge with, the stored source settings.
    // Balanced omits a pool, so it inherits profile 1000, not stored source 500.
    for (const topicGraph of [
      undefined,
      { kind: "diverse", diversityFactor: 0.25, minDiversityPoolSize: 2000 },
      { kind: "balanced" },
      { kind: "none" },
    ]) {
      const response = await retrievalClient.retrieve({
        intents: [{ type: "semantic", search: queryText }],
        retrievalReasoningEffort: { kind: "minimal" },
        outputMode: "extractiveData",
        includeActivity: true,
        maxRuntimeInSeconds: 60,
        maxOutputDocuments: k,
        knowledgeSourceParams: [
          {
            kind: "searchIndex",
            knowledgeSourceName: sourceName,
            alwaysQuerySource: true,
            failOnError: true,
            includeReferences: true,
            includeReferenceSourceData: true,
            resultsProcessing: "none",
            ...(topicGraph ? { topicGraph } : {}),
          },
        ],
      });
      if (
        !response.references?.length ||
        !response.activity?.some((activity) => activity.type === "searchIndex") ||
        response.activity.some((activity) => activity.error)
      ) {
        throw new Error("Expected nonempty references and successful search-index activity.");
      }
      console.log(topicGraph?.kind ?? "stored diverse", response.activity, response.references);
    }
  } finally {
    for (const remove of [
      baseCreated ? () => indexClient.deleteKnowledgeBase(baseName) : undefined,
      sourceCreated ? () => indexClient.deleteKnowledgeSource(sourceName) : undefined,
      corpusCreated ? () => indexClient.deleteIndex(corpusName) : undefined,
      sidecarCreated ? () => indexClient.deleteIndex(sidecarName) : undefined,
    ]) {
      if (remove) {
        try {
          await remove();
        } catch (error) {
          console.error("Could not clean up a resource created by this sample:", error);
          process.exitCode = 1;
        }
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = { main };
