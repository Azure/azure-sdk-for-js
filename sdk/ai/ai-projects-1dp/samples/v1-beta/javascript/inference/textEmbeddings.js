// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the text embeddings client to get the text embeddings for a given text.
 * @summary Given an AIProjectClient, this sample demonstrates how to get the text embeddings for a given text.
 * Get the text embeddings for arrays of given texts.
 */

const { AIProjectClient } = require("@azure/ai-projects-1dp");
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

require("dotenv").config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const apiKey = process.env["AZURE_AI_PROJECT_API_KEY"] || "<project key>";
const embeddingDeploymentName =
  process.env["EMBEDDING_DEPLOYMENT_NAME"] || "<embedding deployment name>";
async function main() {
  const project = new AIProjectClient(endpoint, new AzureKeyCredential(apiKey));
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

module.exports = { main };
