// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to extract elements of an identity document (such as a driver license or passport) from a URL
 * to a file using the prebuilt identity document model.
 *
 * The prebuilt identity document model can return several fields. For a detailed list of the fields supported by the
 * identity document model, see the `IdentityDocument` type in the documentation, or refer to the following link:
 *
 * https://aka.ms/azsdk/documentitelligence/iddocumentfieldschema
 *
 * @summary extract data from an identity document
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
    .path("/documentModels/{modelId}:analyze", "prebuilt-idDocument")
    .post({
      contentType: "application/json",
      body: {
        // The Document Intelligence service will access the following URL to a driver license image and extract data from it
        urlSource:
          "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/identityDocument/license.png",
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

  // Use of PrebuiltModels.Receipt above (rather than the raw model ID), adds strong typing of the model's output
  if (document) {
    // The identity document model has multiple document types, so we need to know which document type was actually
    // extracted.
    if (document.docType === "idDocument.driverLicense") {
      // For the sake of the example, we'll only show a few of the fields that are produced.
      console.log("Extracted a Driver License:");
      console.log(document.fields)
    } else if (document.docType === "idDocument.passport") {
      console.log("Extracted a Passport:");
      console.log(document.fields)
    } else {
      // The only reason this would happen is if the client library's schema for the prebuilt identity document model is
      // out of date, and a new document type has been introduced.
      console.error("Unknown document type in result:", document);
    }
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
