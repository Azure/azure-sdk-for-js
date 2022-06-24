// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample shows how to copy a model from one resource to another. The model is created with a new model ID (and
 * optionally a new description) in the destination resource, but will have the same document types as the source model.
 *
 * @summary copy a model from one resource to another
 */

const {
  AzureKeyCredential,
  DocumentModelAdministrationClient,
} = require("@azure/ai-form-recognizer");

require("dotenv").config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");

  const random = Date.now().toString();
  const destinationModelId =
    (process.env.CUSTOM_MODEL_ID || "<model id>") + random.substring(random.length - 6);

  // The authorization must be created by the destination resource.
  const destinationClient = new DocumentModelAdministrationClient(endpoint, credential);
  const authorization = await destinationClient.getCopyAuthorization(destinationModelId);

  const sourceEndpoint = process.env.FORM_RECOGNIZER_SOURCE_ENDPOINT || "<source endpoint>";
  const sourceCredential = new AzureKeyCredential(
    process.env.FORM_RECOGNIZER_SOURCE_API_KEY || "<source api key>"
  );
  const sourceModelId = process.env.COPY_SOURCE_MODEL_ID || "<source model id>";

  // Then, the source resource can initiate the copy operation.
  const sourceClient = new DocumentModelAdministrationClient(sourceEndpoint, sourceCredential);

  const copyPoller = await sourceClient.beginCopyModelTo(sourceModelId, authorization);
  const model = await copyPoller.pollUntilDone();

  console.log("Model ID:", model.modelId);
  console.log("Description:", model.description);
  console.log("Created:", model.createdDateTime);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
