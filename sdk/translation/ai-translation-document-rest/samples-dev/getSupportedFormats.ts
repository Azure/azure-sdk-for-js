// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";
import createClient from "../src/documentTranslationClient.js";
import { isUnexpected } from "../src/isUnexpected.js";
const endpoint =
  process.env["ENDPOINT"] ||
  "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const apiKey = process.env["DOCUMENT_TRANSLATION_API_KEY"] || "<API_Key>";
const credentials = { key: apiKey ?? "" };

export async function main(): Promise<void> {
  console.log("== List Supported Format Types ==");

  const client = createClient(endpoint, credentials);
  const response = await client.path("/document/formats").get();
  if (isUnexpected(response)) {
    throw response.body;
  }

  const fileFormatTypes = response.body;
  await fileFormatTypes.value.forEach(
    (fileFormatType: { format: any; contentTypes: any; fileExtensions: any }) => {
      console.log(fileFormatType.format);
      console.log(fileFormatType.contentTypes);
      console.log(fileFormatType.fileExtensions);
    },
  );
}

main().catch((err) => {
  console.error(err);
});
