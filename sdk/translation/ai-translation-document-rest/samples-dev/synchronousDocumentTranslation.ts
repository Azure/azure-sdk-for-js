// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Document Translator service to synchronously start a single file translation
 */

import * as dotenv from "dotenv";
import { CreateFileOptions } from "@typespec/ts-http-runtime";
import { DocumentTranslateDefaultResponse, DocumentTranslateParameters, createFile } from "../src";
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
  const file = await getDocumentFileContent();

  const options: DocumentTranslateParameters = {
    queryParameters: {
      targetLanguage: "hi",
    },
    contentType: "multipart/form-data",
    body: {
      document: file,
    },
  };

  const response = await client.path("/document:translate").post(options);
  const typedResponse = response as DocumentTranslateDefaultResponse;

  if (typedResponse.status == "200") {
    console.log(
      "Response code: " + typedResponse.status + ", Response body: " + typedResponse.body,
    );
  }

  main().catch((err) => {
    console.error(err);
  });
}

async function getDocumentFileContent(): Promise<File> {
  const fileName = "test-input.txt";
  const fileContent = new TextEncoder().encode("This is a test.");
  const createFileOptions: CreateFileOptions = {
    type: "text/html",
  };
  const file = createFile(fileContent, fileName, createFileOptions);
  return file;
}
