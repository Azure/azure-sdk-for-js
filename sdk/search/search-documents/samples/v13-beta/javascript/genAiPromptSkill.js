// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Run ChatCompletionSkill during Blob indexing and verify generated hotel facts.
 *
 * Set ENDPOINT, AZURE_BLOB_CONNECTION_STRING, AZURE_BLOB_CONTAINER_NAME,
 * AZURE_BLOB_FOLDER_PATH, BLOB_SOURCE_APPROVED=true, SEARCH_SKILL_CHAT_URI and
 * SEARCH_SKILL_CHAT_API_KEY. Upload exactly one copy of fixtures/hotelGraph.txt
 * (text/plain) to a dedicated nonempty folder. Source blobs are read-only.
 *
 * Use a supported deployed Azure OpenAI/Foundry Chat Completions HTTPS URI, not a
 * Responses endpoint. This skill uses apiKey, not compatible-model header maps.
 * Search needs access to Blob storage and the model. Ingestion/model usage applies.
 * Only the index, data source, skillset and indexer created by this run are deleted.
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
require("dotenv/config");

async function main() {
  const endpoint = process.env.ENDPOINT;
  const connectionString = process.env.AZURE_BLOB_CONNECTION_STRING;
  const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
  const folderPath = process.env.AZURE_BLOB_FOLDER_PATH;
  const uri = process.env.SEARCH_SKILL_CHAT_URI;
  const apiKey = process.env.SEARCH_SKILL_CHAT_API_KEY;
  assert(
    endpoint && connectionString && containerName && folderPath && uri && apiKey,
    "Set the approved Blob fixture and ChatCompletionSkill settings.",
  );
  assert.equal(process.env.BLOB_SOURCE_APPROVED, "true", "Approve the dedicated fixture folder.");
  assert(
    folderPath.trim() && folderPath.replace(/[/\\]/g, "").trim() && !/^[/\\]/.test(folderPath),
    "Use a nonempty Blob folder prefix, not the container root.",
  );
  const url = new URL(uri);
  assert(
    url.protocol === "https:" && url.pathname.endsWith("/chat/completions"),
    "Use a supported HTTPS Chat Completions endpoint.",
  );
  const credential = process.env.AZURE_SEARCH_API_KEY
    ? new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY)
    : new DefaultAzureCredential();
  const options = { serviceVersion: "2026-11-01-preview" };
  const indexes = new SearchIndexClient(endpoint, credential, options);
  const indexers = new SearchIndexerClient(endpoint, credential, options);
  const name = `sample-genai-${randomUUID()}`;
  const cleanup = [];
  const failures = [];
  try {
    await indexes.createIndex({
      name,
      fields: [
        { name: "id", type: "Edm.String", key: true },
        { name: "content", type: "Edm.String", searchable: true },
        { name: "hotelFacts", type: "Edm.String", searchable: true },
      ],
    });
    cleanup.push(() => indexes.deleteIndex(name));
    await indexers.createDataSourceConnection({
      name,
      type: "azureblob",
      connectionString,
      container: { name: containerName, query: folderPath },
    });
    cleanup.push(() => indexers.deleteDataSourceConnection(name));
    await indexers.createSkillset({
      name,
      skills: [
        {
          odatatype: "#Microsoft.Skills.Custom.ChatCompletionSkill",
          name: "hotel-facts",
          context: "/document",
          uri,
          apiKey,
          inputs: [
            {
              name: "systemMessage",
              source: "='Extract only hotel facts explicitly in the text.'",
            },
            {
              name: "userMessage",
              source: "='List each hotel and its operator. Preserve their exact names.'",
            },
            { name: "text", source: "/document/content" },
          ],
          outputs: [{ name: "response", targetName: "hotelFacts" }],
        },
      ],
    });
    cleanup.push(() => indexers.deleteSkillset(name));
    await indexers.createIndexer({
      name,
      dataSourceName: name,
      targetIndexName: name,
      skillsetName: name,
      parameters: {
        batchSize: 1,
        maxFailedItems: 0,
        maxFailedItemsPerBatch: 0,
        configuration: {
          indexedFileNameExtensions: ".txt",
          failOnUnsupportedContentType: true,
          failOnUnprocessableDocument: true,
        },
      },
      fieldMappings: [
        {
          sourceFieldName: "metadata_storage_path",
          targetFieldName: "id",
          mappingFunction: { name: "base64Encode" },
        },
      ],
      outputFieldMappings: [
        { sourceFieldName: "/document/hotelFacts", targetFieldName: "hotelFacts" },
      ],
    });
    cleanup.push(() => indexers.deleteIndexer(name));
    for (let attempt = 0; ; attempt++) {
      const execution = (await indexers.getIndexerStatus(name)).lastResult;
      assert(
        !execution?.errors?.length,
        "Inspect ChatCompletionSkill errors and endpoint compatibility.",
      );
      if (execution?.status === "success") {
        assert.equal(execution.failedItemCount, 0);
        assert.equal(execution.itemCount, 1, "Use exactly one copy of the hotel fixture.");
        assert(!execution.warnings?.length, "Enrichment must not silently skip fixture content.");
        break;
      }
      assert(attempt < 90, "Timed out waiting for ChatCompletionSkill indexing.");
      await delay(5000);
    }
    const search = indexes.getSearchClient(name);
    for (let attempt = 0; ; attempt++) {
      if ((await search.getDocumentsCount()) === 1) break;
      assert(attempt < 30, "Expected exactly one enriched fixture document.");
      await delay(1000);
    }
    const result = await search.search("*", { select: ["id", "content", "hotelFacts"], top: 2 });
    const documents = [];
    for await (const hit of result.results) documents.push(hit.document);
    assert.equal(documents.length, 1);
    const document = documents[0];
    assert(document.content.includes("Alpine") && document.content.includes("Harbor"));
    assert.equal(typeof document.hotelFacts, "string", "The skill must generate a new field.");
    for (const fact of ["alpine", "summit hospitality", "harbor", "coast hospitality"]) {
      assert(
        document.hotelFacts.toLowerCase().includes(fact),
        `Missing generated fixture fact: ${fact}`,
      );
    }
    console.log("Generated hotel facts:", document.hotelFacts);
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
  }
  if (failures.length) {
    throw new AggregateError(failures, "GenAI enrichment or cleanup failed.");
  }
}

main().catch((error) => {
  console.error("GenAI enrichment failed:", error);
  process.exitCode = 1;
});

module.exports = { main };
