// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to iterate over the models in a resource. This will include both custom and prebuilt models.
 *
 * @summary iterate over the models in a resource
 */

import DocumentIntelligence, { isUnexpected, paginate } from "@azure-rest/ai-document-intelligence";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" })


  const response = await client.path("/documentModels").get();
  if (isUnexpected(response)) {
    throw response.body.error;
  }

  for await (const model of paginate(client, response)) {
    console.log("- ID", model.modelId);
    console.log("  Created:", model.createdDateTime);
    console.log("  Description: ", model.description || "<none>");

    // The model summary does not include `docTypes`, so we must additionally call `getModel` to retrieve them
    const detailedModel = (await client.path("/documentModels/{modelId}", model.modelId).get());

    if (isUnexpected(detailedModel)) {
      throw detailedModel.body.error;
    }
    const docTypes = detailedModel.body.docTypes;

    console.log("  Document Types:");
    for (const docType of Object.keys(docTypes || {})) {
      console.log("  -", docType);
    }
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
