// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to upload a file and poll for its status.
 *
 * @summary demonstrates how to upload a file and poll for its status.
 *
 */

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
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

  // Upload file and poll
  const file = await client.agents.uploadFile(readable1, "assistants", {
    fileName: "myPollingFile.txt",
  }).poller;
  console.log(`Uploaded file with status ${file.status}, file ID : ${file.id}`);

  // Alternatively, polling can be done using .poll() and .pollUntilDone() methods.
  // This approach allows for more control over the polling process.
  // (Optionally) an AbortController can be used to stop polling if needed.
  const abortController = new AbortController();
  const filePoller = client.agents.uploadFile(readable2, "assistants", {
    fileName: "myPollingFile.txt",
  }).poller;
  const _file = await filePoller.pollUntilDone({ abortSignal: abortController.signal });
  console.log(`Uploaded file with status ${_file.status}, file ID : ${_file.id}`);

  // Delete file
  await client.agents.deleteFile(file.id);
  await client.agents.deleteFile(_file.id);
  console.log(`Deleted files, file IDs: ${file.id} & ${_file.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
