// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a composed model from several
 * individual labeled models.
 *
 * We train all of the models used in the compose and then finally create
 * the composed model.
 *
 * NOTE: Only models trained using labels can be composed. Attempting to
 * compose an unlabeled model will result in an error.
 */

const { FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";

  // This object will hold the SAS-encoded URLs to containers that hold
  // different types of purchase order documents and their labels.
  const purchaseOrderSasUrls = {
    supplies:
      process.env["PURCHASE_ORDER_OFFICE_SUPPLIES_SAS_URL"] ||
      "<sas url to container with purchase orders for supplies>",
    equipment:
      process.env["PURCHASE_ORDER_OFFICE_SUPPLIES_SAS_URL"] ||
      "<sas url to container with purchase orders for equipment>",
    furniture:
      process.env["PURCHASE_ORDER_OFFICE_SUPPLIES_SAS_URL"] ||
      "<sas url to container with purchase orders for furniture>",
    cleaningSupplies:
      process.env["PURCHASE_ORDER_OFFICE_SUPPLIES_SAS_URL"] ||
      "<sas url to container with purchase orders for cleaning supplies>"
  };

  // Train all of the individual models and extract their model IDs
  const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));

  const modelIds = await Promise.all(
    Object.entries(purchaseOrderSasUrls)
      .map(async ([kind, sasUrl]) => {
        const poller = await trainingClient.beginTraining(sasUrl, true, {
          onProgress(state) {
            console.log(`training model "${kind}": ${state.status}`);
          },
          modelName: kind
        });

        return poller.pollUntilDone();
      })
      .map(async (model) => (await model).modelId)
  );

  // Finally, create the composed model.

  const poller = await trainingClient.beginCreateComposedModel(modelIds, {
    onProgress(state) {
      console.log(`composing model "purchase_order": ${state.status}`);
    },
    modelName: "purchase_order"
  });

  const composedModel = await poller.pollUntilDone();

  // Print the model info to console
  console.log(`Composed model: ${composedModel.modelName} (${composedModel.modelId}`);

  console.log("Properties:", composedModel.properties);

  // Errors
  if (composedModel.errors && composedModel.errors.length > 0) {
    console.log("Model Errors:");
    for (const error of composedModel.errors) {
      console.log(`- [${error.code}] ${error.message}`);
    }
  }

  // Submodels
  console.log("Submodels:");
  for (const model of composedModel.submodels || []) {
    console.log(`- ${model.formType} (${model.modelId}) - ${model.accuracy} accuracy`);
    console.log("  Fields:");
    for (const [name, field] of Object.entries(model.fields)) {
      console.log(`  - ${name} (${field.accuracy} accuracy)`);
    }
  }

  // Training Documents
  console.log("Training Documents:");
  for (const info of composedModel.trainingDocuments || []) {
    console.log(`- ${info.name} (in ${info.modelId})`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
