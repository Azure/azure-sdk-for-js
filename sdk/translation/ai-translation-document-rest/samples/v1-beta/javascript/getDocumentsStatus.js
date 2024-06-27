// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to get the Documents status of a batch translation operation initiated by a user
 */

const dotenv = require("dotenv");
const createClient = require("../src/documentTranslationClient").default;
const {
  ONE_TEST_DOCUMENTS,
  StartTranslationAndWait,
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
  console.log("== Gets Documents Status ==");
  const client = createClient(endpoint, credentials);

  const sourceUrl = await createSourceContainer(ONE_TEST_DOCUMENTS);
  const sourceInput = createSourceInput(sourceUrl);
  const targetUrl = await createTargetContainer();
  const targetInput = createTargetInput(targetUrl, "fr");
  const batchRequest = createBatchRequest(sourceInput, [targetInput]);

  //Start translation
  const batchRequests = { inputs: [batchRequest] };
  const response = await StartTranslationAndWait(client, batchRequests);
  const operationLocationUrl = response.headers["operation-location"];
  const operationId = getTranslationOperationID(operationLocationUrl);

  //get Documents Status
  const documentResponse = await client.path("/document/batches/{id}/documents", operationId).get();
  if (isUnexpected(documentResponse)) {
    throw documentResponse.body;
  }
  const responseBody = documentResponse.body;
  for (const documentStatus of responseBody.value) {
    console.log("Document Status is: " + documentStatus.status);
    console.log("Characters charged is: " + documentStatus.characterCharged);
    break;
  }

  main().catch((err) => {
    console.error(err);
  });
}

module.exports = { main };
