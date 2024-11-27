// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to programmatically retrieve metadata about the number of custom models in the Form Recognizer
 * resource and the limit of custom models that the resource will allow to be created.
 *
 * @summary get information about the count and limit of custom models in the resource
 */

import DocumentIntelligence, { isUnexpected } from "@azure-rest/ai-document-intelligence";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" })
  const info = await client.path("/info").get();
  if (isUnexpected(info)) {
    throw info.body.error;
  }
  console.log(
    `Custom document models: ${info.body.customDocumentModels.count} of ${info.body.customDocumentModels.limit}`
  );
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
