// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to extract text and layout information from a document
 */

import { FormRecognizerClient, AzureKeyCredential, Point2D } from "@azure/ai-form-recognizer";

import * as fs from "fs";
import * as path from "path";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Make a string representing a bounding box.
 */
function boundingBoxToString(box: Point2D[]): string {
  let out = "[";
  for (const { x, y } of box) {
    out += `(${x}, ${y}),`;
  }
  // Remove the last comma and add the closing bracket
  return out.slice(0, -1) + "]";
}

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] ?? "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] ?? "<api key>";
  const fileName = path.join(__dirname, "../assets/selection_mark_form.pdf");

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expecting file ${fileName} exists`);
  }

  const readStream = fs.createReadStream(fileName);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeContent(readStream);
  const pages = await poller.pollUntilDone();

  if (!pages || pages.length === 0) {
    throw new Error("Expecting non-empty list of pages!");
  }

  for (const page of pages!) {
    console.log(`- Page number: ${page.pageNumber}`);
    console.log("  Tables:");
    for (const table of page.tables ?? []) {
      console.log(`  - Table (${table.rowCount} x ${table.columnCount})`);
      for (const cell of table.cells) {
        console.log(`    cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`);
      }
    }
    console.log("  Selection Marks:");
    for (const mark of page.selectionMarks ?? []) {
      const box = boundingBoxToString(mark.boundingBox);
      console.log(`  - ${mark.state} @${box} (${mark.confidence} confidence)`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
