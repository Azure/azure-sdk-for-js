// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to extract text and layout information from a document
 */

import { FormRecognizerClient, AzureKeyCredential } from "@azure/ai-form-recognizer";

import * as fs from "fs";
import * as path from "path";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";
  const fileName = path.join(__dirname, "../assets/Form_1.jpg");

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
    console.log(
      `Page ${page.pageNumber}: width ${page.width} and height ${page.height} with unit ${page.unit}`
    );
    for (const table of page.tables!) {
      for (const cell of table.cells) {
        console.log(`cell [${cell.rowIndex},${cell.columnIndex}] has text ${cell.text}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
