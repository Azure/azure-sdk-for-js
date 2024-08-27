// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to extract only the basic layout information from a document using the `beginExtractLayout`
 * method. Layout information consists of the arrangement of basic OCR elements, such as pages (including their contents
 * such as lines, words, and selection marks), tables, and text font styles.
 *
 * @summary use the prebuilt layout model to extract basic document elements only
 */

import DocumentIntelligence, { AnalyzeResultOperationOutput, getLongRunningPoller, isUnexpected } from "@azure-rest/ai-document-intelligence";


import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" })

  const initialResponse = await client
    .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
    .post({
      contentType: "application/json",
      body: {
        urlSource: "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/forms/Invoice_1.pdf",
      }
    });

  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }

  const poller = getLongRunningPoller(client, initialResponse);
  const analyzeResult = (
    (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput
  ).analyzeResult;

  const pages = analyzeResult?.pages;
  const tables = analyzeResult?.tables;

  if (!pages || pages.length <= 0) {
    console.log("No pages were extracted from the document.");
  } else {
    console.log("Pages:");
    for (const page of pages) {
      console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
      console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
      console.log(
        `  ${page.lines && page.lines.length} lines, ${page.words && page.words.length} words`
      );

      if (page.lines && page.lines.length > 0) {
        console.log("  Lines:");

        for (const line of page.lines) {
          console.log(`  - "${line.content}"`);
        }
      }
    }
  }

  if (!tables || tables.length <= 0) {
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
