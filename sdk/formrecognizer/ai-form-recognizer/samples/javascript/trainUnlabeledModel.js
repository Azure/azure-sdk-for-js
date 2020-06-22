// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to train a custom model with unlabeled data.
 * See recognizeForm.js to recognize forms using a custom model.
 */

const { FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";

  const containerSasUrl = process.env["UNLABELED_CONTAINER_SAS_URL"] || "<SAS url to the blob container storing training documents>";

  const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  const poller = await trainingClient.beginTraining(containerSasUrl, false, {
    onProgress: (state) => {
      console.log(`training status: ${state.status}`);
    }
  });
  const response = await poller.pollUntilDone();

  if (!response) {
    throw new Error("Expecting valid response!");
  }

  console.log(`Model ID: ${response.modelId}`);
  console.log(`Status: ${response.status}`);
  console.log(`Requested on: ${response.requestedOn}`);
  console.log(`Completed on: ${response.completedOn}`);

  if (response.submodels) {
    for (const submodel of response.submodels) {
      // since the training data is unlabeled, we are unable to return the accuracy of this model
      console.log("We have recognized the following fields");
      for (const key in submodel.fields) {
        const field = submodel.fields[key];
        console.log(`The model found field '${field.name}'`);
      }
    }
  }
  // Training document information
  if (response.trainingDocuments) {
    for (const doc of response.trainingDocuments) {
      console.log(`Document name: ${doc.documentName}`);
      console.log(`Document status: ${doc.status}`);
      console.log(`Document page count: ${doc.pageCount}`);
      console.log(`Document errors: ${doc.errors}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
