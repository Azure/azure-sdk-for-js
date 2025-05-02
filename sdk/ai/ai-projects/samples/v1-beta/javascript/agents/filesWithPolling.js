// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to upload a file and poll for its status.
 *
 * @summary demonstrates how to upload a file and poll for its status.
 */

const { AIProjectsClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const { Readable } = require("stream");
require("dotenv/config");

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Create file content
  const fileContent1 = "Hello, World!";
  const readable1 = new Readable();
  readable1.push(fileContent1);
  readable1.push(null); // end the stream

  const fileContent2 = "How are you?";
  const readable2 = new Readable();
  readable2.push(fileContent2);
  readable2.push(null); // end the stream

  // (Optional) Define an onResponse callback to monitor the progress of polling
  function onResponse(response) {
    console.log(`Received response with status: ${response.parsedBody?.status}`);
  }

  // Upload file, which will automatically poll until the operation is complete
  const file1 = await client.agents.uploadFile(readable1, "assistants", {
    fileName: "myPollingFile.txt",
    onResponse: onResponse,
  });
  console.log(`Uploaded file with status ${file1.status}, file ID : ${file1.id}`);

  // Alternatively, polling can be done using .poll() and .pollUntilDone() methods.
  // This approach allows for more control over the polling process.
  // (Optional) AbortController can be used to stop polling if needed.
  const abortController = new AbortController();
  const filePoller = client.agents.uploadFile(readable2, "assistants", {
    fileName: "myPollingFile.txt",
    onResponse: onResponse,
  });
  const file2 = await filePoller.pollUntilDone({ abortSignal: abortController.signal });
  console.log(`Uploaded file with status ${file2.status}, file ID: ${file2.id}`);

  // Delete file
  await client.agents.deleteFile(file1.id);
  await client.agents.deleteFile(file2.id);
  console.log(`Deleted files, file IDs: ${file1.id} & ${file2.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
