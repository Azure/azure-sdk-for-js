// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic files agent operations with local file upload from the Azure Agents service.
 *
 * @summary demonstrates how to use basic files agent operations with local file upload.
 */

const { AIProjectsClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv").config();
const fs = require("fs");
const path = require("node:path");

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] ||
  "<endpoint>>;<subscription>;<resource group>;<project>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Upload local file
  const filePath = path.resolve(__dirname, "../data/localFile.txt");
  const localFileStream = fs.createReadStream(filePath);
  const localFile = await client.agents.uploadFile(
    localFileStream,
    "assistants",
    "myLocalFile.txt",
  );

  console.log(`Uploaded local file, file ID : ${localFile.id}`);

  // Retrieve local file
  const retrievedLocalFile = await client.agents.getFile(localFile.id);

  console.log(`Retrieved local file, file ID : ${retrievedLocalFile.id}`);

  // Delete local file
  await client.agents.deleteFile(localFile.id);

  console.log(`Deleted local file, file ID : ${localFile.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
