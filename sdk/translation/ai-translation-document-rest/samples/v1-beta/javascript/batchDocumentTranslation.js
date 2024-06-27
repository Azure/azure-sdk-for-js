// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Document Translator service to start a batch translation
 */

const dotenv = require("dotenv");
const createClient = require("../src/documentTranslationClient").default;
const {
  ONE_TEST_DOCUMENTS,
  createSourceContainer,
  createTargetContainer,
} = require("../test/public/utils/samplesHelper");
const {
  createSourceInput,
  createTargetInput,
  createBatchRequest,
  getTranslationOperationID,
} = require("../test/public/utils/testHelper");
const { isUnexpected } = require("../src/isUnexpected");
dotenv.config();

const endpoint =
  process.env["ENDPOINT"] ||
  "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const apiKey = process.env["DOCUMENT_TRANSLATION_API_KEY"] || "<API_Key>";
const credentials = { key: apiKey ?? "" };

async function main() {
  console.log("== Batch Document Translation ==");
  const client = createClient(endpoint, credentials);

  const sourceUrl = await createSourceContainer(ONE_TEST_DOCUMENTS);
  const sourceInput = createSourceInput(sourceUrl);
  const targetUrl = await createTargetContainer();
  const targetInput = createTargetInput(targetUrl, "fr");
  const batchRequest = createBatchRequest(sourceInput, [targetInput]);

  //Start translation
  const batchRequests = { inputs: [batchRequest] };
  const poller = await client.path("/document/batches").post({
    body: batchRequests,
  });
  if (isUnexpected(poller)) {
    throw poller.body;
  }
  const id = getTranslationOperationID(poller.headers["operation-location"]);
  console.log("Translation started and the operationID is: " + id);

  main().catch((err) => {
    console.error(err);
  });
}

module.exports = { main };
