// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Recognize receipt
 */

//import { FormRecognizerClient, FormRecognizerApiKeyCredential } from "@azure/ai-form-recognizer";
import { FormRecognizerClient, FormRecognizerApiKeyCredential } from "../../../src/index";

import * as fs from "fs";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const path = "c:/temp/contoso-allinone.jpg";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));
  const poller = await client.beginRecognizeReceipts(readStream, "image/jpeg", {
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });

  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }
  console.log(`### Response status ${response.status}`);

  if (!response.extractedReceipts || response.extractedReceipts.length <= 0)
  {
    throw new Error("Expecting at lease one receipt in analysis result");
  }

  console.log("### First receipt:")
  console.log(response.extractedReceipts[0]);
  console.log("### Items:")
  console.table(response.extractedReceipts[0].items, ["name", "quantity", "price", "totalPrice"]);
  console.log("### Raw 'MerchantAddress' fields:");
  console.log(response.extractedReceipts[0]?.fields["MerchantAddress"])
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
