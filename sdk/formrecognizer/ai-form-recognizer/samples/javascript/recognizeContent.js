// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Recognize Content
 */

const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";
  const path = "./assets/Invoice_6.pdf";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeContent(readStream);
  const pages = await poller.pollUntilDone();

  if (!pages || pages.length === 0) {
    throw new Error("Expecting non-empty list of pages!");
  }

  for (const page of pages) {
    console.log(
      `Page ${page.pageNumber}: width ${page.width} and height ${page.height} with unit ${page.unit}`
    );
    for (const table of page.tables) {
      for (const row of table.rows) {
        for (const cell of row.cells) {
          console.log(`cell [${cell.rowIndex},${cell.columnIndex}] has text ${cell.text}`);
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
