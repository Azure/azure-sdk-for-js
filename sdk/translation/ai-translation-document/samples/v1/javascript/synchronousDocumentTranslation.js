// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to use the SingleDocumentTranslationClient to perform a synchronous document translation.
 */

require("dotenv/config");
const { SingleDocumentTranslationClient } = require("@azure/ai-translation-document");
const { DefaultAzureCredential } = require("@azure/identity");
const { writeFile } = require("node:fs/promises");

const endpoint =
  process.env["DOCUMENT_TRANSLATION_ENDPOINT"] ||
  "https://<translator-instance>.cognitiveservices.azure.com";

async function main() {
  console.log("== Synchronous Document Translation ==");

  const credential = new DefaultAzureCredential();
  const client = new SingleDocumentTranslationClient(endpoint, credential);

  const response = await client.translate("hi", {
    document: {
      contents: "This is a test.",
      contentType: "text/html",
      filename: "test-input.txt",
    },
    glossary: [
      {
        contents: "test,test",
        contentType: "text/csv",
        filename: "test-glossary.csv",
      },
    ],
  });

  if (response.readableStreamBody) {
    await writeFile("test-output.txt", response.readableStreamBody);
    console.log("Translated document written to test-output.txt");
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
