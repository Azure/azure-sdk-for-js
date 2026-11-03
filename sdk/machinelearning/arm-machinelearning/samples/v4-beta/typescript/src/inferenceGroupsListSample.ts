// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Inference Groups.
 *
 * @summary list Inference Groups.
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceGroup/list.json
 */
async function listWorkspaceInferenceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.inferenceGroups.list("test-rg", "my-aml-workspace", "string", {
    count: 1,
    tags: "string",
    properties: "string",
    orderBy: "CreatedAtDesc",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkspaceInferenceGroup();
}

main().catch(console.error);
