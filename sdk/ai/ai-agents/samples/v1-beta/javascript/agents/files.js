// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic files agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic files agent operations.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");

const { Readable } = require("node:stream");
require("dotenv/config");

const connectionString = process.env["PROJECT_ENDPOINT"] || "<project connection string>";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(connectionString, new DefaultAzureCredential());

  // Create and upload file
  const fileContent = "Hello, World!";

  const readable = Readable.from(Buffer.from(fileContent));
  // Add fileName to options for proper multipart/form-data formatting
  const file = await client.uploadFile(readable, "assistants", { fileName: "file.txt" });
  console.log(`Uploaded file, file ID : ${file.id}`);

  // List uploaded files
  const files = await client.listFiles();

  console.log(`List of files : ${files.data[0].filename}`);

  // Retrieve file
  const _file = await client.getFile(file.id);

  console.log(`Retrieved file, file ID : ${_file.id}`);

  // Delete file
  await client.deleteFile(file.id);

  console.log(`Deleted file, file ID : ${file.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
