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

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Create and upload file
  const fileContent = "Hello, World!";

  const readable = Readable.from(Buffer.from(fileContent));
  // Add fileName to options for proper multipart/form-data formatting
  const file = await client.files.upload(readable, "assistants", { fileName: "file.txt" });
  console.log(`Uploaded file, file ID : ${file.id}`);

  // List uploaded files
  const files = await client.files.list();

  console.log(`List of files : ${files.data[0].filename}`);

  // Retrieve file
  const _file = await client.files.get(file.id);

  console.log(`Retrieved file, file ID : ${_file.id}`);

  // Delete file
  await client.files.delete(file.id);

  console.log(`Deleted file, file ID : ${file.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
