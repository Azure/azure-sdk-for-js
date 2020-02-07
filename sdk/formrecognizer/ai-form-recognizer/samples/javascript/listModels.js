// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * List Form Recognizer custom models
 */

//const { FormRecognizerClient, FormRecognizerApiKeyCredential } = require("@azure/ai-form-recognizer");
const { FormRecognizerClient, FormRecognizerApiKeyCredential } = require("../../dist");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running listCustomModels sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";

  const client = new FormRecognizerClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));

  const result = await client.listCustomModels();
  for await (const model of result.modelList) {
    console.log(result);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
