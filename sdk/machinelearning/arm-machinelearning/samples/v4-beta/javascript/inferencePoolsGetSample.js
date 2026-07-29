// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get InferencePool.
 *
 * @summary get InferencePool.
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferencePool/get.json
 */
async function getWorkspaceInferencePool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.inferencePools.get("test-rg", "my-aml-workspace", "string");
  console.log(result);
}

async function main() {
  await getWorkspaceInferencePool();
}

main().catch(console.error);
