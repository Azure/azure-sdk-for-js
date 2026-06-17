// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the NetworkFabricControllers by subscription.
 *
 * @summary lists all the NetworkFabricControllers by subscription.
 * x-ms-original-file: 2025-07-15/NetworkFabricControllers_ListBySubscription.json
 */
async function networkFabricControllersListBySubscriptionMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
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
