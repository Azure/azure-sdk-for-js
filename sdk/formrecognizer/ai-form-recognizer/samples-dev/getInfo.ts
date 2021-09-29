// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, DocumentModelAdministrationClient } from "@azure/ai-form-recognizer";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT ?? "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY ?? "<api key>");

  const client = new DocumentModelAdministrationClient(endpoint, credential);

  const info = await client.getInfo();

  console.log(
    `Custom document models: ${info.customDocumentModels.count} of ${info.customDocumentModels.limit}`
  );
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
