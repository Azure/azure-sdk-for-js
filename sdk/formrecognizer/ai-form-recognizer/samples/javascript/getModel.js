// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Get Model
 */

const { FormTrainingClient, AzureKeyCredential } = require("../../dist");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const myArgs = process.argv.slice(2);
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const modelId = myArgs[0] || process.env["CUSTOM_FORM_MODEL_ID"] || "<model id>";

  const client = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
  const result = await client.getModel(modelId);
  console.log(result);
  console.dir(result.models, { depth: 4 });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
