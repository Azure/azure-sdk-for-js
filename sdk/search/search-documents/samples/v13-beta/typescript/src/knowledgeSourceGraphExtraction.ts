// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Configure cached graph extraction with an inline ontology on an Azure Blob
 * knowledge source, inspect synchronization/graph statistics, and retrieve with graph provenance.
 *
 * Set ENDPOINT, AZURE_BLOB_CONNECTION_STRING, AZURE_BLOB_CONTAINER_NAME,
 * AZURE_BLOB_FOLDER_PATH, AZURE_GRAPH_CACHE_CONNECTION_STRING, AZURE_OPENAI_ENDPOINT,
 * AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME, AZURE_OPENAI_EMBEDDING_MODEL_NAME,
 * AZURE_OPENAI_CHAT_DEPLOYMENT_NAME, AZURE_OPENAI_CHAT_MODEL_NAME, and GRAPH_RETRIEVAL_QUERY.
 * First upload fixtures/hotelGraph.txt with content type text/plain to the selected,
 * nonempty Blob folder, matching the inline Hotel-operatedBy-Organization ontology.
 * Configure native Blob soft delete before
 * the first indexing run. ADLS Gen2, ACL ingestion and sensitivity labels are not supported
 * for this graph-extraction workflow.
 *
 * Search's identity needs Blob/cache/model permissions; AZURE_OPENAI_API_KEY is an
 * alternative for model authentication. Cache storage already exists; this sample does
 * not provision it, modify source documents, or delete cache storage. Extraction incurs
 * model/cache usage. Only the owned Search source, knowledge base and their generated
 * Search resources are removed. Cache configuration is not cache-hit evidence.
 * Deferred attachment, ontology replacement and cache replay are not demonstrated.
 */

