// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to programmatically train a custom model using
 * labeled training data.
 *
 * The training data should be added to an Azure Storage container. Then, the
 * FormTrainingClient API allows you to send a SAS-encoded URL to the container
 * to the service. The data in the container will be interpreted as input
 * documents and associated label files, and the service will use those files
 * to create a model.
 *
 * For more information about setting up the container for training with
 * labels, see the following service documentation:
 *
 * https://docs.microsoft.com/azure/cognitive-services/form-recognizer/overview#train-with-labels
 *
 * @summary train a custom model with labeled inputs
 */

const { FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] ?? "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] ?? "<api key>";
  const containerSasUrl =
    process.env["LABELED_CONTAINER_SAS_URL"] ??
    "<url to Azure blob container storing the labeled training documents>";

  const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  // The second positional argument to `beginTraining` indidcates whether or
  // not the training process should look for label data in the training
  // container.
  const poller = await trainingClient.beginTraining(containerSasUrl, true, {
    // Model name is optional, but recommended
    modelName: "trainLabeledModel test model",
    onProgress: (state) => {
      console.log(`training status: ${state.status}`);
    }
  });
  const model = await poller.pollUntilDone();

  // We print out all the model data using `console.dir` for simplicity.
  console.dir(model, { depth: 4 });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
