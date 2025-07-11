// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to get the supported formats for document translation.
 */

import "dotenv/config";
import createClient, { isUnexpected } from "@azure-rest/ai-translation-document";
import { DefaultAzureCredential } from "@azure/identity";
import { createRestError } from "@azure-rest/core-client";
const endpoint =
  process.env["DOCUMENT_TRANSLATION_ENDPOINT"] ||
  "https://<translator-instance>.cognitiveservices.azure.com";

export async function main(): Promise<void> {
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
  fileFormatTypes.value.forEach(
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
