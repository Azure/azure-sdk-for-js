// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AzureKeyCredential,
  DocumentAnalysisClient,
  DocumentArrayField,
  DocumentObjectField,
  DocumentStringField,
} from "@azure/ai-form-recognizer";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT ?? "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY ?? "<api key>");

  const client = new DocumentAnalysisClient(endpoint, credential);

  const poller = await client.beginAnalyzeDocuments(
    "prebuilt-receipt",
    // The form recognizer service will access the following URL to a receipt image and extract data from it
    "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-receipt.png"
  );
  poller.onProgress((state) => console.log(state.operationId, state.status));

  const {
    documents: [result],
  } = await poller.pollUntilDone();

  if (result) {
    const receipt = result.fields;
    console.log("=== Receipt Information ===");
    console.log("Type:", (receipt.ReceiptType as DocumentStringField).value);
    console.log("Merchant:", (receipt.MerchantName as DocumentStringField).value);
    console.log("Items:");
    for (const { properties: item } of ((receipt.Items as DocumentArrayField).values ??
      []) as DocumentObjectField[]) {
      console.log("-", (item.Name as DocumentStringField).value ?? "<undefined>");
      //console.log("  Price:", item?.price);
      console.log("  Total Price:", (item.TotalPrice as DocumentStringField).value);
    }
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
