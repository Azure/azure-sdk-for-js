// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the NetworkFabricControllers by subscription.
 *
 * @summary Lists all the NetworkFabricControllers by subscription.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkFabricControllers_ListBySubscription_MaximumSet_Gen.json
 */

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkFabricControllersListBySubscriptionMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const credential = new DefaultAzureCredential();
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
