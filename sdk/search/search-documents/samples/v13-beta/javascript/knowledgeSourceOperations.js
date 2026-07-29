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
const { SearchIndexClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";

const TEST_KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-sample-1";
const TEST_INDEX_NAME = "example-index-for-source-sample";

async function setupPrerequisites(client) {
  console.log(`Setting up prerequisites...`);
  await client.createIndex({
    name: TEST_INDEX_NAME,
    fields: [
      { type: "Edm.String", name: "id", key: true },
      { type: "Edm.String", name: "content", searchable: true },
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
    searchIndexParameters: { searchIndexName: TEST_INDEX_NAME },
  };
  const result = await client.createKnowledgeSource(knowledgeSource);
  console.log(`Created knowledge source: ${result.name} (kind=${result.kind})`);
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
  try {
    await setupPrerequisites(client);
    await createKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME, client);
    await getAndUpdateKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME, client);
    await getKnowledgeSourceStatus(TEST_KNOWLEDGE_SOURCE_NAME, client);
    await listKnowledgeSources(client);
  } finally {
    await deleteKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME, client).catch(() => {});
    await cleanupPrerequisites(client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
