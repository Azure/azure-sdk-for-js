// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample shows how to extract elements of a receipt from a URL to a file using the prebuilt receipt model. Rather
 * than using the `PrebuiltModels.Receipt` document model, this sample shows the use of the prebuilt model by ID,
 * resulting in a weaker type that exactly mirrors the model's field schema at runtime.
 *
 * The prebuilt receipt model can return several fields. For a detailed list of the fields supported by the
 * receipt model, see the `Receipt` type in the documentation, or refer to the following link:
 *
 * https://aka.ms/azsdk/formrecognizer/receiptfieldschema
 *
 * @summary use the "prebuilt-receipt" model ID to extract data from a receipt document (weakly-typed)
 */

const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

const dotenv = require("dotenv");
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
  poller.onProgress((state) => console.log("Operation:", state.modelId, state.status));

  const {
    documents: [result]
  } = await poller.pollUntilDone();

  if (result) {
    const receipt = result.fields;
    console.log("=== Receipt Information ===");
    console.log("Type:", receipt["ReceiptType"].value);
    console.log("Merchant:", receipt["MerchantName"].value);
    console.log("Items:");
    for (const { properties: item } of receipt["Items"].values ?? []) {
      console.log("-", item["Name"].value ?? "<undefined>");
      //console.log("  Price:", item?.price);
      console.log("  Total Price:", item["TotalPrice"].value);
    }
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
