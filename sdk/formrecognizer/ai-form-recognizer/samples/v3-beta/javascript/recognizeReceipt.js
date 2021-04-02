// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to recognize elements of a receipt from
 * a file using a prebuilt model.
 *
 * The prebuilt receipt model can return several fields. For a detailed
 * list of the fields supported by the receipt model, see the following
 * link:
 *
 * https://aka.ms/azsdk/formrecognizer/receiptfields
 *
 * @summary extract data from an image of a receipt
 */

const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] ?? "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] ?? "<api key>";

  const fileName = "./assets/receipt/contoso-allinone.jpg";

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expected file "${fileName}" to exist.`);
  }

  const readStream = fs.createReadStream(fileName);

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeReceipts(readStream, {
    contentType: "image/jpeg",
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });

  const [receipt] = await poller.pollUntilDone();

  if (receipt === undefined) {
    throw new Error("Failed to extract data from at least one receipt.");
  }

  console.log("Receipt fields:");

  // For a list of fields that are contained in the response, please refer to
  // the "Supported fields" section at the following link:
  // https://aka.ms/azsdk/formrecognizer/receiptfields
  const receiptTypeField = receipt.fields["ReceiptType"];
  if (receiptTypeField.valueType === "string") {
    console.log(
      `  Receipt Type: '${receiptTypeField.value ?? "<missing>"}', with confidence of ${
        receiptTypeField.confidence
      }`
    );
  }
  const merchantNameField = receipt.fields["MerchantName"];
  if (merchantNameField.valueType === "string") {
    console.log(
      `  Merchant Name: '${merchantNameField.value ?? "<missing>"}', with confidence of ${
        merchantNameField.confidence
      }`
    );
  }
  const transactionDate = receipt.fields["TransactionDate"];
  if (transactionDate.valueType === "date") {
    console.log(
      `  Transaction Date: '${transactionDate.value ?? "<missing>"}', with confidence of ${
        transactionDate.confidence
      }`
    );
  }
  const itemsField = receipt.fields["Items"];
  if (itemsField.valueType === "array") {
    for (const itemField of itemsField.value ?? []) {
      if (itemField.valueType === "object") {
        const itemNameField = itemField.value["Name"];
        if (itemNameField.valueType === "string") {
          console.log(
            `    Item Name: '${itemNameField.value ?? "<missing>"}', with confidence of ${
              itemNameField.confidence
            }`
          );
        }
      }
    }
  }
  const totalField = receipt.fields["Total"];
  if (totalField.valueType === "number") {
    console.log(
      `  Total: '${totalField.value ?? "<missing>"}', with confidence of ${totalField.confidence}`
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
