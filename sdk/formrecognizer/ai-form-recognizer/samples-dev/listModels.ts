// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, DocumentModelAdministrationClient } from "@azure/ai-form-recognizer";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT ?? "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY ?? "<api key>");

  const client = new DocumentModelAdministrationClient(endpoint, credential);

  for await (const modelSummary of client.listModels()) {
    console.log("- ID", modelSummary.modelId);
    console.log("  Created:", modelSummary.createdDateTime);
    console.log("  Description: ", modelSummary.description ?? "<none>");

    const model = await client.getModel(modelSummary.modelId);

    console.log("  Document Types:");
    for (const docType of Object.keys(model.docTypes ?? {})) {
      console.log("  -", docType);
    }
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
