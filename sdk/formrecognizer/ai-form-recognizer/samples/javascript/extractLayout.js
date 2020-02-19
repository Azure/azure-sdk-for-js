// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract Layout
 */

const { CustomRecognizerClient, CognitiveKeyCredential } = require("../../dist");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running ExtractLayout sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const path = "e:/temp/fr-test/layout-to-analyze.png";

  const readStream = fs.createReadStream(path);

  const client = new CustomRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const result = await client.extractLayout(readStream, "image/png", {
  });
  console.log(result);

}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
