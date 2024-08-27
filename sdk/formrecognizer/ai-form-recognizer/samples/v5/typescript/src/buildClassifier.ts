// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to programmatically build a custom classifier.
 *
 * The Document Intelligence service expects the training data to be organized and labeled according to a particular
 * convention and stored in an Azure Storage container. For more information about creating a training data set, please
 * see the information at the following link to the service's documentation:
 *
 * https://aka.ms/azsdk/formrecognizer/buildclassifiermodel
 *
 * @summary build a classifier from a training data set
 */

import { AzureKeyCredential, DocumentModelAdministrationClient } from "@azure/ai-form-recognizer";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");

  const random = Date.now().toString();
  const modelId =
    (process.env.CUSTOM_CLASSIFIER_ID || "<classifier id>") + random.substring(random.length - 6);

  const trainingDataSasUrl1 =
    process.env.CUSTOM_CLASSIFIER_TRAINING_DATA_SAS_URL_1 || "<training data container SAS url 1>";

  const trainingDataSasUrl2 =
    process.env.CUSTOM_CLASSIFIER_TRAINING_DATA_SAS_URL_2 || "<training data container SAS url 2>";

  const client = new DocumentModelAdministrationClient(endpoint, credential);

  const poller = await client.beginBuildDocumentClassifier(
    modelId,
    {
      // You can use whatever names in place of "type1" and "type2" that make sense for your application
      type1: {
        // `azureBlobSource` isn't the only way to provide training data to the service. For more information, see
        // the documentation of the `ClassifierDocumentTypeDetails` type.
        azureBlobSource: {
          containerUrl: trainingDataSasUrl1,
        },
      },
      type2: {
        azureBlobSource: {
          containerUrl: trainingDataSasUrl2,
        },
      },
    },
    {
      description: "My custom classifier",
      onProgress(state) {
        console.log(`Training status: ${state.status}`);
      },
    }
  );

  let classifier;

  try {
    classifier = await poller.pollUntilDone();
  } catch (error) {
    console.log("Training failed:", error);
    process.exit(1);
  }

  console.log("Classifier ID:", classifier.classifierId);
  console.log("Description:", classifier.description);
  console.log("Created:", classifier.createdOn);

  console.log("Document Types:");
  for (const [docType, details] of Object.entries(classifier.docTypes)) {
    console.log(`- Name: "${docType}", source: ${JSON.stringify(details, null, 2)}`);
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
