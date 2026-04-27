// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of workflows within a resource group.
 *
 * @summary gets a list of workflows within a resource group.
 * x-ms-original-file: 2025-03-01-preview/Workflow_ListByResourceGroup.json
 */
async function listWorkflows(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflow.listByResourceGroup("resourceGroup1", {
    managedClusterResource:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/resourceGroup1/providers/Microsoft.ContainerService/managedClusters/cluster1",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkflows();
}

main().catch(console.error);
