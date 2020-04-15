// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to train a custom model with labeled data.
 * See recognizeForm.ts to recognize forms using a custom model.
 */


//import { FormRecognizerClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
import { FormRecognizerClient, AzureKeyCredential } from "../../../src/index";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running TrainModel sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const containerSasUrl = process.env["LABELED_DOCUMENT_SOURCE"] || "<url to Azure blob container storing the labeled training documents>";

  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const trainingClient = client.getFormTrainingClient();

  const poller = await trainingClient.beginTraining(containerSasUrl, true, {
    onProgress: (state) => { console.log("training status: "); console.log(state.status); }
  });
  await poller.pollUntilDone();
  const model = poller.getResult();
  console.dir(model, { depth: 4 });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
