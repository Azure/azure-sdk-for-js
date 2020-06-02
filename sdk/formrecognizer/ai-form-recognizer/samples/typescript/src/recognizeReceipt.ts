// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to recognize US sales receipts from a file.
 */

import { FormRecognizerClient, AzureKeyCredential } from "@azure/ai-form-recognizer";

import * as fs from "fs";

// Load the .env file if it exists
require("dotenv").config();

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";
  const path = "../assets/contoso-allinone.jpg";

  if (!fs.existsSync(path)) {
    throw new Error(`Expecting file ${path} exists`);
  }

  const readStream = fs.createReadStream(path);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeReceipts(readStream, "image/jpeg", {
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });

  await poller.pollUntilDone();
  const receipts = poller.getResult();


  if (!receipts || receipts.length <= 0) {
    throw new Error("Expecting at lease one receipt in analysis result");
  }

  const receipt = receipts[0];
  console.log("First receipt:");
  const receiptTypeField = receipt.recognizedForm.fields["MerchantName"];
  if (receiptTypeField.valueType === "string") {
    console.log(`  Receipt Type: '${receiptTypeField.value || "<missing>"}', with confidence of ${receiptTypeField.confidence}`);
  }
  const merchantNameField = receipt.recognizedForm.fields["MerchantName"];
  if (merchantNameField.valueType === "string") {
    console.log(`  Merchant Name: '${merchantNameField.value || "<missing>"}', with confidence of ${merchantNameField.confidence}`);
  }
  const transactionDate = receipt.recognizedForm.fields["TransactionDate"];
  if (transactionDate.valueType === "date") {
    console.log(`  Transaction Date: '${transactionDate.value || "<missing>"}', with confidence of ${transactionDate.confidence}`);
  }
  const itemsField = receipt.recognizedForm.fields["Items"];
  if (itemsField.valueType === "array") {
    for (const itemField of itemsField.value || []) {
      if (itemField.valueType === "object") {
        const itemNameField = itemField.value!["Name"];
        if (itemNameField.valueType === "string") {
          console.log(`    Item Name: '${itemNameField.value || "<missing>"}', with confidence of ${itemNameField.confidence}`);
        }
      }
    }
  }
  const totalField = receipt.recognizedForm.fields["Total"];
  if (totalField.valueType === "number") {
    console.log(`  Total: '${totalField.value || "<missing>"}', with confidence of ${totalField.confidence}`);
  }

  // raw fields are also included in the result
  console.log("Raw 'MerchantAddress' field:");
  console.log(receipt.recognizedForm.fields["MerchantAddress"]);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
