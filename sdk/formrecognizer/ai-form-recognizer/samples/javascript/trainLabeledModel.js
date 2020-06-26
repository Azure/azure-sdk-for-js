// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to train a custom model with labeled data.
 * See recognizeForm.ts to recognize forms using a custom model.
 */

const { FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";
  const containerSasUrl = process.env["LABELED_CONTAINER_SAS_URL"] || "<url/path to the labeled training documents>";

  const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  const poller = await trainingClient.beginTraining(containerSasUrl, true, {
    onProgress: (state) => {
      console.log(`training status: ${state.status}`);
    }
  });
  const model = await poller.pollUntilDone();
  console.dir(model, { depth: 4 });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
