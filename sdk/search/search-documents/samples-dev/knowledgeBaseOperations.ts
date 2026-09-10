// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Knowledge Base CRUD operations, including a tags
 * create/get/update round trip. Tags are user-defined metadata only; they
 * do not provide billing attribution or change retrieval behavior.
 */

import { DefaultAzureCredential } from "@azure/identity";
import type { KnowledgeBase, SearchIndexKnowledgeSource } from "@azure/search-documents";
import { SearchIndexClient } from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const TEST_KNOWLEDGE_BASE_NAME = "example-knowledge-base-sample-1";
const TEST_KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-for-kb-sample";
const TEST_INDEX_NAME = "example-index-for-kb-sample";

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
    ],
  };
  await client.createIndex(index);
  console.log(`Created search index: ${TEST_INDEX_NAME}`);

  // Create a knowledge source that will be referenced by the knowledge base
  const knowledgeSource: SearchIndexKnowledgeSource = {
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

async function createKnowledgeBase(
  knowledgeBaseName: string,
  client: SearchIndexClient,
): Promise<void> {
  console.log(`Creating Knowledge Base Operation`);
  const knowledgeBase: KnowledgeBase = {
    name: knowledgeBaseName,
    knowledgeSources: [{ name: TEST_KNOWLEDGE_SOURCE_NAME }],
    description: "A sample knowledge base for demonstration purposes",
    tags: { environment: "sample", owner: "search-team" },
  };
  const result = await client.createKnowledgeBase(knowledgeBase);
  if (result.tags?.environment !== "sample") {
    throw new Error("Knowledge base tags did not round-trip on create");
  }
  console.log(`Created knowledge base: ${result.name}`);
  console.log(`Tags (metadata only): ${JSON.stringify(result.tags)}`);
  console.log(`Knowledge sources: ${result.knowledgeSources.map((ks) => ks.name).join(", ")}`);
}

async function getAndUpdateKnowledgeBase(
  knowledgeBaseName: string,
  client: SearchIndexClient,
): Promise<void> {
  console.log(`Get And Update Knowledge Base Operation`);
  const knowledgeBase: KnowledgeBase = await client.getKnowledgeBase(knowledgeBaseName);
  console.log(`Retrieved knowledge base: ${knowledgeBase.name}`);
  if (knowledgeBase.tags?.owner !== "search-team") {
    throw new Error("Knowledge base tags did not round-trip on get");
  }

  // Replace the description and tags. Tags are metadata, not billing attribution.
  knowledgeBase.description = "Updated description for the sample knowledge base";
  knowledgeBase.tags = { environment: "sample", owner: "sdk-team", lifecycle: "updated" };
  const updatedKnowledgeBase = await client.createOrUpdateKnowledgeBase(knowledgeBase);
  console.log(`Updated knowledge base description: ${updatedKnowledgeBase.description}`);
  if (updatedKnowledgeBase.tags?.owner !== "sdk-team") {
    throw new Error("Knowledge base tags did not round-trip on update");
  }
  console.log(`Updated tags (metadata only): ${JSON.stringify(updatedKnowledgeBase.tags)}`);
}

async function listKnowledgeBases(client: SearchIndexClient): Promise<void> {
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

async function deleteKnowledgeBase(
  knowledgeBaseName: string,
  client: SearchIndexClient,
): Promise<void> {
  console.log(`Deleting Knowledge Base Operation`);
  await client.deleteKnowledgeBase(knowledgeBaseName);
  console.log(`Deleted knowledge base: ${knowledgeBaseName}`);
}

async function cleanupPrerequisites(client: SearchIndexClient): Promise<void> {
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

async function main(): Promise<void> {
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
