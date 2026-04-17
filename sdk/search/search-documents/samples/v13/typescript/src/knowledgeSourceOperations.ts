// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the Knowledge Source Operations.
 */

import { DefaultAzureCredential } from "@azure/identity";
import type { SearchIndexKnowledgeSource, KnowledgeBase } from "@azure/search-documents";
import { SearchIndexClient } from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const TEST_KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-sample-1";
const TEST_KNOWLEDGE_BASE_NAME = "example-knowledge-base-for-source-sample";
const TEST_INDEX_NAME = "example-index-for-source-sample";

async function setupPrerequisites(client: SearchIndexClient): Promise<void> {
  console.log(`Setting up prerequisites...`);

  // Create a search index that will be used by the knowledge source
  const index = {
    name: TEST_INDEX_NAME,
    fields: [
      {
        type: "Edm.String" as const,
        name: "id",
        key: true,
      },
      {
        type: "Edm.String" as const,
        name: "content",
        searchable: true,
      },
      {
        type: "Edm.String" as const,
        name: "title",
        searchable: true,
        filterable: true,
      },
    ],
  };
  await client.createIndex(index);
  console.log(`Created search index: ${TEST_INDEX_NAME}`);

  // Create a knowledge base to associate with the knowledge source
  const knowledgeBase: KnowledgeBase = {
    name: TEST_KNOWLEDGE_BASE_NAME,
    knowledgeSources: [],
    description: "A knowledge base for knowledge source demonstration",
  };
  await client.createKnowledgeBase(knowledgeBase);
  console.log(`Created knowledge base: ${TEST_KNOWLEDGE_BASE_NAME}`);
}

async function createKnowledgeSource(
  sourceName: string,
  client: SearchIndexClient,
): Promise<void> {
  console.log(`Creating Knowledge Source Operation`);

  // Create a search index knowledge source
  const knowledgeSource: SearchIndexKnowledgeSource = {
    name: sourceName,
    kind: "searchIndex",
    description: "A sample search index knowledge source",
    searchIndexParameters: {
      searchIndexName: TEST_INDEX_NAME,
    },
  };

  const result = await client.createKnowledgeSource(knowledgeSource);
  console.log(`Created knowledge source: ${result.name}`);
  console.log(`Kind: ${result.kind}`);
}

async function getAndUpdateKnowledgeSource(
  sourceName: string,
  client: SearchIndexClient,
): Promise<void> {
  console.log(`Get And Update Knowledge Source Operation`);
  const knowledgeSource = await client.getKnowledgeSource(sourceName);
  console.log(`Retrieved knowledge source: ${knowledgeSource.name}`);
  console.log(`Kind: ${knowledgeSource.kind}`);

  // Update the description
  knowledgeSource.description = "Updated description for the sample knowledge source";
  const updatedSource = await client.createOrUpdateKnowledgeSource(knowledgeSource);
  console.log(`Updated knowledge source description: ${updatedSource.description}`);
}

async function getKnowledgeSourceStatus(
  sourceName: string,
  client: SearchIndexClient,
): Promise<void> {
  console.log(`Get Knowledge Source Status Operation`);
  const status = await client.getKnowledgeSourceStatus(sourceName);
  console.log(`Knowledge Source Status:`);
  console.log(`  Synchronization Status: ${status.synchronizationStatus ?? "N/A"}`);
  console.log(`  Kind: ${status.kind ?? "N/A"}`);
}

async function listKnowledgeSources(client: SearchIndexClient): Promise<void> {
  console.log(`List Knowledge Sources Operation`);
  const result = client.listKnowledgeSources();
  let listOfSources = await result.next();

  console.log(`List of Knowledge Sources`);
  console.log(`*************************`);
  while (!listOfSources.done) {
    console.log(`Name: ${listOfSources.value.name}`);
    console.log(`Kind: ${listOfSources.value.kind}`);
    console.log(`Description: ${listOfSources.value.description ?? "N/A"}`);
    console.log();
    listOfSources = await result.next();
  }
}

async function deleteKnowledgeSource(
  sourceName: string,
  client: SearchIndexClient,
): Promise<void> {
  console.log(`Deleting Knowledge Source Operation`);
  await client.deleteKnowledgeSource(sourceName);
  console.log(`Deleted knowledge source: ${sourceName}`);
}

async function cleanupPrerequisites(client: SearchIndexClient): Promise<void> {
  console.log(`Cleaning up prerequisites...`);
  try {
    await client.deleteKnowledgeBase(TEST_KNOWLEDGE_BASE_NAME);
    console.log(`Deleted knowledge base: ${TEST_KNOWLEDGE_BASE_NAME}`);
  } catch (e) {
    console.log(`Failed to delete knowledge base: ${e}`);
  }
  try {
    await client.deleteIndex(TEST_INDEX_NAME);
    console.log(`Deleted search index: ${TEST_INDEX_NAME}`);
  } catch (e) {
    console.log(`Failed to delete index: ${e}`);
  }
}

async function main(): Promise<void> {
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
    await deleteKnowledgeSource(TEST_KNOWLEDGE_SOURCE_NAME, client);
    await cleanupPrerequisites(client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
