// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get embeddings from a model endpoint.
 *
 * @summary get embeddings.
 */

const ModelClient = require("@azure-rest/ai-inference").default,
  { isUnexpected } = require("@azure-rest/ai-inference");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";

async function main() {
  console.log("== Chat Completions Sample ==");
  const credential = new DefaultAzureCredential();

  const client = ModelClient(endpoint, credential);
  const response = await client.path("/embeddings").post({
    body: {
      input: ["first phrase", "second phrase", "third phrase"],
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }
  for (const data of response.body.data) {
    console.log(data);
  }
  console.log(response.body.usage);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
