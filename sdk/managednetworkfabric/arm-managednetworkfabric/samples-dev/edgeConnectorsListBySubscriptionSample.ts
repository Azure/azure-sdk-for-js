// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists EdgeConnectors by subscription.
 *
 * @summary lists EdgeConnectors by subscription.
 * x-ms-original-file: 2026-01-15-preview/EdgeConnectors_ListBySubscription.json
 */
async function edgeConnectorsListBySubscriptionMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeConnectors.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await edgeConnectorsListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
