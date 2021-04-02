// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to recognize US sales receipts from a URL.
 * This sample demonstrates how to recognize elements of a receipt from a URL
 * using a prebuilt model.
 *
 * The URL must be accessible from the Form Recognizer servers (in other words,
 * it must be a publicly accessible URL, such as a SAS-encoded URL to a blob
 * within Azure Storage). In this sample, we use a URL to a receipt image
 * hosted on GitHub.
 *
 * The prebuilt receipt model can return several fields. For a detailed list of
 * the fields supported by the receipt model, see the following link:
 *
 * https://aka.ms/azsdk/formrecognizer/receiptfields
 *
 * @summary extract data from a receipt by providing a URL to a file rather
 * than a file stream directly
 * @azsdk-weight 80
 */

import { FormRecognizerClient, AzureKeyCredential } from "@azure/ai-form-recognizer";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] ?? "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] ?? "<api key>";

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const url =
    "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-allinone.jpg";

  const poller = await client.beginRecognizeReceiptsFromUrl(url, {
    includeFieldElements: true,
    onProgress: (state) => {
      console.log(`analyzing status: ${state.status}`);
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
        const itemNameField = itemField.value!["Name"];
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
