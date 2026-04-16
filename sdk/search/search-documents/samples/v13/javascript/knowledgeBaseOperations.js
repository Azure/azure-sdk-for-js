// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the Knowledge Base Operations.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SearchIndexClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";
const TEST_KNOWLEDGE_BASE_NAME = "example-knowledge-base-sample-1";
const TEST_KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-for-kb-sample";
const TEST_INDEX_NAME = "example-index-for-kb-sample";

async function setupPrerequisites(client) {
  console.log(`Setting up prerequisites...`);

  // Create a search index that will be used by the knowledge source
  const index = {
    name: TEST_INDEX_NAME,
    fields: [
      {
        type: "Edm.String",
        name: "id",
        key: true,
      },
      {
        type: "Edm.String",
        name: "content",
        searchable: true,
      },
    ],
  };
  await client.createIndex(index);
  console.log(`Created search index: ${TEST_INDEX_NAME}`);

  // Create a knowledge source that will be referenced by the knowledge base
  const knowledgeSource = {
    name: TEST_KNOWLEDGE_SOURCE_NAME,
    kind: "searchIndex",
    description: "A knowledge source for knowledge base demonstration",
    searchIndexParameters: {
      searchIndexName: TEST_INDEX_NAME,
    },
  };
  await client.createKnowledgeSource(knowledgeSource);
  console.log(`Created knowledge source: ${TEST_KNOWLEDGE_SOURCE_NAME}`);
}

async function createKnowledgeBase(knowledgeBaseName, client) {
  console.log(`Creating Knowledge Base Operation`);
  const knowledgeBase = {
    name: knowledgeBaseName,
    knowledgeSources: [{ name: TEST_KNOWLEDGE_SOURCE_NAME }],
    description: "A sample knowledge base for demonstration purposes",
  };
  const result = await client.createKnowledgeBase(knowledgeBase);
  console.log(`Created knowledge base: ${result.name}`);
  console.log(`Knowledge sources: ${result.knowledgeSources.map((ks) => ks.name).join(", ")}`);
}

async function getAndUpdateKnowledgeBase(knowledgeBaseName, client) {
  console.log(`Get And Update Knowledge Base Operation`);
  const knowledgeBase = await client.getKnowledgeBase(knowledgeBaseName);
  console.log(`Retrieved knowledge base: ${knowledgeBase.name}`);

  // Update the description
  knowledgeBase.description = "Updated description for the sample knowledge base";
  const updatedKnowledgeBase = await client.createOrUpdateKnowledgeBase(
    knowledgeBaseName,
    knowledgeBase,
  );
  console.log(`Updated knowledge base description: ${updatedKnowledgeBase.description}`);
}

async function listKnowledgeBases(client) {
  console.log(`List Knowledge Bases Operation`);
  const result = client.listKnowledgeBases();
  let listOfKnowledgeBases = await result.next();

  console.log(`List of Knowledge Bases`);
  console.log(`***********************`);
  while (!listOfKnowledgeBases.done) {
    console.log(`Name: ${listOfKnowledgeBases.value.name}`);
    console.log(`Description: ${listOfKnowledgeBases.value.description ?? "N/A"}`);
    console.log(
      `Knowledge Sources: ${listOfKnowledgeBases.value.knowledgeSources.map((ks) => ks.name).join(", ") || "None"}`,
    );
    console.log();
    listOfKnowledgeBases = await result.next();
  }
}

async function deleteKnowledgeBase(knowledgeBaseName, client) {
  console.log(`Deleting Knowledge Base Operation`);
  await client.deleteKnowledgeBase(knowledgeBaseName);
  console.log(`Deleted knowledge base: ${knowledgeBaseName}`);
}

async function cleanupPrerequisites(client) {
  console.log(`Cleaning up prerequisites...`);
  try {
    await client.deleteKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME);
    console.log(`Deleted knowledge source: ${TEST_KNOWLEDGE_SOURCE_NAME}`);
  } catch (e) {
    console.log(`Failed to delete knowledge source: ${e}`);
  }
  try {
    await client.deleteIndex(TEST_INDEX_NAME);
    console.log(`Deleted search index: ${TEST_INDEX_NAME}`);
  } catch (e) {
    console.log(`Failed to delete index: ${e}`);
  }
}

async function main() {
  console.log(`Running Knowledge Base Operations Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid endpoint with proper authorization.");
    return;
  }
  const credential = new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential);

  try {
    await setupPrerequisites(client);
    await createKnowledgeBase(TEST_KNOWLEDGE_BASE_NAME, client);
    await getAndUpdateKnowledgeBase(TEST_KNOWLEDGE_BASE_NAME, client);
    await listKnowledgeBases(client);
  } finally {
    await deleteKnowledgeBase(TEST_KNOWLEDGE_BASE_NAME, client);
    await cleanupPrerequisites(client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
