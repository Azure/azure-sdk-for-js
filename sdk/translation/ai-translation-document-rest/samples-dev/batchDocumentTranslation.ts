// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";
import createClient from "../src/documentTranslationClient.js";
import {
  ONE_TEST_DOCUMENTS,
  createSourceContainer,
  createTargetContainer,
} from "../test/public/utils/samplesHelper.js";
import {
  createSourceInput,
  createTargetInput,
  createBatchRequest,
  getTranslationOperationID,
} from "../test/public/utils/testHelper.js";
import { isUnexpected } from "../src/isUnexpected.js";
const endpoint =
  process.env["ENDPOINT"] ||
  "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const apiKey = process.env["DOCUMENT_TRANSLATION_API_KEY"] || "<API_Key>";
const credentials = { key: apiKey ?? "" };

export async function main(): Promise<void> {
  console.log("== Batch Document Translation ==");
  const client = createClient(endpoint, credentials);

  const sourceUrl = await createSourceContainer(ONE_TEST_DOCUMENTS);
  const sourceInput = createSourceInput(sourceUrl);
  const targetUrl = await createTargetContainer();
  const targetInput = createTargetInput(targetUrl, "fr");
  const batchRequest = createBatchRequest(sourceInput, [targetInput]);

  // Start translation
  const batchRequests = { inputs: [batchRequest] };
  const poller = await client.path("/document/batches").post({
    body: batchRequests,
  });
  if (isUnexpected(poller)) {
    throw poller.body;
  }
  const id = getTranslationOperationID(poller.headers["operation-location"]);
  console.log("Translation started and the operationID is: " + id);
}

main().catch((err) => {
  console.error(err);
});
