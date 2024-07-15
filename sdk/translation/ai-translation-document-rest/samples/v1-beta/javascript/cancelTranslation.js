// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to cancel a batch translation request
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
  console.log("== Cancel Translation ==");
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
  const id = getTranslationOperationID(poller.headers["operation-location"]);

  //Cancel translation
  await client.path("/document/batches/{id}", id).delete();

  //get translation status and verify the job is cancelled, cancelling or notStarted
  const response = await client.path("/document/batches/{id}", id).get();
  if (isUnexpected(response)) {
    throw response.body;
  }
  console.log("The status after cancelling the batch operation is:" + response.body.status);

  main().catch((err) => {
    console.error(err);
  });
}

module.exports = { main };
