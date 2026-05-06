// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of storage appliances in the provided subscription.
 *
 * @summary get a list of storage appliances in the provided subscription.
 * x-ms-original-file: 2026-05-01-preview/StorageAppliances_ListBySubscription.json
 */
async function listStorageAppliancesForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageAppliances.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listStorageAppliancesForSubscription();
}

main().catch(console.error);
