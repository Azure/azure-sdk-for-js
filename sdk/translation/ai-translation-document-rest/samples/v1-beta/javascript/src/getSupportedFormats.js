// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Document Translator service to get a list of supported format types
 */
const DocumentTranslationClient = require("@azure-rest/ai-translation-document").default,
  { isUnexpected } = require("@azure-rest/ai-translation-document");

require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";

async function main() {
  console.log("== List supported format types sample ==");

  const documentTranslationClient = DocumentTranslationClient(endpoint);
  const response = await documentTranslationClient.path("/document/formats").get();

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const fileFormatTypes = response.body;
  fileFormatTypes.value.forEach(fileFormatType => {
    console.log(fileFormatType.format);
    console.log(fileFormatType.contentTypes);
    console.log(fileFormatType.fileExtensions);
  });

main().catch((err) => {
  console.error(err);
});
}

module.exports = { main };
