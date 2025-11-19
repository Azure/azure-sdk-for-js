// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements AccessControlLists list by subscription GET method.
 *
 * @summary implements AccessControlLists list by subscription GET method.
 * x-ms-original-file: 2024-06-15-preview/AccessControlLists_ListBySubscription.json
 */
async function accessControlListsListBySubscriptionMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accessControlLists.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await accessControlListsListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
