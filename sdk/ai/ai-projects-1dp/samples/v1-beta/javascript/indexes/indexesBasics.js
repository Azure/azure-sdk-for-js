// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the AIProjectClient to manage indexes.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all indexes,
 * get the properties of an index by its name, and delete an index.
 */

const { AIProjectClient } = require("@azure/ai-projects-1dp");
const { AzureKeyCredential } = require("@azure/core-auth");
require("dotenv").config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const apiKey = process.env["AZURE_AI_PROJECT_API_KEY"] || "<project key>";

async function main() {
  const project = new AIProjectClient(endpoint, new AzureKeyCredential(apiKey));

  // For demonstration purposes, specify an index name
  const indexName = "sample-index";
  console.log("Get an existing Index version `1`:");
  const index = await project.indexes.getVersion(indexName, "1");
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
  await project.indexes.deleteVersion(indexName, "1");

  console.log("Index operations completed successfully");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
