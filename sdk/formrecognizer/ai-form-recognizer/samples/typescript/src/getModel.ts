// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Get Model
 */

//import { FormTrainingClient, FormRecognizerApiKeyCredential } from "@azure/ai-form-recognizer";
import { FormTrainingClient, FormRecognizerApiKeyCredential } from "../../../src/index";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running GetModel sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const modelId = process.env["CUSTOM_FORM_MODEL_ID"] || "<model id>";

  const client = new FormTrainingClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));
  const result = await client.getModel(modelId);
  console.dir(result, { depth: 4 });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
