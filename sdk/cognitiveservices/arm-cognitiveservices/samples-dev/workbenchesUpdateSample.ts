// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a workbench associated with the project.
 *
 * @summary updates a workbench associated with the project.
 * x-ms-original-file: 2026-09-15-preview/UpdateWorkbench.json
 */
async function updateWorkbench(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.workbenches.update(
    "rgcognitiveservices",
    "myAccount",
    "myProject",
    "myWorkbench",
    { properties: { idleTimeBeforeShutdown: "PT1H" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a workbench associated with the project.
 *
 * @summary updates a workbench associated with the project.
 * x-ms-original-file: 2026-09-15-preview/UpdateWorkbenchComputeProperties.json
 */
async function updateWorkbenchComputeProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.workbenches.update(
    "rgcognitiveservices",
    "myAccount",
    "myProject",
    "myWorkbench",
    {
      properties: {
        targetClusterId:
          "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/vc-rg/providers/Microsoft.MachineLearningServices/virtualClusters/test-vc",
        idleTimeBeforeShutdown: "PT1H",
        instanceType: "Singularity.ND12_H100_v5-n1",
        gpuCount: 1,
      },
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/rgcognitiveservices/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity":
            {},
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a workbench associated with the project.
 *
 * @summary updates a workbench associated with the project.
 * x-ms-original-file: 2026-09-15-preview/UpdateWorkbenchResetComputeProperties.json
 */
async function updateWorkbenchResetComputeProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.workbenches.update(
    "rgcognitiveservices",
    "myAccount",
    "myProject",
    "myWorkbench",
    { properties: { instanceType: undefined, gpuCount: undefined } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateWorkbench();
  await updateWorkbenchComputeProperties();
  await updateWorkbenchResetComputeProperties();
}

main().catch(console.error);
