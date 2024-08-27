// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to extract elements of a receipt from a URL to a file using the prebuilt receipt model. Rather
 * than using the `PrebuiltModels.Receipt` document model, this sample shows the use of the prebuilt model by ID,
 * resulting in a weaker type that exactly mirrors the model's field schema at runtime.
 *
 * The prebuilt receipt model can return several fields. For a detailed list of the fields supported by the
 * receipt model, see the `Receipt` type in the documentation, or refer to the following link:
 *
 * https://aka.ms/azsdk/documentitelligence/receiptfieldschema
 *
 * @summary use the "prebuilt-receipt" model ID to extract data from a receipt document (weakly-typed)
 */

const DocumentIntelligence = require("@azure-rest/ai-document-intelligence").default,
  { getLongRunningPoller, isUnexpected } = require("@azure-rest/ai-document-intelligence");

require("dotenv").config();

async function main() {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" },
  );

  const initialResponse = await client
    .path("/documentModels/{modelId}:analyze", "prebuilt-receipt")
    .post({
      contentType: "application/json",
      body: {
        // The Document Intelligence service will access the following URL to a receipt image and extract data from it
        urlSource:
          "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-receipt.png",
      },
    });
  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const poller = await getLongRunningPoller(client, initialResponse);

  poller.onProgress((state) => console.log("Operation:", state.result, state.status));
  const analyzeResult = (await poller.pollUntilDone()).body.analyzeResult;

  const documents = analyzeResult?.documents;

  const result = documents && documents[0];
  if (result) {
    console.log(result.fields);
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
