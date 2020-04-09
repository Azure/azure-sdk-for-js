// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Recognize Layout
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
  const path = "c:/temp/Invoice_7.pdf";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeContent(readStream, "application/pdf", {
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(response.status);
  console.log(response.pages);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
