// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to manage the custom models in
 * a cognitive service account.
 */

import { FormTrainingClient, AzureKeyCredential } from "@azure/ai-form-recognizer";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";

  const client = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  // First, we see how many custom models we have, and what our limit is
  const accountProperties = await client.getAccountProperties();
  console.log(
    `Our account has ${accountProperties.customModelCount} custom models, and we can have at most ${accountProperties.customModelLimit} custom models`
  );

  // Next, we get a paged async iterator of all of our custom models
  const result = client.listCustomModels();

  // We can iterate over all the models and print their ID
  // We'll also save the first model to get some detailed information
  // in the next step;
  let firstModel = undefined;
  for await (const model of result) {
    console.log(`- Model:`, model.modelId);
    if (firstModel === undefined) {
      firstModel = model;
    }
  }

  if (!firstModel) {
    // See trainModels.ts and trainModelWithLabels.ts for creating and training models.
    throw new Error(
      "There are no custom models in this account. Please ensure to create and train models first."
    );
  }

  // Now we'll get the first custom model in the paged list
  const model = await client.getCustomModel(firstModel.modelId);
  console.log("--- First Custom Model ---");
  console.log(`Model Id: ${model.modelId}`);
  console.log(`Status: ${model.status}`);
  console.log("Documents used in training:");
  for (const doc of model.trainingDocuments || []) {
    console.log(`- ${doc.name}`);
  }

  // Finally, we can delete this model if we want (for example, if its status is 'invalid')
  //   await client.deleteModel(firstModel.modelId);
  //   try {
  //     const deleted = await client.getCustomModel(firstModel.modelId);
  //     console.log(deleted);
  //   } catch (err) {
  //     // Expected
  //     console.log(`Model with id ${firstModel.modelId} has been deleted`);
  //   }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
