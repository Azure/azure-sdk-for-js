// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to upload a file and poll for its status.
 *
 * @summary demonstrates how to upload a file and poll for its status.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");
const { Readable } = require("stream");
require("dotenv/config");

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Create file content
  const fileContent1 = "Hello, World!";
  const readable1 = new Readable();
  readable1.push(fileContent1);
  readable1.push(null); // end the stream

  const fileContent2 = "How are you?";
  const readable2 = new Readable();
  readable2.push(fileContent2);
  readable2.push(null); // end the stream

  // Upload file, which will automatically poll until the operation is complete
  const file1 = await client.files.upload(readable1, "assistants", {
    fileName: "myPollingFile.txt",
  });
  console.log(`Uploaded file with status ${file1.status}, file ID : ${file1.id}`);

  // Alternatively, polling can be done using .poll() and .pollUntilDone() methods.
  // This approach allows for more control over the polling process.
  // (Optional) AbortController can be used to stop polling if needed.
  const abortController = new AbortController();
  const filePoller = client.files.uploadAndPoll(readable2, "assistants", {
    fileName: "myPollingFile.txt",
  });
  filePoller.onProgress((state) => {
    console.log(`Polling file upload, current status: ${state.status}`);
  });
  const file2 = await filePoller.pollUntilDone({ abortSignal: abortController.signal });
  console.log(`Uploaded file with status ${file2.status}, file ID: ${file2.id}`);

  // Delete file
  await client.files.delete(file1.id);
  await client.files.delete(file2.id);
  console.log(`Deleted files, file IDs: ${file1.id} & ${file2.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
