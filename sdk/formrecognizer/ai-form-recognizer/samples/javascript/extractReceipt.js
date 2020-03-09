// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract receipt
 */

const { ReceiptRecognizerClient, CognitiveKeyCredential } = require("../../dist");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running ExtractReceipt sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const path = "c:/temp/contoso-allinone.jpg";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

  const readStream = fs.createReadStream(path);

  const client = new ReceiptRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));
  const poller = await client.extractReceipt(() => readStream, "image/jpeg", {
  });

  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }
  console.log(`### Response status ${response.status}`);

  if (!response.analyzeResult) {
    throw new Error("Expecting analysis result");
  }

  if (!response.analyzeResult.receiptResults || response.analyzeResult.receiptResults.length <= 0)
  {
    throw new Error("Expecting at lease one receipt in analysis result");
  }

  console.log("### First receipt:")
  console.log(response.analyzeResult.receiptResults[0]);
  console.log("### Items:")
  console.log(`   \t Quantity\tName\tPrice\tTotalPrice`);
  let i = 1;
  for (const item of response.analyzeResult.receiptResults[0].items) {
    console.log(`${i++})\t ${item.quantity || ""}\t${item.name}\t$${item.price || "<missing>"}\t$${item.totalPrice || "<missing>"}`);
  }
  console.log("### Raw 'MerchantAddress' fields:");
  console.log(response.analyzeResult.receiptResults[0].fields["MerchantAddress"])

}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
