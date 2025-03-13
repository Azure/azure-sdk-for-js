// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";
import { DocumentTranslateParameters, isUnexpected } from "../src/index.js";
import createClient from "../src/documentTranslationClient.js";
const endpoint =
  process.env["ENDPOINT"] ||
  "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const apiKey = process.env["DOCUMENT_TRANSLATION_API_KEY"] || "<API_Key>";
const credentials = { key: apiKey ?? "" };

export async function main(): Promise<void> {
  console.log("== Synchronous Document Translation ==");

  const client = createClient(endpoint, credentials);

  const options: DocumentTranslateParameters = {
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
  };

  const response = await client.path("/document:translate").post(options);
  if (isUnexpected(response)) {
    throw response.body;
  }
  console.log("Response code: " + response.status + ", Response body: " + response.body);

  main().catch((err) => {
    console.error(err);
  });
}
