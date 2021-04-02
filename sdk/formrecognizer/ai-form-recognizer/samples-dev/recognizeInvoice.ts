// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to recognize elements of an invoice from a file.
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
  const fileName = path.join(__dirname, "../assets/Invoice_1.pdf");

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expecting file ${fileName} exists`);
  }

  const readStream = fs.createReadStream(fileName);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeInvoices(readStream, {
    contentType: "application/pdf",
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });

  const [invoice] = await poller.pollUntilDone();

  if (invoice === undefined) {
    throw new Error("Expecting at lease one invoice in the analysis result!");
  }

  /**
   * Invoices contain a lot of optional fields, but they are all of elemental types
   * such as strings, numbers, and dates, so we will just enumerate them all.
   */
  console.log("Fields:");
  for (const [name, { valueType, value, confidence }] of Object.entries(invoice.fields)) {
    console.log(`- ${name} (${valueType}): ${value} (${confidence} confidence)`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
