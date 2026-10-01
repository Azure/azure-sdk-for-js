// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to modify delta models associated with the InferenceGroup and the target base model.
 *
 * @summary modify delta models associated with the InferenceGroup and the target base model.
 * x-ms-original-file: 2026-03-15-preview/InferenceGroup/modifyDeltaModelsAsync.json
 */
async function modifyDeltaModelsAsyncInferenceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.inferenceGroups.modifyDeltaModelsAsync(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    {
      addDeltaModels: ["string"],
      removeDeltaModels: ["string"],
      targetBaseModel: "azureml://registries/test-registry/models/modelabc/versions/1",
    },
  );
}

async function main() {
  await modifyDeltaModelsAsyncInferenceGroup();
}

main().catch(console.error);
