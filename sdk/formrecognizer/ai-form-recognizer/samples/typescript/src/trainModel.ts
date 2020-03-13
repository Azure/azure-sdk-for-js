// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Train Form Recognizer custom models
 */

//import { FormRecognizerClient, CognitiveKeyCredential } from "@azure/ai-form-recognizer";
import { FormRecognizerClient, CognitiveKeyCredential } from "../../../src/index";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running TrainModel sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICE_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["COGNITIVE_SERVICE_API_KEY"] || "<api key>";
  const trainingDataSource = process.env["DOCUMENT_SOURCE"] || "<url/path to the training documents>";

  const client = new FormRecognizerClient(endpoint, new CognitiveKeyCredential(apiKey));

  const poller = await client.beginTraining(trainingDataSource, {
    onProgress: (state) => { console.log("training status: "); console.log(state); }
  });
  await poller.pollUntilDone();
  const model = poller.getResult();
  console.log(model);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
