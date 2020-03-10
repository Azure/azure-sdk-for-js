// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract Custom Form
 */

//import { CustomFormRecognizerClient, CognitiveKeyCredential } from "@azure/ai-form-recognizer";
import { CustomFormRecognizerClient, CognitiveKeyCredential } from "../../../src/index";
import * as fs from "fs";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running ExtractCustomForm sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const modelId = "a205cf64-9191-4ba2-ad5a-acfb59ebee63";
  const path = "c:/temp/Invoice_6.pdf";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

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
  console.log("### Page results:")
  for (const page of response.analyzeResult?.pageResults || []) {
    console.log(`Page number: ${page.page}`);
    console.log(`cluster Id: ${page.clusterId}`);
    console.log("key-value pairs");
    for (const pair of page.keyValuePairs || []) {
      console.log(`\tkey: ${pair.key}, value: ${pair.value}`);
    }
    console.log("Tables");
    for (const table of page.tables || []) {
      for (const row of table.rows) {
        for (const cell of row.cells) {
          console.log(`cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`);
        }
      }
    }
  }

  console.log(response.analyzeResult?.readResults);
  console.log(response.analyzeResult?.errors);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
