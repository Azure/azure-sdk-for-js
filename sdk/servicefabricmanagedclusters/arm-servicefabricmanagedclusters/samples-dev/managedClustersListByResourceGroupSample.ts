// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all Service Fabric cluster resources created or in the process of being created in the resource group.
 *
 * @summary gets all Service Fabric cluster resources created or in the process of being created in the resource group.
 * x-ms-original-file: 2025-03-01-preview/ManagedClusterListByResourceGroupOperation_example.json
 */
async function listClusterByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusters.listByResourceGroup("resRg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listClusterByResourceGroup();
}

main().catch(console.error);
