// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the available machine learning workspaces connections under the specified workspace.
 *
 * @summary lists all the available machine learning workspaces connections under the specified workspace.
 * x-ms-original-file: 2025-12-01/WorkspaceConnection/list.json
 */
async function listWorkspaceConnections(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceConnections.list("resourceGroup-1", "workspace-1", {
    target: "www.facebook.com",
    category: "ContainerRegistry",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkspaceConnections();
}

main().catch(console.error);
