// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the NetworkFabricControllers by subscription.
 *
 * @summary lists all the NetworkFabricControllers by subscription.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabricControllers_ListBySubscription.json
 */
async function networkFabricControllersListBySubscriptionMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkFabricControllers.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkFabricControllersListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
