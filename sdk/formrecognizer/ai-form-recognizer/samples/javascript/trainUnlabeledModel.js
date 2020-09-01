// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to train a custom model with unlabeled data.
 * See recognizeForm.ts to recognize forms using a custom model.
 */

const { FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";
  const containerSasUrl =
    process.env["UNLABELED_CONTAINER_SAS_URL"] ||
    "<url to Azure blob container storing the training documents>";

  const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  const poller = await trainingClient.beginTraining(containerSasUrl, false, {
    onProgress: (state) => {
      console.log(`training status: ${state.status}`);
    }
  });
  const model = await poller.pollUntilDone();

  if (!model) {
    throw new Error("Expecting valid training result!");
  }

  console.log(`Model ID: ${model.modelId}`);
  console.log(`Status: ${model.status}`);
  console.log(`Training started on: ${model.trainingStartedOn}`);
  console.log(`Training completed on: ${model.trainingCompletedOn}`);

  if (model.submodels) {
    for (const submodel of model.submodels) {
      // since the training data is unlabeled, we are unable to return the accuracy of this model
      console.log("We have recognized the following fields");
      for (const [_, field] of Object.entries(submodel.fields)) {
        console.log(`The model found field '${field.name}'`);
      }
    }
  }
  // Training document information
  if (model.trainingDocuments) {
    for (const doc of model.trainingDocuments) {
      console.log(`Document name: ${doc.name}`);
      console.log(`Document status: ${doc.status}`);
      console.log(`Document page count: ${doc.pageCount}`);
      console.log(
        `Document errors: ${doc.errors
          .map((e) => `error code ${e.code} '${e.message}'`)
          .join("\n")}`
      );
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
