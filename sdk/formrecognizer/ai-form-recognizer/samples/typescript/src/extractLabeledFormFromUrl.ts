// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract Labeled Form from url
 */

//import { FormRecognizerClient, FormRecognizerApiKeyCredential } from "@azure/ai-form-recognizer";
import { FormRecognizerClient, FormRecognizerApiKeyCredential } from "../../../src/index";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running ExtractLabeledFormsFromUrl sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";

  const modelId = "e28ad0da-aa55-46dc-ade9-839b0d819189"; // trained with labels
  const url = process.env["URL_OF_DOCUMENT_TO_ANALYZE_WITH_LABELS"] || "<sample invoice url>";

  const client = new FormRecognizerClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));
  const poller = await client.beginExtractLabeledFormsFromUrl(modelId, url,{
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(response.status);
  console.log("### Document results:")
  for (const document of response.extractedForms || []) {
    console.log(`${document.docType}, pages ${document.pageRange}`);
    console.log("Fields");
  }

  console.log("### Page results:")
  for (const page of response.extractedPages || []) {
    console.log(`Page number: ${page.pageNumber}`);
    console.log(`Form type id: ${page.formTypeId}`);
    console.log("key-value pairs");
    for (const field of page.fields || []) {
      console.log(`\t${field.name.text}: ${field.value.text}`);
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

  console.log("Raw extracted pages:");
  console.log(response.rawExtractedPages);
  console.log("Errors:");
  console.log(response.errors);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
