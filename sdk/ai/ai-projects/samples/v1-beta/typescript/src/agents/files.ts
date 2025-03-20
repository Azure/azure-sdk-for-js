// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic files agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic files agent operations.
 */

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import { Readable } from "node:stream";
import  "dotenv/config";

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Create and upload file
  const fileContent = "Hello, World!";
  // Create a readable stream from the string content
  const readable = Readable.from(Buffer.from(fileContent));
  const file = await client.agents.uploadFile(readable, "assistants", { fileName: "myFile.txt" });
  console.log(`Uploaded file, file ID : ${file.id}`);

  // List uploaded files
  const files = await client.agents.listFiles();

  console.log(`List of files : ${files.data[0].filename}`);

  // Retrieve file
  const _file = await client.agents.getFile(file.id);

  console.log(`Retrieved file, file ID : ${_file.id}`);

  // Delete file
  await client.agents.deleteFile(file.id);

  console.log(`Deleted file, file ID : ${file.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
