// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic files agent operations with local file upload from the Azure Agents service.
 *
 * @summary demonstrates how to use basic files agent operations with local file upload.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");

const fs = require("fs");
require("dotenv/config");

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Upload local file
  const filePath = "./data/localFile.txt";
  const localFileStream = fs.createReadStream(filePath);
  const localFile = await client.files.upload(localFileStream, "assistants", {
    fileName: "localFile.txt",
  });

  console.log(`Uploaded local file, file ID : ${localFile.id}`);

  // Retrieve local file
  const retrievedLocalFile = await client.files.get(localFile.id);

  console.log(`Retrieved local file, file ID : ${retrievedLocalFile.id}`);

  // Delete local file
  await client.files.delete(localFile.id);

  console.log(`Deleted local file, file ID : ${localFile.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
