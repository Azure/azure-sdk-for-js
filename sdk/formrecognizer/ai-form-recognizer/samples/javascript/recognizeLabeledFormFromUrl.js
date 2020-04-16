// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze a form given a accessible url to a document
 * using a custom trained model. The form must be of the same type as the forms the custom
 * model was trained on. To learn how to train your own models, see the samples in
 * trainModel.js or trainModelWithLabels.js
 */

const { FormRecognizerClient, AzureKeyCredential } = require("../../dist");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const modelId = process.env["LABELED_CUSTOM_MODEL_ID"] || "<labeled custom model id>";
  const url = process.env["URL_OF_DOCUMENT_TO_ANALYZE_WITH_LABELS"] || "<sample invoice url>";

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeFormsFromUrl(modelId, url,{
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
