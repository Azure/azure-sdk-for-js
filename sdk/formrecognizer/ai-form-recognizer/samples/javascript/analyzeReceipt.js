// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Analyze receipt
 */

const { CustomRecognizerClient, CognitiveKeyCredential } = require("../../dist");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running AnalyzeReceipt sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const path = "e:/temp/fr-test/receipt-to-analyze.png";

  const length = fs.statSync(path).size;
  const readStream = fs.createReadStream(path);

  const client = new CustomRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const result = await client.analyzeReceipt(readStream, "image/png", {
    onProgress: (state) => { console.log("training status: "); console.log(state); },
    requestOptions: {
      customHeaders: {
        "Content-Length": length,
        // "Content-Type": "image/png",
        "a": "b"
      }
    },
  });
  console.log(result);

}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
