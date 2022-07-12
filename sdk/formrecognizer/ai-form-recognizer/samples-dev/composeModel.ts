// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a composed model from several individual labeled models.
 *
 * We build all of the component models used in the composition operation and then finally create the composed model.
 * The resulting composed model will have all of the document types of its component submodels. When used for analysis,
 * it will first classify the input as belonging to one of the document types.zzs
 *
 * @summary create a composed model from several individual labeled models
 * @azsdk-weight 60
 */

import {
  DocumentModelAdministrationClient,
  AzureKeyCredential,
  DocumentModelBuildMode,
} from "@azure/ai-form-recognizer";

import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] || "<api key>";

  // This object will hold the SAS-encoded URLs to containers that hold
  // different types of purchase order documents and their labels.
  const purchaseOrderSasUrls = {
    supplies:
      process.env["PURCHASE_ORDER_SUPPLIES_SAS_URL"] ||
      "<sas url to container with purchase orders for supplies>",
    equipment:
      process.env["PURCHASE_ORDER_EQUIPMENT_SAS_URL"] ||
      "<sas url to container with purchase orders for equipment>",
    furniture:
      process.env["PURCHASE_ORDER_FURNITURE_SAS_URL"] ||
      "<sas url to container with purchase orders for furniture>",
    cleaningSupplies:
      process.env["PURCHASE_ORDER_CLEANING_SUPPLIES_SAS_URL"] ||
      "<sas url to container with purchase orders for cleaning supplies>",
  };

  // First, we need several models to compose, so for the sake of this example program, we will build them all using
  // training data in an Azure Storage account.
  const trainingClient = new DocumentModelAdministrationClient(
    endpoint,
    new AzureKeyCredential(apiKey)
  );

  // We'll put the last few digits of the current timestamp into the model IDs, just to make sure they're unique.
  const random = Date.now().toString();

  const modelIds = await Promise.all(
    Object.entries(purchaseOrderSasUrls)
      .map(async ([kind, sasUrl]) => {
        const modelId = kind + "ComponentModel" + random.substring(random.length - 6);
        const poller = await trainingClient.beginBuildModel(
          modelId,
          sasUrl,
          DocumentModelBuildMode.Neural,
          {
            description: "A model that extracts data from " + kind + " purchase orders.",
            onProgress: ({ status }) => {
              console.log(`training model "${kind}": ${status}`);
            },
          }
        );

        return poller.pollUntilDone();
      })
      .map(async (model) => (await model).modelId)
  );

  // Finally, create the composed model.

  const composedModelId = "purchaseOrders" + random.substring(random.length - 6);
  const poller = await trainingClient.beginComposeModel(composedModelId, modelIds, {
    description:
      "A composed model that classifies purchase order documents and extracts data from them.",
    onProgress(state) {
      console.log(`composing model "purchase_order": ${state.status}`);
    },
  });

  const composedModel = await poller.pollUntilDone();

  console.log("Model ID:", composedModel.modelId);
  console.log("Description:", composedModel.description);
  console.log("Created:", composedModel.createdDateTime);

  // The composed model should have a document type for each one of the individually built models that are composed into
  // this larger model.

  console.log("Document Types:");
  for (const [docType, { description, fieldSchema: schema }] of Object.entries(
    composedModel.docTypes || {}
  )) {
    console.log(`- Name: "${docType}"`);
    console.log(`  Description: "${description}"`);

    // For simplicity, this example will only show top-level field names
    console.log("  Fields:");

    for (const [fieldName, fieldSchema] of Object.entries(schema)) {
      console.log(`  - "${fieldName}" (${fieldSchema.type})`);
      console.log(`    ${fieldSchema.description || "<no description>"}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
