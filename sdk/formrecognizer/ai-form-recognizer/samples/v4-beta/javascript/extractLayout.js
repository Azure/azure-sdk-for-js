// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample shows how to extract only the basic layout information from a document using the `beginExtractLayout`
 * method. Layout information consists of the arrangement of basic OCR elements, such as pages (including their contents
 * such as lines, words, and selection marks), tables, and text font styles.
 *
 * @summary use the prebuilt layout model to extract basic document elements only
 */

const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT ?? "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY ?? "<api key>");

  const client = new DocumentAnalysisClient(endpoint, credential);

  const poller = await client.beginExtractLayout(
    // The form recognizer service will access the following URL to a receipt image and extract data from it
    "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/forms/Invoice_1.pdf"
  );

  // Generic Document extraction produces all data from the Layout operation as well as the additional key-value pairs
  // (associations between elements, such as labeled elements), and document entities.
  const { pages, tables } = await poller.pollUntilDone();

  if (pages.length <= 0) {
    console.log("No pages were extracted from the document.");
  } else {
    console.log("Pages:");
    for (const page of pages) {
      console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
      console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
      console.log(`  ${page.lines.length} lines, ${page.words.length} words`);
    }
  }

  if (tables.length <= 0) {
    console.log("No tables were extracted from the document.");
  } else {
    console.log("Tables:");
    for (const table of tables) {
      console.log(
        `- Extracted table: ${table.columnCount} columns, ${table.rowCount} rows (${table.cells.length} cells)`
      );
    }
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
