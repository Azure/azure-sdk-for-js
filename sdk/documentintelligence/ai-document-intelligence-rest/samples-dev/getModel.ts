// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to get the full information about a custom model by its model ID, including information about
 * the document types in the model and their field schemas.
 *
 * @summary get information about a model by its ID
 */

import DocumentIntelligence, { isUnexpected } from "@azure-rest/ai-document-intelligence";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" })

  // The model ID to query. This can be any model ID, not just a custom model, so for example
  // the following sample uses `"prebuilt-idDocument"`, but you can change it to any model ID
  // you'd like to inspect.
  const modelId = "prebuilt-idDocument";
  const model = await client.path("/documentModels/{modelId}", modelId).get();

  if (isUnexpected(model)) {
    throw model.body.error;
  }

  console.log("ID", model.body.modelId);
  console.log("Created:", model.body.createdDateTime);
  console.log("Description: ", model.body.description || "<none>");

  console.log("Document Types:");
  for (const [docType, { fieldSchema }] of Object.entries(model.body.docTypes || {})) {
    // We can also programmatically access a schema of the fields.
    console.log("-", docType, JSON.stringify(fieldSchema, undefined, 2));
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
