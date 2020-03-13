// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Get Model
 */

//import { FormRecognizerClient, CognitiveKeyCredential } from "@azure/ai-form-recognizer";
import { FormRecognizerClient, CognitiveKeyCredential } from "../../../src/index";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running GetModel sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const modelId = "207683fc-b070-4731-a953-91bebbacb42b";

  const client = new FormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const result = await client.getModel(modelId);
  console.log(result);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
