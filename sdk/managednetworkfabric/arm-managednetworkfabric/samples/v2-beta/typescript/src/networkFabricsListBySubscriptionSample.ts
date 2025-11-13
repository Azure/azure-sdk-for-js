// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the Network Fabric resources in the given subscription.
 *
 * @summary list all the Network Fabric resources in the given subscription.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabrics_ListBySubscription.json
 */
async function networkFabricsListBySubscriptionMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkFabrics.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkFabricsListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
