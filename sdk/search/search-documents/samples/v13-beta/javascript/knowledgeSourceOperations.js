// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates generic CRUD operations on knowledge sources:
 * create / get / update / list / status / delete. For samples specific
 * to each knowledge source kind (e.g. `searchIndex`, `file`, `mcpServer`,
 * `indexedSharePoint`, `remoteSharePoint`, `workIQ`, `fabricDataAgent`,
 * `fabricOntology`) see the corresponding `*KnowledgeSource*` sample
 * files in this directory.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const {
  KnownKnowledgeSourceNetworkAccessMode,
  SearchIndexClient,
  SearchIndexerClient,
} = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const blobConnectionString = process.env.AZURE_BLOB_CONNECTION_STRING || "";
const blobContainerName = process.env.AZURE_BLOB_CONTAINER_NAME || "";
const aiServicesEndpoint = process.env.AZURE_AI_SERVICES_ENDPOINT || "";
const expectedAnalyzer = process.env.EXPECTED_LANGUAGE_ANALYZER || "";
const expectedFallbackAnalyzer = process.env.EXPECTED_FALLBACK_ANALYZER || "";

const TEST_KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-sample-1";
const TEST_INDEX_NAME = "example-index-for-source-sample";
const PRIVATE_BLOB_SOURCE_NAME = "example-private-blob-source-sample";

function assertSample(condition, message) {
  if (!condition) {
    throw new Error(`Sample assertion failed: ${message}`);
  }
}

async function setupPrerequisites(client) {
  console.log(`Setting up prerequisites...`);
  await client.createIndex({
    name: TEST_INDEX_NAME,
    fields: [
      { type: "Edm.String", name: "id", key: true },
      { type: "Edm.String", name: "content", searchable: true },
      { type: "Edm.String", name: "category", filterable: true },
      { type: "Edm.String", name: "priority", filterable: true },
    ],
  });
  console.log(`Created search index: ${TEST_INDEX_NAME}`);
}

async function createKnowledgeSource(sourceName, client) {
  console.log(`Creating Knowledge Source Operation`);
  const knowledgeSource = {
    name: sourceName,
    kind: "searchIndex",
    description: "A sample search index knowledge source",
    searchIndexParameters: {
      searchIndexName: TEST_INDEX_NAME,
      queryHints: {
        filters: [
          {
            field: "category",
            fieldValues: ["manual"],
            filterInstructions: "Prefer product manuals when the user asks how-to questions.",
          },
        ],
        boosts: [{ kind: "fieldValue", field: "priority", fieldValues: ["high"], boost: 2 }],
      },
    },
  };
  const result = await client.createKnowledgeSource(knowledgeSource);
  const createdSearchSource = result;
  assertSample(
    createdSearchSource.searchIndexParameters.queryHints?.filters?.[0]?.field === "category",
    "stored query hints should round-trip",
  );
  console.log(`Created knowledge source: ${result.name} (kind=${result.kind})`);
}

