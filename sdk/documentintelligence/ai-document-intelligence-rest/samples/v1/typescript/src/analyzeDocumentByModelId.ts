// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to analyze a document using a model with a given ID. The model ID may refer to any model,
 * whether custom, prebuilt, composed, etc.
 *
 * @summary analyze a document using a model by ID
 */

import type { AnalyzeOperationOutput } from "@azure-rest/ai-document-intelligence";
import DocumentIntelligence, {
  getLongRunningPoller,
  isUnexpected,
} from "@azure-rest/ai-document-intelligence";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function main(): Promise<void> {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    new DefaultAzureCredential(),
  );
  const modelId = process.env.DOCUMENT_INTELLIGENCE_CUSTOM_MODEL_ID || "<custom model ID>"; // "prebuilt-layout";

  const initialResponse = await client.path("/documentModels/{modelId}:analyze", modelId).post({
    contentType: "application/json",
    body: {
      urlSource:
        "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-receipt.png",
    },
    queryParameters: { locale: "en-IN" },
  });
  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const poller = getLongRunningPoller(client, initialResponse);
  const analyzeResult = ((await poller.pollUntilDone()).body as AnalyzeOperationOutput)
    .analyzeResult;

  const documents = analyzeResult?.documents;

  const document = documents && documents[0];
  if (document) {
    console.log(
      "Extracted document:",
      document.docType,
      `(confidence: ${document.confidence || "<undefined>"})`,
    );
    console.log("Fields:", document.fields);
  } else {
    throw new Error("Expected at least one document in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
