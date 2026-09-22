// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Inference Group Skus.
 *
 * @summary list Inference Group Skus.
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceGroup/listSkus.json
 */
async function listSkusWorkspaceInferenceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.inferenceGroups.listSkus(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    { count: 1 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSkusWorkspaceInferenceGroup();
}

main().catch(console.error);
