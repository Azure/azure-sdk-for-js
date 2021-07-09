// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to programmatically train a custom model using
 * unlabeled training data. Without label information, the service will use a
 * machine learning algorithm to attempt to deduce the locations and labels of
 * fields within the input documents automatically, but the quality of
 * recognition may suffer compared to labeled models.
 *
 * The training data should be added to an Azure Storage container. Then, the
 * FormTrainingClient API allows you to send a SAS-encoded URL to the container
 * to the service. The data in the container will be interpreted as input
 * documents, and the service will use those files to create a model.
 *
 * For more information about setting up the container for training with
 * labels, see the following service documentation:
 *
 * https://docs.microsoft.com/azure/cognitive-services/form-recognizer/overview#train-without-labels
 *
 * @summary train a custom model with unlabeled inputs (form documents only)
 */

import { FormTrainingClient, AzureKeyCredential } from "@azure/ai-form-recognizer";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] ?? "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] ?? "<api key>";
  const containerSasUrl =
    process.env["UNLABELED_CONTAINER_SAS_URL"] ??
    "<url to Azure blob container storing the training documents>";

  const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  const poller = await trainingClient.beginTraining(containerSasUrl, false, {
    onProgress: (state) => {
      console.log(`training status: ${state.status}`);
    }
  });
  const model = await poller.pollUntilDone();

  if (!model) {
    throw new Error("Failed to train unlabeled model.");
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