import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";
import {
  AzureKeyCredential,
  SearchIndexClient,
  SearchIndexerClient,
} from "@azure/search-documents";
import { KnowledgeBaseRetrievalClient } from "@azure/search-documents/knowledgeBaseRetrieval";
import { SearchIndexClient as ProtocolIndexClient } from "@azure/search-documents/searchIndex";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env.ENDPOINT;
  const connectionString = process.env.AZURE_BLOB_CONNECTION_STRING;
  const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
  const folderPath = process.env.AZURE_BLOB_FOLDER_PATH;
  const storageConnectionString = process.env.AZURE_GRAPH_CACHE_CONNECTION_STRING;
  const resourceUrl = process.env.AZURE_OPENAI_ENDPOINT;
  const embeddingDeployment = process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME;
  const embeddingModel = process.env.AZURE_OPENAI_EMBEDDING_MODEL_NAME;
  const chatDeployment = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME;
  const chatModel = process.env.AZURE_OPENAI_CHAT_MODEL_NAME;
  const query = process.env.GRAPH_RETRIEVAL_QUERY;
  assert(
    endpoint &&
      connectionString &&
      containerName &&
      folderPath &&
      storageConnectionString &&
      resourceUrl &&
      embeddingDeployment &&
      embeddingModel &&
      chatDeployment &&
      chatModel &&
      query,
    "Set the graph extraction, cache, small Blob-folder fixture, and model settings.",
  );
  assert(
    folderPath.trim() && folderPath.replace(/[/\\]/g, "").trim() && !/^[/\\]/.test(folderPath),
    "Use a nonempty Blob folder prefix, not the container root.",
  );
  const credential = process.env.AZURE_SEARCH_API_KEY
    ? new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY)
    : new DefaultAzureCredential();
  const options = { apiVersion: "2026-11-01-preview" };
  const client = new SearchIndexClient(endpoint, credential, {
    serviceVersion: options.apiVersion,
  });
  const protocol = new ProtocolIndexClient(endpoint, credential, options);
  const indexers = new SearchIndexerClient(endpoint, credential, {
    serviceVersion: options.apiVersion,
  });
  const sourceName = `sample-extraction-${randomUUID()}`;
  const baseName = `kb-${sourceName}`;
  const graphName = "hotels";
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const chat = {
    kind: "azureOpenAI" as const,
    azureOpenAIParameters: {
      resourceUrl,
      deploymentId: chatDeployment,
      modelName: chatModel,
      apiKey,
    },
  };
  const cleanup: (() => Promise<unknown>)[] = [];
  try {
    await client.createKnowledgeSource({
      name: sourceName,
      description:
        "Hotel graph extraction with an inline ontology and enrichment cache. Use graph traversal for hotel/operator relationships.",
      kind: "azureBlob",
      azureBlobParameters: {
        connectionString,
        containerName,
        folderPath,
        ingestionParameters: {
          contentExtractionMode: "minimal",
          disableImageVerbalization: true,
          cache: { storageConnectionString, enableReprocessing: true },
          embeddingModel: {
            kind: "azureOpenAI",
            azureOpenAIParameters: {
              resourceUrl,
              deploymentId: embeddingDeployment,
              modelName: embeddingModel,
              apiKey,
            },
          },
          chatCompletionModel: chat,
        },
        graphExtraction: {
          graphName,
          ontology: {
            kind: "inline",
            name: "hotel-relationships",
            value: JSON.stringify({
              "@context": {
                ekg: "https://schema.search.azure.com/graph-extraction#",
                rdfs: "http://www.w3.org/2000/01/rdf-schema#",
                owl: "http://www.w3.org/2002/07/owl#",
              },
              "@graph": [
                {
                  "@id": "ekg:Hotel",
                  "@type": "owl:Class",
                  "rdfs:comment": "A hotel property, distinct from the organization operating it.",
                },
                {
                  "@id": "ekg:Organization",
                  "@type": "owl:Class",
                  "rdfs:comment": "An organization operating hotel properties.",
                },
                {
                  "@id": "ekg:operatedBy",
                  "@type": "owl:ObjectProperty",
                  "rdfs:domain": { "@id": "ekg:Hotel" },
                  "rdfs:range": { "@id": "ekg:Organization" },
                  "rdfs:comment": "The organization operating the hotel.",
                },
              ],
            }),
          },
        },
      },
    });
    cleanup.push(() => client.deleteKnowledgeSource(sourceName));
    for (let attempt = 0; ; attempt++) {
      if ((await client.getKnowledgeSourceStatus(sourceName)).synchronizationStatus === "active") {
        break;
      }
      assert(attempt < 36, "Timed out waiting for the owned source to become active.");
      await delay(5000);
    }
    const stored = await protocol.getKnowledgeSource(sourceName);
    assert.equal(stored.kind, "azureBlob");
    assert("azureBlobParameters" in stored, "Expected Blob knowledge source parameters.");
    assert.equal(stored.azureBlobParameters.graphExtraction?.ontology?.name, "hotel-relationships");
    assert.equal(
      stored.azureBlobParameters.ingestionParameters?.cache?.storageConnectionString,
      undefined,
      "Cache connection strings are write-only; retain credentials securely for future updates.",
    );
    const resources = stored.azureBlobParameters.createdResources?.additionalProperties;
    assert(resources, "Expected generated resources for the owned Blob source.");
    for (const kind of ["datasource", "indexer", "skillset", "graphIndex", "index"]) {
      assert(
        resources[kind]?.startsWith(`${sourceName}-`),
        "Generated resources must belong to this source.",
      );
    }
    for (const [kind, name] of [
      ["indexer", resources.indexer],
      ["skillset", resources.skillset],
      ["datasource", resources.datasource],
      ["index", resources.graphIndex],
      ["index", resources.index],
    ]) {
      cleanup.unshift(async () => {
        try {
          if (kind === "index") {
            const resource = await client.getIndex(name);
            assert(resource.etag, "An ETag is required to remove an owned generated index.");
            await client.deleteIndex(resource, { onlyIfUnchanged: true });
          } else if (kind === "indexer") {
            const resource = await indexers.getIndexer(name);
            assert(resource.etag, "An ETag is required to remove an owned generated indexer.");
            await indexers.deleteIndexer(resource, { onlyIfUnchanged: true });
          } else if (kind === "skillset") {
            const resource = await indexers.getSkillset(name);
            assert(resource.etag, "An ETag is required to remove an owned generated skillset.");
            await indexers.deleteSkillset(resource, { onlyIfUnchanged: true });
          } else {
            const resource = await indexers.getDataSourceConnection(name);
            assert(resource.etag, "An ETag is required to remove an owned generated data source.");
            await indexers.deleteDataSourceConnection(resource, { onlyIfUnchanged: true });
          }
        } catch (error) {
          if (!(
            error &&
            typeof error === "object" &&
            "statusCode" in error &&
            error.statusCode === 404
          )) {
            throw error;
          }
        }
      });
    }
    const dataSource = await indexers.getDataSourceConnection(resources.datasource);
    assert.equal(
      dataSource.container.query,
      folderPath,
      "Ingestion must preserve the folder scope.",
    );
    const graphSchema = await protocol.getIndex(resources.graphIndex);
    assert.equal(graphSchema.graphProfile?.provenanceIndexName, resources.index);
    // Without an ontology, a configured cache can prepare enrichment for later graph extraction.
    // Once attached, the ontology cannot be removed; wait until synchronization is idle before changing it.
    for (let attempt = 0; ; attempt++) {
      const status = await client.getKnowledgeSourceStatus(sourceName);
      const last = status.lastSynchronizationState;
      const execution = (await indexers.getIndexerStatus(resources.indexer)).lastResult;
      assert(
        execution?.status !== "transientFailure",
        "Inspect indexer execution errors and dependency access.",
      );
      if (!status.currentSynchronizationState && last?.endTime && execution?.status === "success") {
        assert.equal(
          last.itemsUpdatesFailed,
          0,
          "Inspect synchronization status for ingestion failures.",
        );
        assert.equal(
          execution.failedItemCount,
          0,
          "Graph indexing must not lose source documents.",
        );
        console.log("Graph statistics:", last.graphStatistics);
        break;
      }
      assert(attempt < 60, "Timed out waiting for graph extraction.");
      await delay(10_000);
    }
    const chunks = client.getSearchClient(resources.index);
    const graph = client.getSearchClient(resources.graphIndex);
    assert((await chunks.getDocumentsCount()) > 0, "The source must produce searchable chunks.");
    const graphField = graphSchema.graphProfile?.fields.graphNameField;
    assert(graphField, "The graph profile must expose its graph-name field.");
    const relationships = await graph.graph(
      "MATCH (h:Hotel)-[r:operatedBy]->(o:Organization) RETURN h.name AS hotel, o.name AS organization LIMIT 10",
      {
        filter: `${graphField} eq '${graphName}'`,
        provenance: { kind: "ids" },
        includeStatistics: true,
        includeDiagnostics: true,
      },
    );
    const expectedOperators = new Map([
      ["alpine hotel", "summit hospitality"],
      ["harbor hotel", "coast hospitality"],
    ]);
    assert(
      relationships.value.some((row) => {
        const hotel = row.additionalProperties?.hotel;
        const organization = row.additionalProperties?.organization;
        return (
          typeof hotel === "string" &&
          typeof organization === "string" &&
          expectedOperators.get(
            hotel
              .trim()
              .replace(/^the\s+/i, "")
              .toLowerCase(),
          ) === organization.trim().toLowerCase() &&
          row.provenance?.evidence?.length
        );
      }),
      "The graph must return a fixture relationship with supporting provenance.",
    );
    await client.createKnowledgeBase({
      name: baseName,
      knowledgeSources: [{ name: sourceName }],
      models: [chat],
      retrievalReasoningEffort: { kind: "low" },
      outputMode: "extractiveData",
    });
    cleanup.push(() => client.deleteKnowledgeBase(baseName));
    const retrieval = new KnowledgeBaseRetrievalClient(endpoint, credential, baseName, options);
    const result = await retrieval.retrieve({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `${query} Use only the hotels graph's operatedBy relationship, not keyword or text search.`,
            },
          ],
        },
      ],
      includeActivity: true,
      outputMode: "extractiveData",
      knowledgeSourceParams: [
        {
          kind: "azureBlob",
          knowledgeSourceName: sourceName,
          failOnError: true,
          includeReferences: true,
          includeReferenceSourceData: true,
          graphParameters: { includeQuery: true, provenance: { kind: "none" } },
        },
      ],
    });
    function verifyGraphRetrieval(response: typeof result): Set<number> {
      assert(
        !response.activity?.some((activity) => activity.error),
        "Graph retrieval must succeed.",
      );
      const graphActivities = response.activity?.filter(
        (activity) =>
          activity.type === "graphSearch" &&
          "graphSearchArguments" in activity &&
          typeof activity.graphSearchArguments?.gql === "string" &&
          activity.graphSearchArguments.gql.trim().length > 0,
      );
      assert(
        graphActivities?.length,
        "The fixture query must return a successful graph activity with generated GQL.",
      );
      const activityIds = new Set(graphActivities.map((activity) => activity.id));
      assert(
        response.references?.some(
          (reference) =>
            reference.type === "graphSearch" && activityIds.has(reference.activitySource),
        ),
        "Graph references must link to the successful activity containing generated GQL.",
      );
      for (const activity of graphActivities) {
        if ("graphSearchArguments" in activity) {
          console.log("Graph query:", activity.graphSearchArguments);
        }
      }
      return activityIds;
    }
    verifyGraphRetrieval(result);
    console.log("References:", result.references);
    const schema = await protocol.getIndex(resources.index);
    const keyField = schema.fields.find((field) => field.key)?.name;
    const textField = schema.fields.find(
      (field) => ["snippet", "content"].includes(field.name) && field.retrievable !== false,
    )?.name;
    assert(keyField && textField, "The provenance index must expose its key and source text.");
    const hydrated = await retrieval.retrieve({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `${query} Use only the graph's operatedBy relationship and include supporting source text.`,
            },
          ],
        },
      ],
      includeActivity: true,
      outputMode: "extractiveData",
      knowledgeSourceParams: [
        {
          kind: "azureBlob",
          knowledgeSourceName: sourceName,
          failOnError: true,
          includeReferences: true,
          includeReferenceSourceData: true,
          graphParameters: {
            includeQuery: true,
            provenance: {
              kind: "hydrate",
              hydrateDocuments: { select: `${keyField},${textField}`, top: 5 },
            },
          },
        },
      ],
    });
    const hydratedActivityIds = verifyGraphRetrieval(hydrated);
    assert(
      hydrated.references?.some(
        (reference) =>
          reference.type === "graphSearch" &&
          hydratedActivityIds.has(reference.activitySource) &&
          "sourceData" in reference &&
          typeof reference.sourceData?.[textField] === "string" &&
          reference.sourceData[textField].trim(),
      ),
      "Hydration must return actual supporting source text, not only graph rows.",
    );
    console.log("Hydrated graph references:", hydrated.references);
  } finally {
    for (const remove of cleanup.reverse()) {
      await remove().catch((error: unknown) => {
        console.error(
          "Owned-resource cleanup failed:",
          error instanceof Error ? error.message : "Unknown error",
        );
        process.exitCode = 1;
      });
    }
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});
