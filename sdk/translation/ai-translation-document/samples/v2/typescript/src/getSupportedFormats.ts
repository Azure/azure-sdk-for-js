// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to get the supported formats for document translation.
 */

import "dotenv/config";
import { DocumentTranslationClient } from "@azure/ai-translation-document";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint =
  process.env["DOCUMENT_TRANSLATION_ENDPOINT"] ||
  "https://<translator-instance>.cognitiveservices.azure.com";

export async function main(): Promise<void> {
  console.log("== List Supported Format Types ==");

  const credential = new DefaultAzureCredential();
  const client = new DocumentTranslationClient(endpoint, credential);

  const fileFormats = await client.getSupportedFormats({ typeParam: "document" });
  for (const fileFormat of fileFormats.value) {
    console.log(fileFormat.format);
    console.log(fileFormat.contentTypes);
    console.log(fileFormat.fileExtensions);
  }
}

main().catch((err) => {
  console.error(err);
});
