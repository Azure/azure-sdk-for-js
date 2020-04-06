// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Train Form Recognizer custom models
 */

//import { FormRecognizerClient, FormRecognizerApiKeyCredential } from "@azure/ai-form-recognizer";
import { FormRecognizerClient, FormRecognizerApiKeyCredential } from "../../../src/index";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running TrainModel sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const trainingDataSource = process.env["LABELED_DOCUMENT_SOURCE"] || "<url to Azure blob container storing the labeled training documents>";

  const client = new FormRecognizerClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));
  const trainingClient = client.getFormTrainingClient();

  const poller = await trainingClient.beginTrainingWithLabel(trainingDataSource, {
    onProgress: (state) => { console.log("training status: "); console.log(state.status); }
  });
  await poller.pollUntilDone();
  const model = poller.getResult();
  console.dir(model, { depth: 4 });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
