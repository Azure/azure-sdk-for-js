// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get embeddings from a model endpoint.
 *
 * @summary Get embeddings.
 */

const ModelClient = require("@azure-rest/ai-inference").default,
  { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");
const { DefaultAzureCredential } = require("@azure/identity");
const { createRestError } = require("@azure-rest/core-client");

// Load the .env file if it exists
require("dotenv/config");
// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"];
const modelName = process.env["MODEL_NAME"];

async function main() {
  console.log("== Text Embeddings Sample ==");

  const client = createModelClient();
  const response = await client.path("/embeddings").post({
    body: {
      input: ["first phrase", "second phrase", "third phrase"],
      model: modelName,
    },
  });

  if (isUnexpected(response)) {
    throw createRestError(response);
  }
  for (const data of response.body.data) {
    console.log(data);
  }
  console.log(response.body.usage);
}

/*
 * This function creates a model client.
 */
function createModelClient() {
  // auth scope for AOAI resources is currently https://cognitiveservices.azure.com/.default
  // auth scope for MaaS and MaaP is currently https://ml.azure.com
  // (Do not use for Serverless API or Managed Computer Endpoints)
  if (key) {
    return ModelClient(endpoint, new AzureKeyCredential(key));
  } else {
    const scopes = [];
    if (endpoint.includes(".models.ai.azure.com")) {
      scopes.push("https://ml.azure.com");
    } else if (endpoint.includes(".openai.azure.com/openai/deployments/")) {
      scopes.push("https://cognitiveservices.azure.com");
    }

    const clientOptions = { credentials: { scopes } };
    return ModelClient(endpoint, new DefaultAzureCredential(), clientOptions);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
