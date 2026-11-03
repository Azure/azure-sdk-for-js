// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to get the supported formats for document translation.
 */

require("dotenv/config");
const { DocumentTranslationClient } = require("@azure/ai-translation-document");
const { DefaultAzureCredential } = require("@azure/identity");

const endpoint =
  process.env["DOCUMENT_TRANSLATION_ENDPOINT"] ||
  "https://<translator-instance>.cognitiveservices.azure.com";

async function main() {
  console.log("== List Supported Format Types ==");

  const credential = new DefaultAzureCredential();
  const client = new DocumentTranslationClient(endpoint, credential);

  const fileFormats = await client.getSupportedFormats("Document");
  for (const fileFormat of fileFormats.value) {
    console.log(fileFormat.format);
    console.log(fileFormat.contentTypes);
    console.log(fileFormat.fileExtensions);
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
