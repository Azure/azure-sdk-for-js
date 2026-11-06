// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to programmatically build a model with a single document type using a training data set.
 *
 * The Document Intelligence service expects the training data to be organized and labeled according to a particular
 * convention and stored in an Azure Storage container. For more information about creating a training data set, please
 * see the information at the following link to the service's documentation:
 *
 * https://aka.ms/azsdk/documentitelligence/buildtrainingset
 *
 * @summary build a model with a single document type from a training data set
 */

import type { DocumentModelBuildOperationDetailsOutput } from "@azure-rest/ai-document-intelligence";
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
  const random = Date.now().toString();
  const modelId =
    (process.env.CUSTOM_MODEL_ID || "<model id>") + random.substring(random.length - 6);
  const trainingDataSasUrl =
    process.env.CUSTOM_MODEL_TRAINING_DATA_SAS_URL || "<training data container SAS url>";

  const initialResponse = await client.path("/documentModels:build").post({
    body: {
      buildMode: "template",
      modelId,
      azureBlobSource: {
        containerUrl: trainingDataSasUrl,
      },
    },
  });

  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const poller = getLongRunningPoller(client, initialResponse);
  const model = ((await poller.pollUntilDone()).body as DocumentModelBuildOperationDetailsOutput)
    .result;
  if (!model) {
    throw new Error("Expected a DocumentModelDetailsOutput response.");
  }

  console.log("Model ID:", model.modelId);
  console.log("Description:", model.description);
  console.log("Created:", model.createdDateTime);

  // A model may contain several document types, which describe the possible object structures of fields extracted using
  // this model

  console.log("Document Types:");
  for (const [docType, docTypeDetails] of Object.entries(model.docTypes || {})) {
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

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
