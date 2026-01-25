// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reconcile Arc Settings with information related to all nodes.
 *
 * @summary reconcile Arc Settings with information related to all nodes.
 * x-ms-original-file: 2025-12-01-preview/reconcileArcSettings.json
 */
async function reconcileArcSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.arcSettings.reconcile("test-rg", "myCluster", "default", {
    properties: {
      clusterNodes: [
        "/subscriptions/sub1/resourceGroup/res1/providers/Microsoft.HybridCompute/machines/m1",
        "/subscriptions/sub1/resourceGroup/res1/providers/Microsoft.HybridCompute/machines/m2",
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await reconcileArcSettings();
}

main().catch(console.error);
