// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to get the Documents status of a batch translation operation initiated by a user
 */

import * as dotenv from "dotenv";
import createClient from "../src/documentTranslationClient";
import {
  ONE_TEST_DOCUMENTS,
  StartTranslationAndWait,
  createSourceContainer,
  createTargetContainer,
} from "../test/public/utils/samplesHelper";
import {
  createSourceInput,
  createTargetInput,
  createBatchRequest,
  getTranslationOperationID,
} from "../test/public/utils/testHelper";
import { GetDocumentsStatus200Response } from "../src/responses";
import { isUnexpected } from "../src/isUnexpected";
dotenv.config();

const endpoint =
  process.env["ENDPOINT"] ||
  "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const apiKey = process.env["DOCUMENT_TRANSLATION_API_KEY"] || "<API_Key>";
const credentials = { key: apiKey ?? "" };

export async function main() {
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
  if (documentResponse.status === "200" && "body" in documentResponse) {
    const responseBody = (documentResponse as GetDocumentsStatus200Response).body;
    for (const documentStatus of responseBody.value) {
      console.log("Document Status is: " + documentStatus.status);
      console.log("Characters charged is: " + documentStatus.characterCharged);
      break;
    }
  }

  main().catch((err) => {
    console.error(err);
  });
}
