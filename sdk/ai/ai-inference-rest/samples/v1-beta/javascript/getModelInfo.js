// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get model info using the Inference SDK.
 *
 * @summary Get model info.
 */

const ModelClient = require("@azure-rest/ai-inference").default,
  { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"];

async function main() {
  console.log("== Get Model Info Sample ==");

  const client = createModelClient();
  const response = await client.path("/info").get();

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(
    `Model name: ${response.body.model_name}, type: ${response.body.model_type}, provider name: ${response.body.model_provider_name}`,
  );
}

/*
 * This function creates a model client.
 */
function createModelClient() {
  // auth scope for AOAI resources is currently https://cognitiveservices.azure.com/.default
  // (only needed when targetting AOAI, do not use for Serverless API or Managed Computer Endpoints)
  if (key) {
    return ModelClient(endpoint, new AzureKeyCredential(key));
  } else {
    const scopes = ["https://cognitiveservices.azure.com/.default"];
    const clientOptions = { credentials: { scopes } };
    return ModelClient(endpoint, new DefaultAzureCredential(), clientOptions);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
