// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to recognize US sales receipts from a URL.
 */

const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive service endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const url =
    "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-allinone.jpg";

  const poller = await client.beginRecognizeReceiptsFromUrl(url, {
    includeFieldElements: true,
    onProgress: (state) => {
      console.log(`analyzing status: ${state.status}`);
    }
  });
  const receipts = await poller.pollUntilDone();

  if (!receipts || receipts.length <= 0) {
    throw new Error("Expecting at lease one receipt in analysis result");
  }

  const receipt = receipts[0];
  console.log("First receipt:");
  // For supported fields recognized by the service, please refer to https://westus2.dev.cognitive.microsoft.com/docs/services/form-recognizer-api-v2-preview/operations/GetAnalyzeReceiptResult.
  const receiptTypeField = receipt.recognizedForm.fields["ReceiptType"];
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
        const itemNameField = itemField.value["Name"];
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
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
