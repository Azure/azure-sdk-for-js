// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Get Model
 */

//import { FormTrainingClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
const { FormTrainingClient, AzureKeyCredential } = require("../../dist");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running GetModel sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const modelId = "afa7d851-ad20-465c-a80f-6ca8cfb879bb";

  const client = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
  const result = await client.getLabeledModel(modelId, { includeKeys: true });
  console.log(result);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
