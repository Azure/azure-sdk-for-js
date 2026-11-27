// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Defer graph extraction, attach and replace an ontology, then verify
 * cache-backed reprocessing and removal of obsolete graph relationships.
 *
 * Use the same Blob, native model and existing cache settings as
 * knowledgeSourceGraphExtraction. Upload exactly one fixtures/hotelGraph.txt to
 * AZURE_BLOB_FOLDER_PATH and set BLOB_SOURCE_APPROVED=true. Native Blob soft delete
 * must already be enabled. Search needs Blob, Table/cache and model permissions.
 *
 * This sample never modifies the source fixture. It preserves the same cache ID
 * through ontology changes and verifies their graph output. Cache-hit counts and
 * avoided model calls are not exposed by this API and are not asserted.
 * The service can require additional indexer runs to drain pending cached documents.
 * Only this run's Search resources are removed; existing cache storage is retained.
 * Ingestion, cache and model usage incur charges.
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
import type { AzureBlobKnowledgeSourceInput } from "@azure/search-documents";
import { SearchIndexClient as ProtocolIndexClient } from "@azure/search-documents/searchIndex";
import "dotenv/config";

function ontology(property: string, name: string): { kind: string; name: string; value: string } {
  return {
    kind: "inline",
    name,
    value: JSON.stringify({
      "@context": {
        ekg: "https://schema.search.azure.com/graph-extraction#",
        rdfs: "http://www.w3.org/2000/01/rdf-schema#",
        owl: "http://www.w3.org/2002/07/owl#",
      },
      "@graph": [
        { "@id": "ekg:Hotel", "@type": "owl:Class", "rdfs:comment": "A hotel property." },
        { "@id": "ekg:Organization", "@type": "owl:Class", "rdfs:comment": "A hotel operator." },
        {
          "@id": `ekg:${property}`,
          "@type": "owl:ObjectProperty",
          "rdfs:domain": { "@id": "ekg:Hotel" },
          "rdfs:range": { "@id": "ekg:Organization" },
          "rdfs:comment": "The organization operating the hotel.",
        },
      ],
    }),
  };
}

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
      chatModel,
    "Set the Blob fixture, existing cache, and native model settings.",
  );
  assert.equal(process.env.BLOB_SOURCE_APPROVED, "true", "Approve the dedicated fixture folder.");
  assert(
    folderPath.trim() && folderPath.replace(/[/\\]/g, "").trim() && !/^[/\\]/.test(folderPath),
    "Use a nonempty Blob folder prefix, not the container root.",
  );
  const credential = process.env.AZURE_SEARCH_API_KEY
    ? new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY)
    : new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential, {
    serviceVersion: "2026-11-01-preview",
  });
  const protocol = new ProtocolIndexClient(endpoint, credential, {
    apiVersion: "2026-11-01-preview",
  });
  const indexers = new SearchIndexerClient(endpoint, credential, {
    serviceVersion: "2026-11-01-preview",
  });
  const sourceName = `sample-graph-lifecycle-${randomUUID()}`;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const definition: AzureBlobKnowledgeSourceInput = {
    name: sourceName,
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
        chatCompletionModel: {
          kind: "azureOpenAI",
          azureOpenAIParameters: {
            resourceUrl,
            deploymentId: chatDeployment,
            modelName: chatModel,
            apiKey,
          },
        },
      },
      graphExtraction: { graphName: "hotels" },
    },
  };
  const cleanup: (() => Promise<unknown>)[] = [];
  const failures: unknown[] = [];
  let sourceCleanupError: unknown;
  try {
    await client.createKnowledgeSource(definition);
    cleanup.push(async () => {
      try {
        await client.deleteKnowledgeSource(sourceName);
      } catch (error) {
        sourceCleanupError = error;
      }
    });
    let resources: Record<string, string> | undefined;
    for (let attempt = 0; ; attempt++) {
      const source = await protocol.getKnowledgeSource(sourceName);
      assert(source.kind === "azureBlob" && "azureBlobParameters" in source);
      resources = source.azureBlobParameters.createdResources?.additionalProperties;
      if (
        resources?.index &&
        resources.graphIndex &&
        resources.indexer &&
        resources.skillset &&
        resources.datasource
      ) {
        break;
      }
      assert(attempt < 36, "Timed out waiting for owned graph resources.");
      await delay(5000);
    }
    for (const [kind, name] of [
      ["indexer", resources.indexer],
      ["skillset", resources.skillset],
      ["datasource", resources.datasource],
      ["index", resources.graphIndex],
      ["index", resources.index],
    ]) {
      assert(
        name.startsWith(`${sourceName}-`),
        "Generated cleanup must remain scoped to this source.",
      );
      cleanup.unshift(async () => {
        try {
          if (kind === "index") {
            const owned = await client.getIndex(name);
            assert(owned.etag);
            await client.deleteIndex(owned, { onlyIfUnchanged: true });
          } else if (kind === "indexer") {
            const owned = await indexers.getIndexer(name);
            assert(owned.etag);
            await indexers.deleteIndexer(owned, { onlyIfUnchanged: true });
          } else if (kind === "skillset") {
            const owned = await indexers.getSkillset(name);
            assert(owned.etag);
            await indexers.deleteSkillset(owned, { onlyIfUnchanged: true });
          } else {
            const owned = await indexers.getDataSourceConnection(name);
            assert(owned.etag);
            await indexers.deleteDataSourceConnection(owned, { onlyIfUnchanged: true });
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
    const indexerName = resources.indexer;
    async function waitForSynchronization(previousEnd = 0): Promise<number> {
      let retries = 0;
      let failedCacheReads = 0;
      let retriedExecution: number | undefined;
      if (previousEnd) await indexers.runIndexer(indexerName);
      for (let attempt = 0; attempt < 60; attempt++) {
        const status = await client.getKnowledgeSourceStatus(sourceName);
        const execution = (await indexers.getIndexerStatus(indexerName)).lastResult;
        const end = execution?.endTime?.getTime();
        if (execution?.status === "transientFailure" && end !== retriedExecution) {
          const cachedDocumentsPending = /pending cached documents/.test(
            execution.errorMessage || "",
          );
          const cacheReadFailure = execution.errors.some(
            (error) => error.name === "Cache.ReadDocument",
          );
          assert(
            retries < 3 && (cachedDocumentsPending || cacheReadFailure),
            "Graph synchronization failed; inspect indexer and cache diagnostics.",
          );
          assert(
            !execution.failedItemCount ||
              (execution.errors.length > 0 &&
                execution.errors.every((error) => error.name === "Cache.ReadDocument")),
            "Do not retry unrelated failed documents as cache replay.",
          );
          failedCacheReads += execution.failedItemCount;
          retries++;
          retriedExecution = end;
          await indexers.runIndexer(indexerName);
        } else if (
          !status.currentSynchronizationState &&
          execution?.status === "success" &&
          status.lastSynchronizationState?.endTime &&
          status.lastSynchronizationState.endTime.getTime() > previousEnd
        ) {
          // Synchronization counters include failed attempts from earlier indexer runs.
          assert(
            status.lastSynchronizationState.itemsUpdatesFailed <= failedCacheReads,
            "The synchronization must not contain unaccounted failed item updates.",
          );
          if (status.lastSynchronizationState.itemsUpdatesFailed) {
            console.log(
              "Recovered cache-read attempts:",
              status.lastSynchronizationState.itemsUpdatesFailed,
            );
          }
          assert.equal(
            execution.failedItemCount,
            0,
            "The final indexer execution must have no failed documents.",
          );
          assert(status.lastSynchronizationState.itemsUpdatesProcessed > 0);
          return status.lastSynchronizationState.endTime.getTime();
        }
        await delay(5000);
      }
      throw new Error("Timed out waiting for graph synchronization.");
    }
    let end = await waitForSynchronization();
    const chunks = client.getSearchClient(resources.index);
    const graph = client.getSearchClient(resources.graphIndex);
    const chunkCount = await chunks.getDocumentsCount();
    assert(chunkCount > 0, "Deferred extraction must ingest searchable text.");
    assert.equal(await graph.getDocumentsCount(), 0, "No ontology means no extracted triples.");
    const cacheId = (await indexers.getIndexer(indexerName)).cache?.id;
    assert(cacheId, "The generated indexer must expose its enrichment cache identity.");
    const schema = await protocol.getIndex(resources.graphIndex);
    const graphField = schema.graphProfile?.fields.graphNameField;
    assert(graphField, "The graph must expose its graph-name field.");
    async function verifyRelationships(property: string): Promise<void> {
      for (let attempt = 0; attempt < 30; attempt++) {
        const result = await graph.graph(
          "MATCH (h:Hotel)-[r]->(o:Organization) RETURN h.name AS hotel, type(r) AS relationship, o.name AS organization LIMIT 20",
          {
            filter: `${graphField} eq 'hotels'`,
            provenance: { kind: "ids" },
            includeStatistics: true,
          },
        );
        const rows = result.value.map((row) => row.additionalProperties);
        const obsolete =
          property === "managedBy"
            ? await graph.graph(
                "MATCH (h:Hotel)-[r:operatedBy]->(o:Organization) RETURN h.name AS hotel LIMIT 1",
                { filter: `${graphField} eq 'hotels'` },
              )
            : undefined;
        if (
          rows.length > 0 &&
          (!obsolete || obsolete.value.length === 0) &&
          rows.every((row) => row?.relationship === property) &&
          rows.some(
            (row) =>
              typeof row?.hotel === "string" &&
              /alpine/i.test(row.hotel) &&
              typeof row.organization === "string" &&
              /summit hospitality/i.test(row.organization),
          )
        ) {
          console.log(`Verified ${property} relationships:`, rows);
          return;
        }
        await delay(1000);
      }
      throw new Error(
        `Expected fixture relationships using only ${property}; obsolete assertions must disappear.`,
      );
    }
    for (const [property, name] of [
      ["operatedBy", "operators-v1"],
      ["managedBy", "operators-v2"],
    ]) {
      definition.azureBlobParameters.graphExtraction = {
        graphName: "hotels",
        ontology: ontology(property, name),
      };
      // Reuse the original definition: model/cache secrets are write-only on GET.
      await client.createOrUpdateKnowledgeSource(definition);
      end = await waitForSynchronization(end);
      assert.equal(
        (await indexers.getIndexer(indexerName)).cache?.id,
        cacheId,
        "Ontology changes must retain the existing enrichment cache.",
      );
      assert.equal(await chunks.getDocumentsCount(), chunkCount);
      await verifyRelationships(property);
    }
    console.log(
      "Deferred attachment and ontology replacement completed using the same enrichment cache.",
    );
  } catch (error) {
    failures.push(error);
  } finally {
    for (const remove of cleanup.reverse()) {
      try {
        await remove();
      } catch (error) {
        failures.push(error);
      }
    }
    if (sourceCleanupError) {
      try {
        await client.deleteKnowledgeSource(sourceName);
      } catch (error) {
        failures.push(error);
      }
    }
  }
  if (failures.length) {
    throw new AggregateError(failures, "Graph lifecycle or owned-resource cleanup failed.");
  }
}

main().catch((error: unknown) => {
  console.error("Graph lifecycle failed:", error);
  process.exitCode = 1;
});
