// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Document Translator service to synchronously start a single file translation
 */

import * as dotenv from "dotenv";
import { DocumentTranslateParameters, isUnexpected } from "../src";
import createClient from "../src/documentTranslationClient";
dotenv.config();

const endpoint =
  process.env["ENDPOINT"] ||
  "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const apiKey = process.env["DOCUMENT_TRANSLATION_API_KEY"] || "<API_Key>";
const credentials = { key: apiKey ?? "" };

export async function main() {
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

  if (response.status == "200") {
    console.log("Response code: " + response.status + ", Response body: " + response.body);
  }

  main().catch((err) => {
    console.error(err);
  });
}
