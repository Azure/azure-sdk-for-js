// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to get the supported formats for document translation.
 */

require("dotenv/config");
const createClient = require("@azure-rest/ai-translation-document").default,
  { isUnexpected } = require("@azure-rest/ai-translation-document");
const { DefaultAzureCredential } = require("@azure/identity");
const { createRestError } = require("@azure-rest/core-client");
const endpoint =
  process.env["DOCUMENT_TRANSLATION_ENDPOINT"] ||
  "https://<translator-instance>.cognitiveservices.azure.com";

async function main() {
  console.log("== List Supported Format Types ==");

  const credential = new DefaultAzureCredential();
  const client = createClient(endpoint, credential);
  const response = await client.path("/document/formats").get({
    queryParameters: {
      type: "",
    },
  });
  if (isUnexpected(response)) {
    throw createRestError(response);
  }

  const fileFormatTypes = response.body;
  fileFormatTypes.value.forEach((fileFormatType) => {
    console.log(fileFormatType.format);
    console.log(fileFormatType.contentTypes);
    console.log(fileFormatType.fileExtensions);
  });
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
