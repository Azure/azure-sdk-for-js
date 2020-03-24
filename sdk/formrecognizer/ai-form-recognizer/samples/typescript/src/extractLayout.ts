// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract Layout
 */

//import { LayoutRecognizerClient, FormRecognizerApiKeyCredential } from "@azure/ai-form-recognizer";
import { LayoutRecognizerClient, FormRecognizerApiKeyCredential } from "../../../src/index";
import * as fs from "fs";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running ExtractLayout sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const path = "c:/temp/fw4.pdf";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

  const readStream = fs.createReadStream(path);

  const client = new LayoutRecognizerClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));
  const poller = await client.beginExtractLayout(readStream, "application/pdf", {
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });
  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(response.status);
  console.log(response.rawExtractedPages);
  console.log(response.extractedLayoutPages);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
