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

const DocumentIntelligence = require("@azure-rest/ai-document-intelligence").default,
  { getLongRunningPoller, isUnexpected } = require("@azure-rest/ai-document-intelligence");

require("dotenv").config();

async function main() {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" },
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
  const model = (await (await poller).pollUntilDone()).body.result;
  if (!model) {
    throw new Error("Expected a DocumentModelDetailsOutput response.");
  }

  console.log("Model ID:", model.modelId);
  console.log("Description:", model.description);
  console.log("Created:", model.createdDateTime);

  // A model may contain several document types, which describe the possible object structures of fields extracted using
  // this model

  console.log("Document Types:");
  for (const [docType, { description, fieldSchema: schema }] of Object.entries(
    model.docTypes || {},
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

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
