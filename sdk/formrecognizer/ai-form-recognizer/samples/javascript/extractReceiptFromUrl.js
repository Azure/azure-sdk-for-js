// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract receipt
 */

const { CustomRecognizerClient, CognitiveKeyCredential } = require("../../dist");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running ExtractReceipt sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const imageUrl = "http://images2.wikia.nocookie.net/__cb20111106201150/groceryreceipts/images/8/80/Grocery_receipts_001.jpg";

  const client = new CustomRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const result = await client.extractReceiptFromUrl(imageUrl, {
  });
  console.log(result);

}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
