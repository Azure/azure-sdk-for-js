// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all Service Fabric cluster resources created or in the process of being created in the subscription.
 *
 * @summary gets all Service Fabric cluster resources created or in the process of being created in the subscription.
 * x-ms-original-file: 2025-03-01-preview/ManagedClusterListBySubscriptionOperation_example.json
 */
async function listManagedClusters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedClusters();
}

main().catch(console.error);
