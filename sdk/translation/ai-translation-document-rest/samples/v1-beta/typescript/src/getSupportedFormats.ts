// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator service to get a list of supported languages
 */
import DocumentTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-document";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";

export async function main() {
  console.log("== List supported format types ==");

  const documentTranslationClient = DocumentTranslationClient(endpoint);
  const response = await documentTranslationClient.path("/document/formats").get();

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const fileFormatTypes = response.body;
  fileFormatTypes.value.forEach((fileFormatType: { format: any; contentTypes: any; fileExtensions: any; }) => {
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
