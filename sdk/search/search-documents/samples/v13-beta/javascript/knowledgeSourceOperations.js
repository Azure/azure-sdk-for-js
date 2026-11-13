// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates generic CRUD operations on knowledge sources:
 * create / get / update / list / status / delete. For samples specific
 * to direct file upload, see `knowledgeSourceFile.ts`. This sample also
 * demonstrates private Blob ingestion, the GA SharePoint all-site scope,
 * web retrieval settings, and an indexed SQL source when its connection settings are provided.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const {
  KnownKnowledgeSourceNetworkAccessMode,
  KnownIndexedSharePointContainerName,
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
const sharePointConnectionString = process.env.SHAREPOINT_CONNECTION_STRING || "";
const sqlConnectionString = process.env.AZURE_SQL_CONNECTION_STRING || "";
const sqlTableOrView = process.env.AZURE_SQL_TABLE_OR_VIEW || "";

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
    },
  };
  const result = await client.createKnowledgeSource(knowledgeSource);
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

async function demonstrateSharePointScope(client) {
  if (!sharePointConnectionString) {
    console.log(
      "Set SHAREPOINT_CONNECTION_STRING to demonstrate indexing all SharePoint site content.",
    );
    return;
  }

  const sourceName = "example-all-site-content-source";
  await client.createKnowledgeSource({
    name: sourceName,
    kind: "indexedSharePoint",
    indexedSharePointParameters: {
      connectionString: sharePointConnectionString,
      containerName: KnownIndexedSharePointContainerName.AllSiteContent,
    },
  });
  try {
    const source = await client.getKnowledgeSource(sourceName);
    if (source.kind === "indexedSharePoint" && "indexedSharePointParameters" in source) {
      console.log(`SharePoint scope: ${source.indexedSharePointParameters.containerName}`);
    }
  } finally {
    await client.deleteKnowledgeSource(sourceName);
  }
}

async function demonstrateIndexedSqlSource(client) {
  if (!sqlConnectionString || !sqlTableOrView) {
    console.log(
      "Set AZURE_SQL_CONNECTION_STRING and AZURE_SQL_TABLE_OR_VIEW to demonstrate indexed SQL.",
    );
    return;
  }

  const sourceName = "example-indexed-sql-source";
  await client.createKnowledgeSource({
    name: sourceName,
    kind: "indexedSql",
    indexedSqlParameters: {
      connectionString: sqlConnectionString,
      tableOrView: sqlTableOrView,
      contentColumns: [{ name: "content", sourceField: "content", searchFieldType: "Edm.String" }],
    },
  });
  try {
    const status = await client.getKnowledgeSourceStatus(sourceName);
    console.log(`Indexed SQL synchronization: ${status.synchronizationStatus}`);
  } finally {
    await client.deleteKnowledgeSource(sourceName);
  }
}

async function demonstrateWebSettings(client) {
  const sourceName = "example-web-source";
  await client.createKnowledgeSource({
    name: sourceName,
    kind: "web",
    webParameters: {
      language: "en",
      market: "en-US",
      count: 5,
      freshness: "Month",
    },
  });
  try {
    const source = await client.getKnowledgeSource(sourceName);
    console.log(`Created web knowledge source: ${source.name}`);
  } finally {
    await client.deleteKnowledgeSource(sourceName);
  }
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
    await demonstrateSharePointScope(client);
    await demonstrateIndexedSqlSource(client);
    await demonstrateWebSettings(client);
  } finally {
    await client.deleteKnowledgeSource(PRIVATE_BLOB_SOURCE_NAME).catch(() => {});
    await deleteKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME, client).catch(() => {});
    await cleanupPrerequisites(client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
