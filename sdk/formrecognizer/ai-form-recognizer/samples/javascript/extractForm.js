// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract Custom Form
 */

const { CustomFormRecognizerClient, CognitiveKeyCredential } = require("../../dist");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running ExtractCustomForm sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const modelId = "a205cf64-9191-4ba2-ad5a-acfb59ebee63";
  const path = "e:/temp/fr-test/Invoice_6.pdf";

  const readStream = fs.createReadStream(path);

  const client = new CustomFormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const result = await client.extractCustomForm(modelId, readStream, "application/pdf", {
  });
  console.log(result);

}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
