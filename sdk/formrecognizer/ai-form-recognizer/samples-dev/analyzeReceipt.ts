// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample shows how to extract elements of a receipt from a URL to a file using the prebuilt receipt model.
 *
 * The prebuilt receipt model can return several fields. For a detailed list of the fields supported by the receipt
 * model, see the `Receipt` type in the documentation, or refer to the following link:
 *
 * https://aka.ms/azsdk/formrecognizer/receiptfieldschema
 *
 * @summary extract data from a receipt document
 */

import {
  AzureKeyCredential,
  DocumentAnalysisClient,
  PrebuiltModels,
} from "@azure/ai-form-recognizer";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT ?? "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY ?? "<api key>");

  const client = new DocumentAnalysisClient(endpoint, credential);

  const poller = await client.beginAnalyzeDocument(
    PrebuiltModels.Receipt,
    // The form recognizer service will access the following URL to a receipt image and extract data from it
    "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-receipt.png"
  );

  const {
    documents: [result],
  } = await poller.pollUntilDone();

  // Use of PrebuiltModels.Receipt above (rather than the raw model ID), as it adds strong typing of the model's output
  if (result) {
    const receipt = result.fields;
    console.log("=== Receipt Information ===");
    console.log("Type:", result.docType);
    console.log("Merchant:", receipt.merchantName?.value);

    console.log("Items:");
    for (const { properties: item } of receipt.items?.values ?? []) {
      console.log("- Description:", item.description?.value);
      console.log("  Total Price:", item.totalPrice?.value);
    }

    console.log("Total:", receipt.total?.value);
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