async function createPrivateBlobSource(indexClient, indexerClient) {
  if (!blobConnectionString || !blobContainerName || !aiServicesEndpoint) {
    console.log(
      "Skipping private Blob ingestion/analyzer inspection. Set AZURE_BLOB_CONNECTION_STRING, " +
        "AZURE_BLOB_CONTAINER_NAME, and AZURE_AI_SERVICES_ENDPOINT after provisioning the " +
        "required shared private links.",
    );
    return;
  }

  const source = {
    name: PRIVATE_BLOB_SOURCE_NAME,
    kind: "azureBlob",
    description: "Private Blob ingestion with service-selected language analyzers",
    azureBlobParameters: {
      connectionString: blobConnectionString,
      containerName: blobContainerName,
      ingestionParameters: {
        networkAccessMode: KnownKnowledgeSourceNetworkAccessMode.Private,
        contentExtractionMode: "minimal",
        aiServices: { uri: aiServicesEndpoint },
      },
    },
  };

  const created = await indexClient.createKnowledgeSource(source);
  assertSample(
    created.azureBlobParameters.ingestionParameters?.networkAccessMode === "private",
    "private networkAccessMode should round-trip",
  );

  const generatedResources = created.azureBlobParameters.createdResources ?? {};
  console.log(`Generated resources: ${JSON.stringify(generatedResources)}`);
  if (generatedResources.indexer) {
    const status = await indexerClient.getIndexerStatus(generatedResources.indexer);
    console.log(`Generated indexer status: ${status.status}`);
  }
  if (generatedResources.index) {
    const generatedIndex = await indexClient.getIndex(generatedResources.index);
    const selectedAnalyzers = generatedIndex.fields
      .filter((field) => "analyzerName" in field && field.analyzerName)
      .map((field) => ("analyzerName" in field ? field.analyzerName : undefined))
      .filter((name) => name !== undefined);
    console.log(`Service-selected analyzers: ${selectedAnalyzers.join(", ") || "none yet"}`);
    if (expectedAnalyzer) {
      assertSample(
        selectedAnalyzers.includes(expectedAnalyzer),
        `expected analyzer ${expectedAnalyzer} was not selected`,
      );
    }
    if (expectedFallbackAnalyzer) {
      assertSample(
        selectedAnalyzers.includes(expectedFallbackAnalyzer),
        `unsupported-language content should fall back to ${expectedFallbackAnalyzer}`,
      );
    }
  }
}

async function getAndUpdateKnowledgeSource(sourceName, client) {
  console.log(`Get And Update Knowledge Source Operation`);
  const knowledgeSource = await client.getKnowledgeSource(sourceName);
  console.log(`Retrieved knowledge source: ${knowledgeSource.name} (kind=${knowledgeSource.kind})`);

  knowledgeSource.description = "Updated description for the sample knowledge source";
  const updatedSource = await client.createOrUpdateKnowledgeSource(knowledgeSource);
  console.log(`Updated knowledge source description: ${updatedSource.description}`);
}

async function getKnowledgeSourceStatus(sourceName, client) {
  console.log(`Get Knowledge Source Status Operation`);
  const status = await client.getKnowledgeSourceStatus(sourceName);
  console.log(`Knowledge Source Status:`);
  console.log(`  Synchronization Status: ${status.synchronizationStatus ?? "N/A"}`);
  console.log(`  Kind: ${status.kind ?? "N/A"}`);
}

async function listKnowledgeSources(client) {
  console.log(`List Knowledge Sources Operation`);
  for await (const source of client.listKnowledgeSources()) {
    console.log(`  - ${source.name} (kind=${source.kind})`);
  }
}

async function deleteKnowledgeSource(sourceName, client) {
  console.log(`Deleting Knowledge Source Operation`);
  await client.deleteKnowledgeSource(sourceName);
  console.log(`Deleted knowledge source: ${sourceName}`);
}

async function cleanupPrerequisites(client) {
  console.log(`Cleaning up prerequisites...`);
  await client.deleteIndex(TEST_INDEX_NAME).catch(() => {});
}

async function main() {
  console.log(`Running Knowledge Source Operations Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid endpoint with proper authorization.");
    return;
  }
  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());
  const indexerClient = new SearchIndexerClient(endpoint, new DefaultAzureCredential());
  try {
    await setupPrerequisites(client);
    await createKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME, client);
    await getAndUpdateKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME, client);
    await getKnowledgeSourceStatus(TEST_KNOWLEDGE_SOURCE_NAME, client);
    await listKnowledgeSources(client);
    await createPrivateBlobSource(client, indexerClient);
  } finally {
    await client.deleteKnowledgeSource(PRIVATE_BLOB_SOURCE_NAME).catch(() => {});
    await deleteKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME, client).catch(() => {});
    await cleanupPrerequisites(client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
