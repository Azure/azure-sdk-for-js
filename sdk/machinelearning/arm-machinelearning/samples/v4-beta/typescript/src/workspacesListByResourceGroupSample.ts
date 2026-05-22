// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the available machine learning workspaces under the specified resource group.
 *
 * @summary lists all the available machine learning workspaces under the specified resource group.
 * x-ms-original-file: 2025-12-01/Workspace/listByResourceGroup.json
 */
async function getWorkspacesByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listByResourceGroup("workspace-1234")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getWorkspacesByResourceGroup();
}

main().catch(console.error);
