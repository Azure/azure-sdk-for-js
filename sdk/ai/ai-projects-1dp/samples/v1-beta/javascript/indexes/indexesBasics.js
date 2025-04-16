// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the AIProjectClient to manage indexes.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all indexes,
 * get the properties of an index by its name, and delete an index.
 */

const { AIProjectClient } = require("@azure/ai-projects-1dp");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";

async function main() {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  const indexName = "sample-index";
  const version = "1";
  const azureAIConnectionConfig = {
    name: indexName,
    type: "AzureSearch",
    version,
    indexName,
    connectionName: "sample-connection",
  };

  // Create a new Index
  const newIndex = await project.indexes.createVersion(indexName, version, azureAIConnectionConfig);
  console.log("Created a new Index:", newIndex);
  console.log(`Get an existing Index version '${version}':`);
  const index = await project.indexes.getVersion(indexName, version);
  console.log(index);

  console.log(`Listing all versions of the Index named '${indexName}':`);
  const indexVersions = project.indexes.listVersions(indexName);
  for await (const indexVersion of indexVersions) {
    console.log(indexVersion);
  }

  console.log("List latest versions of all Indexes:");
  const latestIndexes = project.indexes.listLatest();
  for await (const latestIndex of latestIndexes) {
    console.log(latestIndex);
  }

  console.log("Delete the Index versions created above:");
  await project.indexes.deleteVersion(indexName, version);

  console.log("Index operations completed successfully");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
