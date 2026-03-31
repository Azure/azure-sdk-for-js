// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list network usages for a subscription.
 *
 * @summary list network usages for a subscription.
 * x-ms-original-file: 2025-05-01/UsageList.json
 */
async function listUsages(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list network usages for a subscription.
 *
 * @summary list network usages for a subscription.
 * x-ms-original-file: 2025-05-01/UsageListSpacedLocation.json
 */
async function listUsagesSpacedLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("West US")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listUsages();
  await listUsagesSpacedLocation();
}

main().catch(console.error);
