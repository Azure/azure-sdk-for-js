// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to use the Document Translation client to perform a synchronous document translation.
 */

require("dotenv/config");
const createClient = require("@azure-rest/ai-translation-document").default,
  { isUnexpected } = require("@azure-rest/ai-translation-document");
const { DefaultAzureCredential } = require("@azure/identity");

const endpoint =
  process.env["DOCUMENT_TRANSLATION_ENDPOINT"] ||
  "https://<translator-instance>.cognitiveservices.azure.com";

async function main() {
  console.log("== Synchronous Document Translation ==");

  const credential = new DefaultAzureCredential();
  const client = createClient(endpoint, credential);

  const response = await client.path("/document:translate").post({
    queryParameters: {
      targetLanguage: "hi",
    },
    contentType: "multipart/form-data",
    body: [
      {
        name: "document",
        body: "This is a test.",
        filename: "test-input.txt",
        contentType: "text/html",
      },
      {
        name: "glossary",
        body: "test,test",
        filename: "test-glossary.csv",
        contentType: "text/csv",
      },
    ],
  });
  if (isUnexpected(response)) {
    throw response.body;
  }
  console.log("Response code: " + response.status + ", Response body: " + response.body);
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
