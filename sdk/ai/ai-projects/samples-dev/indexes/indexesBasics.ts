// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the AIProjectClient to manage indexes.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all indexes,
 * get the properties of an index by its name, and delete an index.
 */

import { AIProjectClient } from "@azure/ai-projects";
import type { AzureAISearchIndex } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint =
  process.env["AZURE_AI_AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const azureAIIndexName = process.env["AZURE_AI_SEARCH_INDEX_NAME"] || "<index name>";
const azureAIIndexVersion = process.env["AZURE_AI_SEARCH_INDEX_VERSION"] || "<index version>";
const azureAIConnectionName = process.env["AZURE_AI_SEARCH_CONNECTION_NAME"] || "<connection name>";
export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  const name = "my-azure-search-index";
  const azureAIConnectionConfig: AzureAISearchIndex = {
    name,
    type: "AzureSearch",
    version: azureAIIndexVersion,
    indexName: azureAIIndexName,
    connectionName: azureAIConnectionName,
  };

  // Create a new Index
  const newIndex = await project.indexes.createOrUpdate(name, "1.0", azureAIConnectionConfig);
  console.log("Created a new Index:", newIndex);
  console.log(`Get an existing Index version '${newIndex.version}':`);
  const index = await project.indexes.get(name, newIndex.version);
  console.log(index);

  console.log(`Listing all versions of the Index named '${name}':`);
  const indexVersions = project.indexes.listVersions(name);
  for await (const indexVersion of indexVersions) {
    console.log(indexVersion);
  }

  console.log("List all Indexes:");
  const allIndexes = project.indexes.list();
  for await (const i of allIndexes) {
    console.log("Index:", i);
  }

  console.log("Delete the Index versions created above:");
  await project.indexes.delete(name, newIndex.version);

  console.log("Index operations completed successfully");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
