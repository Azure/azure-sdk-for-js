// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve status of delta models associated with the InferenceGroup and the target base model.
 *
 * @summary retrieve status of delta models associated with the InferenceGroup and the target base model.
 * x-ms-original-file: 2026-03-15-preview/InferenceGroup/getDeltaModelsStatusAsync.json
 */
async function getDeltaModelsStatusAsyncInferenceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.inferenceGroups.getDeltaModelsStatusAsync(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    {
      deltaModels: ["string"],
      targetBaseModel: "azureml://registries/test-registry/models/modelabc/versions/1",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDeltaModelsStatusAsyncInferenceGroup();
}

main().catch(console.error);
