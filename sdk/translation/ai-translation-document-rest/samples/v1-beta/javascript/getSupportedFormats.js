// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Document Translator service to get a list of supported languages
 */

const dotenv = require("dotenv");
const createClient = require("../src/documentTranslationClient").default;
const { isUnexpected } = require("../src/isUnexpected");
dotenv.config();

const endpoint =
  process.env["ENDPOINT"] ||
  "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const apiKey = process.env["DOCUMENT_TRANSLATION_API_KEY"] || "<API_Key>";
const credentials = { key: apiKey ?? "" };

async function main() {
  console.log("== List Supported Format Types ==");

  const client = createClient(endpoint, credentials);
  const response = await client.path("/document/formats").get();
  if (isUnexpected(response)) {
    throw response.body;
  }

  const fileFormatTypes = response.body;
  fileFormatTypes.value.forEach((fileFormatType) => {
    console.log(fileFormatType.format);
    console.log(fileFormatType.contentTypes);
    console.log(fileFormatType.fileExtensions);
  });

  main().catch((err) => {
    console.error(err);
  });
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
