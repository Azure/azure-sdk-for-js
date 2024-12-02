// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to analyze a document using a model with a given ID. The model ID may refer to any model,
 * whether custom, prebuilt, composed, etc.
 *
 * @summary analyze a document using a model by ID
 */

const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

require("dotenv").config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");
  const client = new DocumentAnalysisClient(endpoint, credential);

  const modelId = process.env.FORM_RECOGNIZER_CUSTOM_MODEL_ID || "<custom model ID>";

  const poller = await client.beginAnalyzeDocumentFromUrl(
    modelId,
    "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-receipt.png"
  );

  const { documents } = await poller.pollUntilDone();
  const document = documents && documents[0];
  if (!document) {
    throw new Error("Expected at least one document in the result.");
  }

  console.log(
    "Extracted document:",
    document.docType,
    `(confidence: ${document.confidence || "<undefined>"})`
  );
  console.log("Fields:", document.fields);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
