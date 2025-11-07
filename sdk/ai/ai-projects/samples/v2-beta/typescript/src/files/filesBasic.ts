// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to obtain an OpenAI client and perform file operations.
 *
 * @summary Using an OpenAI client, this sample demonstrates how to perform files operations:
 * create, retrieve, content, list, and delete.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import { fileURLToPath } from "url";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

const endpoint = process.env["AZURE_AI_AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "data", "training_set.jsonl");

export async function main(): Promise<void> {
  const projectClient = new AIProjectClient(endpoint, new DefaultAzureCredential());

  const openAIClient = await projectClient.getOpenAIClient();
  console.log("Created OpenAI client.");

  // 1) Create (upload) a file, wait until processed
  const created = await openAIClient.files.create({
    file: fs.createReadStream(filePath),
    purpose: "fine-tune",
  });
  console.log(`Uploaded file with ID: ${created.id}`);

  // 2) Retrieve file metadata by ID
  const uploadedFile = await openAIClient.files.retrieve(created.id);
  console.log("Processed file metadata:\n", JSON.stringify(uploadedFile, null, 2));

  // 3) Retrieve file content
  console.log(`Retrieving file content with ID: ${uploadedFile.id}`);
  const contentResponse = await openAIClient.files.content(uploadedFile.id);
  const buf = Buffer.from(await contentResponse.arrayBuffer());
  console.log(buf.toString("utf-8"));

  // 4) List all files
  console.log("Listing all files:");
  const filesList = await openAIClient.files.list();
  for (const f of filesList.data ?? []) {
    console.log(JSON.stringify(f));
  }

  // 5) Delete the file
  console.log(`Deleting file with ID: ${uploadedFile.id}`);
  const deleted = await openAIClient.files.delete(uploadedFile.id);
  console.log(
    `Successfully deleted file: ${deleted?.id || uploadedFile.id}, deleted=${String(
      deleted?.deleted ?? true,
    )}`,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
