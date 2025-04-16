// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the text embeddings client to get the text embeddings for a given text.
 * @summary Given an AIProjectClient, this sample demonstrates how to get the text embeddings for a given text.
 * Get the text embeddings for arrays of given texts.
 */

import { AIProjectClient } from "@azure/ai-projects-1dp";
import { isUnexpected } from "@azure-rest/ai-inference";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const embeddingDeploymentName =
  process.env["EMBEDDING_DEPLOYMENT_NAME"] || "<embedding deployment name>";
export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const client = project.inference.embeddings();
  const response = await client.post({
    body: {
      model: embeddingDeploymentName,
      input: ["first phrase", "second phrase", "third phrase"],
    },
  });

  console.log("response = ", response);
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  console.log(response.body.data);
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
