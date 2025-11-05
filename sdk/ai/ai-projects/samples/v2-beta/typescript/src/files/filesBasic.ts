// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to obtain an OpenAI client and perform file operations.
 *
 * @summary Using an OpenAI client, this sample demonstrates how to perform files operations:
 * create, retrieve, content, list, and delete.
 */

import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const openAiBaseUrl = `${endpoint}/openai`;

const filePath = path.join(__dirname, "data", "training_set.jsonl");

async function createOpenAI(): Promise<OpenAI> {
  const credential = new DefaultAzureCredential();
  const scope = "https://ai.azure.com/.default";
  const azureADTokenProvider = await getBearerTokenProvider(credential, scope);

  return new OpenAI({
    apiKey: azureADTokenProvider,
    baseURL: openAiBaseUrl,
    defaultQuery: { "api-version": "2025-11-15-preview" },
  });
}

async function uploadFileAndWait(
  openAiClient: OpenAI,
  uploadPath: string,
): Promise<OpenAI.Files.FileObject> {
  console.log(`Uploading file from path: ${uploadPath}`);
  const created = await openAiClient.files.create({
    file: fs.createReadStream(uploadPath),
    purpose: "fine-tune",
  });
  console.log(`Uploaded file with ID: ${created.id}`);

  return openAiClient.files.retrieve(created.id);
}

export async function main(): Promise<void> {
  console.log("Getting Azure OpenAI client from AI Project (via AAD token)...");
  const openAI = await createOpenAI();
  console.log("Created OpenAI client.");

  // 1) Create (upload) a file, wait until processed
  const uploadedFile = await uploadFileAndWait(openAI, filePath);
  console.log("Processed file metadata:\n", JSON.stringify(uploadedFile, null, 2));

  // 2) Retrieve file metadata by ID
  console.log(`Retrieving file metadata with ID: ${uploadedFile.id}`);
  const retrievedFile = await openAI.files.retrieve(uploadedFile.id);
  console.log("Retrieved file:\n", JSON.stringify(retrievedFile, null, 2));

  // 3) Retrieve file content
  console.log(`Retrieving file content with ID: ${uploadedFile.id}`);
  const contentResponse = await openAI.files.content(uploadedFile.id);
  const buf = Buffer.from(await contentResponse.arrayBuffer());
  console.log(buf.toString("utf-8"));

  // 4) List all files
  console.log("Listing all files:");
  const filesList = await openAI.files.list();
  for (const f of filesList.data ?? []) {
    console.log(JSON.stringify(f));
  }

  // 5) Delete the file
  console.log(`Deleting file with ID: ${uploadedFile.id}`);
  const deleted = await openAI.files.delete(uploadedFile.id);
  console.log(
    `Successfully deleted file: ${deleted?.id || uploadedFile.id}, deleted=${String(
      deleted?.deleted ?? true,
    )}`,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
