// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all device pools in a subscription.
 *
 * @summary list all device pools in a subscription.
 * x-ms-original-file: 2026-03-01-preview/DevicePools_ListBySubscription.json
 */
async function listDevicePoolsInAGivenSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devicePools.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDevicePoolsInAGivenSubscription();
}

main().catch(console.error);
