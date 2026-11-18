// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Ingest an approved Blob folder with a compatible embedding model and
 * optionally verbalize images with a compatible chat model, then verify indexed content.
 *
 * Set ENDPOINT, AZURE_BLOB_CONNECTION_STRING, AZURE_BLOB_CONTAINER_NAME,
 * AZURE_BLOB_FOLDER_PATH, BLOB_SOURCE_APPROVED=true, OPENAI_COMPATIBLE_EMBEDDINGS_URI,
 * OPENAI_COMPATIBLE_EMBEDDING_MODEL_NAME, OPENAI_COMPATIBLE_EMBEDDING_DIMENSIONS,
 * and OPENAI_COMPATIBLE_API_KEY. OPENAI_COMPATIBLE_AUTH_HEADER defaults to api-key.
 * The complete HTTPS embeddings URI must select the deployed model.
 *
 * For image ingestion also set COMPATIBLE_BLOB_IMAGE_VERBALIZATION=true,
 * OPENAI_COMPATIBLE_CHAT_URI, OPENAI_COMPATIBLE_CHAT_MODEL_NAME, and
 * BLOB_EXPECTED_CONTENT to a distinctive visible fact in the approved image fixture
 * (for fixtures/hotel.png, use "Alpine").
 * The chat endpoint must support image input. Text mode defaults BLOB_EXPECTED_CONTENT
 * to "Alpine", matching fixtures/hotelGraph.txt. Use a dedicated, nonempty folder;
 * source blobs are never modified. Search needs storage/model access.
 * This incurs ingestion/model usage. Only this run's Search resources are removed.
 */

const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");
const { delay } = require("@azure/core-util");
const { DefaultAzureCredential } = require("@azure/identity");
const {
  AzureKeyCredential,
  SearchIndexClient,
  SearchIndexerClient,
} = require("@azure/search-documents");
const { SearchIndexClient: ProtocolIndexClient } = require("@azure/search-documents/searchIndex");
require("dotenv/config");

