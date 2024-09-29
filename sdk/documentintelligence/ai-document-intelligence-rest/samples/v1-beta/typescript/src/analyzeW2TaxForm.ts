// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to extract elements of a United States W2 tax form from a file using the prebuilt US W2 model.
 *
 * The prebuilt W2 model can return several fields. For a detailed list of the fields supported by the model, see the
 * `TaxUsW2` type in the documentation, or refer to the following link:
 *
 * https://aka.ms/azsdk/documentitelligence/taxusw2fieldschema
 *
 * @summary extract data from a United States W2 tax document
 */

import DocumentIntelligence, { AnalyzeResultOperationOutput, getLongRunningPoller, isUnexpected } from "@azure-rest/ai-document-intelligence";
import fs from "fs";
import path from "path";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" })

  const filePath = fs.readFileSync(path.join(".", "assets", "w2", "w2-single.png"));

  const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

  const initialResponse = await client
    .path("/documentModels/{modelId}:analyze", "prebuilt-tax.us.w2")
    .post({
      contentType: "application/json",
      body: {
        base64Source,
      },
    });

  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }

  const poller = await getLongRunningPoller(client, initialResponse);
  const analyzeResult = (
    (await (poller).pollUntilDone()).body as AnalyzeResultOperationOutput
  ).analyzeResult;

  const documents = analyzeResult?.documents;
  const document = documents?.[0];

  if (document) {
    console.log("Extracted W2 tax form:");
    console.log(document.fields);
  } else {
    throw new Error("Expected at least one document in the result.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
