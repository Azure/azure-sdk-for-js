// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to copy a model from one resource to another. The model is created with a new model ID (and
 * optionally a new description) in the destination resource, but will have the same document types as the source model.
 *
 * @summary copy a model from one resource to another
 */

import DocumentIntelligence, { DocumentModelCopyToOperationDetailsOutput, getLongRunningPoller, isUnexpected } from "@azure-rest/ai-document-intelligence";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {

  const random = Date.now().toString();
  const destinationModelId =
    (process.env.CUSTOM_MODEL_ID || "<model id>") + random.substring(random.length - 6);

  // The authorization must be created by the destination resource.
  // const destinationClient = new DocumentModelAdministrationClient(endpoint, credential);
  const destinationClient = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" })
  // const authorization = await destinationClient.getCopyAuthorization(destinationModelId);
  const targetAuth = await destinationClient.path("/documentModels:authorizeCopy").post({
    body: {
      modelId: destinationModelId,
    },
  });
  if (isUnexpected(targetAuth)) {
    throw targetAuth.body.error;
  }
  const sourceEndpoint = process.env.DOCUMENT_INTELLIGENCE_SOURCE_ENDPOINT || "<source endpoint>";
  const sourceModelId = process.env.COPY_SOURCE_MODEL_ID || "<source model id>";

  // Then, the source resource can initiate the copy operation.
  const sourceClient = DocumentIntelligence(
    sourceEndpoint,
    { key: process.env.DOCUMENT_INTELLIGENCE_SOURCE_API_KEY || "<source api key>" })

  const copyInitResponse = await sourceClient
    .path("/documentModels/{modelId}:copyTo", sourceModelId)
    .post({
      body: targetAuth.body,
    });

  if (isUnexpected(copyInitResponse)) {
    throw copyInitResponse.body.error;
  }
  const copyPoller = getLongRunningPoller(sourceClient, copyInitResponse);
  const model = (
    (await (await copyPoller).pollUntilDone()).body as DocumentModelCopyToOperationDetailsOutput
  ).result!;

  console.log("Model ID:", model.modelId);
  console.log("Description:", model.description);
  console.log("Created:", model.createdDateTime);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
