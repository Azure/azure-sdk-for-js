// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to recognize US sales receipts from a file.
 */

const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const path = "./assets/contoso-allinone.jpg";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeReceipts(readStream, "image/jpeg", {
    onProgress: (state) => { console.log(`status: ${state.status}`); }
  });

  await poller.pollUntilDone();
  const response = poller.getResult();

  if (!response) {
    throw new Error("Expecting valid response!");
  }
  console.log(`### Response status ${response.status}`);

  if (!response.receipts || response.receipts.length <= 0)
  {
    throw new Error("Expecting at lease one receipt in analysis result");
  }

  const usReceipt = response.receipts[0];
  console.log("First receipt:")
  console.log(`Receipt type: ${usReceipt.receiptType}`)
  console.log(`Merchant Name: ${usReceipt.merchantName.value} (confidence: ${usReceipt.merchantName.confidence})`);
  console.log(`Transaction Date: ${usReceipt.transactionDate.value} (confidence: ${usReceipt.transactionDate.confidence})`);
  const items = usReceipt.items.map((item) => {
    return {
      name: `${item.name.value} (confidence: ${item.name.confidence})`,
      price: `${item.price.value} (confidence: ${item.price.confidence})`,
      quantity: `${item.quantity.value} (confidence: ${item.quantity.confidence})`,
      totalPrice: `${item.totalPrice.value} (confidence: ${item.totalPrice.confidence})`
    }
  });
  console.log("Receipt items:");
  console.table(items, ["name", "price", "quantity", "totalPrice"]);

  // raw fields are also included in the result
  console.log("Raw 'MerchantAddress' fields:");
  console.log(usReceipt.recognizedForm.fields["MerchantAddress"]);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
