// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list delta models associated with the InferenceGroup and the target base model.
 *
 * @summary list delta models associated with the InferenceGroup and the target base model.
 * x-ms-original-file: 2026-03-15-preview/InferenceGroup/listDeltaModelsAsync.json
 */
async function listDeltaModelsAsyncInferenceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.inferenceGroups.listDeltaModelsAsync(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    {
      count: -1,
      skipToken: "string",
      targetBaseModel: "azureml://registries/test-registry/models/modelabc/versions/1",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDeltaModelsAsyncInferenceGroup();
}

main().catch(console.error);
