// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample shows how to programmatically build a model with a single document type using a training data set.
 *
 * The Form Recognizer service expects the training data to be organized and labeled according to a particular
 * convention and stored in an Azure Storage container. For more information about creating a training data set, please
 * see the information at the following link to the service's documentation:
 *
 * https://aka.ms/azsdk/formrecognizer/buildtrainingset
 *
 * @summary build a model with a single document type from a training data set
 */

const {
  AzureKeyCredential,
  DocumentModelAdministrationClient,
  DocumentModelBuildMode,
} = require("@azure/ai-form-recognizer");

require("dotenv").config();

async function main() {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");

  const random = Date.now().toString();
  const modelId =
    (process.env.CUSTOM_MODEL_ID || "<model id>") + random.substring(random.length - 6);
  const trainingDataSasUrl =
    process.env.CUSTOM_MODEL_TRAINING_DATA_SAS_URL || "<training data container SAS url>";

  const client = new DocumentModelAdministrationClient(endpoint, credential);

  const poller = await client.beginBuildModel(
    modelId,
    trainingDataSasUrl,
    DocumentModelBuildMode.Template
  );
  const model = await poller.pollUntilDone();

  console.log("Model ID:", model.modelId);
  console.log("Description:", model.description);
  console.log("Created:", model.createdDateTime);

  // A model may contain several document types, which describe the possible object structures of fields extracted using
  // this model

  console.log("Document Types:");
  for (const [docType, { description, fieldSchema: schema }] of Object.entries(
    model.docTypes || {}
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
