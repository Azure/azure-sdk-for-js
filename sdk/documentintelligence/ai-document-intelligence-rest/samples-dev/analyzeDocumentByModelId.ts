// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to analyze a document using a model with a given ID. The model ID may refer to any model,
 * whether custom, prebuilt, composed, etc.
 *
 * @summary analyze a document using a model by ID
 */

import DocumentIntelligence, { AnalyzeResultOperationOutput, getLongRunningPoller, isUnexpected } from "@azure-rest/ai-document-intelligence";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" })
  const modelId = process.env.DOCUMENT_INTELLIGENCE_CUSTOM_MODEL_ID || "<custom model ID>";// "prebuilt-layout";

  const initialResponse = await client
    .path("/documentModels/{modelId}:analyze", modelId)
    .post({
      contentType: "application/json",
      body: {
        urlSource: "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-receipt.png",
      },
      queryParameters: { locale: "en-IN" },
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
