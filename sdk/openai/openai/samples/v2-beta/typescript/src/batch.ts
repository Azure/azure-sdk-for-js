// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use Azure OpenAI global batch deployment.
 *
 * @summary create and retrieve batch content.
 */

import { AzureOpenAI, toFile } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Batch Chat Completions Sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4-turbo";
  const apiVersion = "2025-01-01-preview";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

  const batchContent = `{ "custom_id": "request-1", "method": "POST", "url": "/v1/chat/completions", "body": { "model": "${deployment}", "messages": [{ "role": "system", "content": "You are a helpful assistant." }, { "role": "user", "content": "What is 2+2?" }] } }`;

  // Upload a file with "batch" purpose
  const file = await client.files.create({
    file: await toFile(Buffer.from(batchContent), "batch.jsonl"),
    purpose: "batch",
  });

  // Create the batch
  const batch = await client.batches.create({
    endpoint: "/v1/chat/completions",
    input_file_id: file.id,
    completion_window: "24h",
  });
  console.log(batch);

  // Checking batch status
  const retrievedBatch = await client.batches.retrieve(batch.id);
  console.log(retrievedBatch);

  // Retrieve the batch output
  const outputFileId = retrievedBatch.output_file_id ?? retrievedBatch.error_file_id;
  if (outputFileId) {
    const fileResponse = await client.files.content(outputFileId);
    const fileContent = await fileResponse.text();

    console.log(fileContent);
  }

  // Clean up file
  await client.files.del(file.id);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
