// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Recognize Labeled Form
 */

//import { FormRecognizerClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
import { FormRecognizerClient, AzureKeyCredential } from "../../../src/index";
import * as fs from "fs";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const modelId = "afa7d851-ad20-465c-a80f-6ca8cfb879bb"; // trained with labels
  const path = "c:/temp/Invoice_6.pdf";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeForms(modelId, readStream, "application/pdf", {
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(response.status);
  console.log("### Form results:")
  for (const document of response.forms || []) {
    console.log(`${document.formType}, page range: ${document.pageRange}`);

    console.log("### Page results:")
    for (const page of document.pages || []) {
      console.log(`Page number: ${page.pageNumber}`);
      console.log("Tables");
      for (const table of page.tables || []) {
        for (const row of table.rows) {
          for (const cell of row.cells) {
            console.log(`cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`);
          }
        }
      }
    }
    console.log("Fields:");
    console.log(document.fields);
  }

  console.log("Errors:");
  console.log(response.errors);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
