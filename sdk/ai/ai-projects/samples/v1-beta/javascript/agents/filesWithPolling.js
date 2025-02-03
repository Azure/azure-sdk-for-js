// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to upload a file and poll for its status.
 *
 * @summary demonstrates how to upload a file and poll for its status.
 */

const { AIProjectsClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");
const { Readable } = require("stream");
dotenv.config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Create file content
  const fileContent = "Hello, World!";
  const readable = new Readable();
  readable.push(fileContent);
  readable.push(null); // end the stream

  // Upload file and poll
  const poller = client.agents.uploadFileAndPoll(readable, "assistants", {
    fileName: "myPollingFile",
  });
  const file = await poller.pollUntilDone();
  console.log(`Uploaded file with status ${file.status}, file ID : ${file.id}`);

  // Delete file
  await client.agents.deleteFile(file.id);
  console.log(`Deleted file, file ID ${file.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
