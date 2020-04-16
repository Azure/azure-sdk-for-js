// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to train a custom model with labeled data.
 * See recognizeForm.ts to recognize forms using a custom model.
 */

// const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const { FormRecognizerClient, AzureKeyCredential } = require("../../dist");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running TrainModel sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const containerSasUrl = process.env["LABELED_CONTAINER_SAS_URL"] || "<url/path to the labeled training documents>";

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const trainingClient = client.getFormTrainingClient();

  const poller = await trainingClient.beginTraining(
    containerSasUrl,
    true, {
      onProgress: (state) => { console.log(`training status: ${state.status}`); }
  });
  await poller.pollUntilDone();
  const model = poller.getResult();
  console.dir(model, { depth: 4 });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
