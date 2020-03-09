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
  const path = "c:/temp/Invoice_6.pdf";

  const readStream = fs.createReadStream(path);

  const client = new CustomFormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const poller = await client.extractCustomForm(modelId, () => readStream, "application/pdf", {
  });
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(response.status);
  if (response.analyzeResult?.documentResults && response.analyzeResult?.documentResults.length > 0) {
    console.log(response.analyzeResult?.documentResults[0] ?? "No documents extracted");
  }
  console.log(response.analyzeResult?.pageResults);
  console.log(response.analyzeResult?.readResults);
  console.log(response.analyzeResult?.errors);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
