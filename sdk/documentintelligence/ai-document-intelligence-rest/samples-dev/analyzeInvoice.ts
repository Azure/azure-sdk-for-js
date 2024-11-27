// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to extract elements of an invoice from a URL to a file using the prebuilt invoice model.
 *
 * The prebuilt invoice model can return several fields. For a detailed list of the fields supported by the invoice
 * model, see the `Invoice` type in the documentation, or refer to the following link:
 *
 * https://aka.ms/azsdk/documentitelligence/invoicefieldschema
 *
 * @summary extract data from an invoice document
 * @azsdk-skip-javascript
 */

import DocumentIntelligence, { AnalyzeResultOperationOutput, getLongRunningPoller, isUnexpected } from "@azure-rest/ai-document-intelligence";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {

  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" })

  const initialResponse = await client
    .path("/documentModels/{modelId}:analyze", "prebuilt-invoice")
    .post({
      contentType: "application/json",
      body: {
        // The Document Intelligence service will access the following URL to an invoice image and extract data from it
        urlSource: "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/invoice/sample_invoice.jpg",
      }
    });
  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const poller = await getLongRunningPoller(client, initialResponse);
  const analyzeResult = (
    (await (poller).pollUntilDone()).body as AnalyzeResultOperationOutput
  ).analyzeResult;

  const documents = analyzeResult?.documents;

  const document = documents && documents[0];
  if (!document) {
    throw new Error("Expected at least one document in the result.");
  }


  // Use of PrebuiltModels.Receipt above (rather than the raw model ID), adds strong typing of the model's output
  if (document) {
    console.log(document.fields);
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
