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
  const modelId = "afa7d851-ad20-465c-a80f-6ca8cfb879bb"; // trained with labels
  const path = "c:/temp/Invoice_6.pdf";

  const readStream = fs.createReadStream(path);

  const client = new CustomFormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const poller = await client.extractLabeledForm(modelId, () => readStream, "application/pdf", {
    includeTextDetails: true
  });
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(response.status);
  console.log("### Document results:")
  for (const document of response.analyzeResult.documentResults || []) {
    console.log(`${document.docType}, pages ${document.pageRange}`);
    console.log("Fields");
  }

  console.log("### Page results:")
  for (const page of response.analyzeResult.pageResults || []) {
    console.log(`Page number: ${page.pageNumber}`);
    console.log(`cluster Id: ${page.clusterId}`);
    console.log("key-value pairs");
    for (const pair of page.keyValuePairs || []) {
      console.log(`\tkey: ${pair.key}, value: ${pair.value}`);
    }
  }


  console.log("### Read results:")
  console.log(response.analyzeResult.readResults);
  console.log("### Errors:")
  console.log(response.analyzeResult.errors);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