async function main() {
  const endpoint = process.env.ENDPOINT;
  const connectionString = process.env.AZURE_BLOB_CONNECTION_STRING;
  const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
  const folderPath = process.env.AZURE_BLOB_FOLDER_PATH;
  const uri = process.env.OPENAI_COMPATIBLE_EMBEDDINGS_URI;
  const modelName = process.env.OPENAI_COMPATIBLE_EMBEDDING_MODEL_NAME;
  const dimensions = Number(process.env.OPENAI_COMPATIBLE_EMBEDDING_DIMENSIONS);
  const apiKey = process.env.OPENAI_COMPATIBLE_API_KEY;
  const images = process.env.COMPATIBLE_BLOB_IMAGE_VERBALIZATION === "true";
  const expected = process.env.BLOB_EXPECTED_CONTENT || (images ? "" : "Alpine");
  assert(
    endpoint &&
      connectionString &&
      containerName &&
      folderPath &&
      uri &&
      modelName &&
      apiKey &&
      Number.isInteger(dimensions) &&
      dimensions > 0 &&
      expected,
    "Set the Blob fixture, compatible model, dimensions, and expected-content settings.",
  );
  assert.equal(process.env.BLOB_SOURCE_APPROVED, "true", "Approve the dedicated fixture folder.");
  assert(
    folderPath.trim() && folderPath.replace(/[/\\]/g, "").trim() && !/^[/\\]/.test(folderPath),
    "Use a nonempty Blob folder prefix, not the container root.",
  );
  assert.equal(new URL(uri).protocol, "https:");
  const headers = { [process.env.OPENAI_COMPATIBLE_AUTH_HEADER || "api-key"]: apiKey };
  let chatCompletionModel;
  if (images) {
    const chatUri = process.env.OPENAI_COMPATIBLE_CHAT_URI;
    const chatModel = process.env.OPENAI_COMPATIBLE_CHAT_MODEL_NAME;
    assert(chatUri && chatModel, "Set a compatible image-capable chat endpoint and model.");
    assert.equal(new URL(chatUri).protocol, "https:");
    chatCompletionModel = {
      kind: "openAICompatible",
      openAICompatibleParameters: { uri: chatUri, modelName: chatModel, headers },
    };
  }
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
  const sourceName = `sample-compatible-blob-${randomUUID()}`;
  const cleanup = [];
  const failures = [];
  let sourceCleanupError;
  try {
    await client.createKnowledgeSource({
      name: sourceName,
      kind: "azureBlob",
      azureBlobParameters: {
        connectionString,
        containerName,
        folderPath,
        ingestionParameters: {
          contentExtractionMode: "minimal",
          disableImageVerbalization: !images,
          embeddingModel: {
            kind: "openAICompatible",
            openAICompatibleParameters: { uri, modelName, dimensions, headers },
          },
          chatCompletionModel,
        },
      },
    });
    cleanup.push(async () => {
      try {
        await client.deleteKnowledgeSource(sourceName);
      } catch (error) {
        sourceCleanupError = error;
      }
    });
    let resources;
    for (let attempt = 0; ; attempt++) {
      const source = await protocol.getKnowledgeSource(sourceName);
      assert(source.kind === "azureBlob" && "azureBlobParameters" in source);
      resources = source.azureBlobParameters.createdResources?.additionalProperties;
      if (resources?.index && resources.indexer && resources.skillset && resources.datasource) {
        break;
      }
      assert(attempt < 36, "Timed out waiting for the owned ingestion resources.");
      await delay(5000);
    }
    for (const [kind, name] of [
      ["indexer", resources.indexer],
      ["skillset", resources.skillset],
      ["datasource", resources.datasource],
      ["index", resources.index],
    ]) {
      assert(name.startsWith(`${sourceName}-`), "Generated resources must belong to this source.");
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
    assert.equal(
      (await indexers.getDataSourceConnection(resources.datasource)).container.query,
      folderPath,
    );
    for (let attempt = 0; ; attempt++) {
      const status = await client.getKnowledgeSourceStatus(sourceName);
      const execution = (await indexers.getIndexerStatus(resources.indexer)).lastResult;
      assert(
        !status.currentSynchronizationState?.itemsUpdatesFailed,
        "Ingestion reported failed items.",
      );
      assert(
        !execution?.errors?.length,
        "Inspect indexer errors for model or storage access failures.",
      );
      if (
        !status.currentSynchronizationState &&
        status.lastSynchronizationState?.endTime &&
        execution?.status === "success"
      ) {
        assert.equal(status.lastSynchronizationState.itemsUpdatesFailed, 0);
        assert(
          status.lastSynchronizationState.itemsUpdatesProcessed > 0,
          "Ingest at least one fixture.",
        );
        assert.equal(execution.failedItemCount, 0);
        break;
      }
      assert(attempt < 90, "Timed out waiting for compatible Blob ingestion.");
      await delay(5000);
    }
    const schema = await protocol.getIndex(resources.index);
    const vector = schema.fields.find((field) => field.vectorSearchDimensions === dimensions);
    const text = schema.fields.find((field) => ["snippet", "content"].includes(field.name));
    assert(
      vector && text,
      "Expected indexed text and a vector field with the configured dimensions.",
    );
    const search = client.getSearchClient(resources.index);
    for (let attempt = 0; ; attempt++) {
      const matches = await search.search("*", { top: 20 });
      let found = false;
      for await (const hit of matches.results) {
        const content = hit.document[text.name];
        if (typeof content === "string" && content.toLowerCase().includes(expected.toLowerCase())) {
          found = true;
          console.log(images ? "Verbalized image content:" : "Ingested Blob content:", content);
        }
      }
      if (found) break;
      assert(attempt < 30, "Indexed content must contain the expected fixture fact.");
      await delay(1000);
    }
    const matches = await search.search("*", {
      vectorSearchOptions: {
        queries: [
          { kind: "text", text: expected, fields: [vector.name], kNearestNeighborsCount: 1 },
        ],
      },
      top: 1,
    });
    assert(
      !(await matches.results.next()).done,
      "Managed ingestion must produce searchable embeddings.",
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
    // A partially completed service-side cascade can require deleting the owned children first.
    if (sourceCleanupError) {
      try {
        await client.deleteKnowledgeSource(sourceName);
      } catch (error) {
        failures.push(error);
      }
    }
  }
  if (failures.length) {
    throw new AggregateError(failures, "Compatible Blob ingestion or cleanup failed.");
  }
}

main().catch((error) => {
  console.error("Compatible Blob ingestion failed:", error);
  process.exitCode = 1;
});

module.exports = { main };
