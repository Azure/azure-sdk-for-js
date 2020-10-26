// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to copy a model from a source Form Recognizer resource
 * to a target Form Recognizer resource.
 */

const { FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // You will need to set these environment variables or edit the following values
  // information about the source Form Recognizer resource
  const endpoint =
    process.env["FORM_RECOGNIZER_SOURCE_ENDPOINT"] || "<source cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_SOURCE_API_KEY"] || "<source resource api key>";
  const sourceModelId =
    process.env["FORM_RECOGNIZER_SOURCE_MODEL_ID"] || "<source custom model id>";
  // information about the target Form Recognizer resource
  const targetEndpoint =
    process.env["FORM_RECOGNIZER_TARGET_ENDPOINT"] || "<target cognitive services endpoint>";
  const targetApiKey = process.env["FORM_RECOGNIZER_TARGET_API_KEY"] || "<target resource api key>";
  const targetResourceRegion =
    process.env["FORM_RECOGNIZER_TARGET_REGION"] || "<target resource region>";
  const targetResourceId =
    process.env["FORM_RECOGNIZER_TARGET_RESOURCE_ID"] || "<target resource resource id>";

  const targetClient = new FormTrainingClient(targetEndpoint, new AzureKeyCredential(targetApiKey));
  const authorization = await targetClient.getCopyAuthorization(
    targetResourceId,
    targetResourceRegion
  );

  const sourceClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await sourceClient.beginCopyModel(sourceModelId, authorization, {
    onProgress: (state) => {
      console.log(`Copy model status: ${state.status}`);
    }
  });
  const result = await poller.pollUntilDone();

  if (!result) {
    throw new Error("Expecting valid result from copy model operation");
  }

  // now verify that the copy in the target Form Recognizer resource
  console.log(`Model id: ${result.modelId}`);
  console.log(`Status: ${result.status}`);

  const model = await targetClient.getCustomModel(result.modelId);
  console.log(model);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
