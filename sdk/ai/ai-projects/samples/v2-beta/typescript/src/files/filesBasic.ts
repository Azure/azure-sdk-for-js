// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the synchronous file operations
 * using the OpenAI client: create, retrieve, content, list, and delete.
 *
 * @summary This sample demonstrates how to upload, retrieve, list,
 * get content, and delete files using the OpenAI client.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const _dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(_dirname, "data", "test_file.jsonl");
export async function main(): Promise<void> {
  // Create OpenAI client with Azure credentials
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  // Upload file
  console.log("Uploading file...", filePath);
  const uploadedFile = await openAIClient.files.create({
    file: fs.createReadStream(filePath),
    purpose: "fine-tune",
  });
  console.log(`Uploaded file ID: ${uploadedFile.id}`);
  console.log(`File name: ${uploadedFile.filename}`);

  // Retrieve file metadata
  console.log(`\nRetrieving file metadata with ID: ${uploadedFile.id}`);
  const retrievedFile = await openAIClient.files.retrieve(uploadedFile.id);
  console.log(`Retrieved file ID: ${retrievedFile.id}`);
  console.log(`File name: ${retrievedFile.filename}`);
  console.log(`Purpose: ${retrievedFile.purpose}`);
  console.log(`Created at: ${new Date(retrievedFile.created_at * 1000).toISOString()}`);

  // Retrieve file content
  console.log(`\nRetrieving file content with ID: ${uploadedFile.id}`);
  const fileContentResponse = await openAIClient.files.content(uploadedFile.id);
  const text = await fileContentResponse.text();
  console.log(`Content (first 100 chars): ${text.substring(0, 100)}...`);

  // List all files
  console.log("\nListing all files:");
  const files = await openAIClient.files.list();
  for await (const file of files) {
    console.log(`- File ID: ${file.id}, Name: ${file.filename}, Purpose: ${file.purpose}`);
  }

  // Delete file
  console.log(`\nDeleting file with ID: ${uploadedFile.id}`);
  const deletedFile = await openAIClient.files.delete(uploadedFile.id);
  console.log(`Successfully deleted file: ${deletedFile.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
