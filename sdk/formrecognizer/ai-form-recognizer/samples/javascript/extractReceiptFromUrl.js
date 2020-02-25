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

  let result;

  result = await client.getExtractedReceipt("5bff970a-d950-4aac-873d-883b513f1f0b");

  if (result.status !== "succeeded") {
    console.log(result);
    console.log("extracting...");
    result = await client.extractReceiptFromUrl(imageUrl, {
    });
  }
  console.log(result);
  console.log(result.analyzeResult.receiptResults);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
