// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to displays NetworkMonitors list by subscription GET method.
 *
 * @summary displays NetworkMonitors list by subscription GET method.
 * x-ms-original-file: 2024-06-15-preview/NetworkMonitors_ListBySubscription.json
 */
async function networkMonitorsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkMonitors.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkMonitorsListBySubscription();
}

main().catch(console.error);
