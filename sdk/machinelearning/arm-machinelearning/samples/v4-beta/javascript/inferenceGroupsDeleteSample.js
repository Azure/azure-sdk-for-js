// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete InferenceGroup (asynchronous).
 *
 * @summary delete InferenceGroup (asynchronous).
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceGroup/delete.json
 */
async function deleteWorkspaceInferenceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.inferenceGroups.delete("test-rg", "my-aml-workspace", "string", "string");
}

async function main() {
  await deleteWorkspaceInferenceGroup();
}

main().catch(console.error);
