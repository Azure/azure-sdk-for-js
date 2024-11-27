// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to use a custom classifier to get the document type (class) of a document.
 *
 * @summary use a custom classifier to classify a document
 */

import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");

  const documentUrl =
    "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/invoice/Invoice_1.pdf";

  const client = new DocumentAnalysisClient(endpoint, credential);

  const classifierId = process.env.CUSTOM_CLASSIFIER_ID ?? "<classifier id>";
  const poller = await client.beginClassifyDocumentFromUrl(classifierId, documentUrl, {
    onProgress(state) {
      console.log(`status: ${state.status}`);
    },
  });

  const result = await poller.pollUntilDone();

  if (result.documents === undefined || result.documents.length === 0) {
    throw new Error("Failed to extract any documents.");
  }

  for (const document of result.documents) {
    console.log(
      `Extracted a document with type '${document.docType}' on page ${document.boundingRegions?.[0].pageNumber} (confidence: ${document.confidence})`,
    );
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
