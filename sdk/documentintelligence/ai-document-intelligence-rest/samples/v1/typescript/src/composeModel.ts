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
 */

import type {
  DocumentModelComposeOperationDetailsOutput,
} from "@azure-rest/ai-document-intelligence";
import DocumentIntelligence, {
  getLongRunningPoller,
  isUnexpected,
} from "@azure-rest/ai-document-intelligence";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function main(): Promise<void> {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    new DefaultAzureCredential(),
  );

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

  // We'll put the last few digits of the current timestamp into the model IDs, just to make sure they're unique.
  const random = Date.now().toString();

  const componentModelIds = await Promise.all(
    Object.entries(purchaseOrderSasUrls).map(async ([kind, sasUrl]) => {
      const modelId = kind + "ComponentModel" + random.substring(random.length - 6);
      const initialResponse = await client.path("/documentModels:build").post({
        body: {
          buildMode: "template",
          modelId: modelId,
          azureBlobSource: {
            containerUrl: sasUrl,
          },
        },
      });
      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }
      const poller = getLongRunningPoller(client, initialResponse);
      await poller.pollUntilDone();

      return { kind, modelId };
    }),
  );

  // Finally, create the composed model.
  
  const composedModelId = "purchaseOrders" + random.substring(random.length - 6);

  // Create docTypes mapping for the compose request
  const docTypes: Record<string, any> = {};
  for (const { kind, modelId } of componentModelIds) {
    docTypes[kind] = {
      modelId: modelId,
      description: `Document type for ${kind}`,
    };
  }

  const initialResponse = await client.path("/documentModels:compose").post({
    body: {
      modelId: composedModelId,
      description:
        "A composed model that classifies purchase order documents and extracts data from them.",
      classifierId: "prebuilt-layout", // Using a placeholder classifier - in practice this should be a trained classifier
      docTypes: docTypes,
    },
  });

  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const poller = getLongRunningPoller(client, initialResponse);

  const composedModel = (
    (await poller.pollUntilDone()).body as DocumentModelComposeOperationDetailsOutput
  ).result!;

  console.log("Model ID:", composedModel.modelId);
  console.log("Description:", composedModel.description);
  console.log("Created:", composedModel.createdDateTime);

  // The composed model should have a document type for each one of the individually built models that are composed into
  // this larger model.

  console.log("Document Types:");
  for (const [docType, docTypeDetails] of Object.entries(composedModel.docTypes || {})) {
    const { description, fieldSchema: schema } = docTypeDetails;
    console.log(`- Name: "${docType}"`);
    console.log(`  Description: "${description}"`);

    // For simplicity, this example will only show top-level field names
    console.log("  Fields:");
    if (!schema) {
      console.log("    <no fields>");
      continue;
    }

    for (const [fieldName, fieldSchema] of Object.entries(schema)) {
      console.log(`  - "${fieldName}" (${fieldSchema.type})`);
      console.log(`    ${fieldSchema.description || "<no description>"}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
