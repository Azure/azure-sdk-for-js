// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to make a simple call to the Azure Document Translator
 * service to get a list of supported file formats
 *
 * @summary gets a list of all supported document formats
 */

import DocumentTranslator from "@azure-rest/ai-document-translator";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "document-translator endpoint";
const apiKey = process.env["DOCUMENT_TRANSLATOR_API_KEY"] || "<api key>";

export async function main() {
  console.log("== List supported document formats sample ==");

  const client = DocumentTranslator(endpoint, { key: apiKey });
  const formats = await client.path("/documents/formats").get();

  if (formats.status !== "200") {
    throw formats.body.error;
  }

  console.log(formats.body.value.map((v) => v.format).join("\n"));
}

main().catch((err) => {
  console.error(err);
});
