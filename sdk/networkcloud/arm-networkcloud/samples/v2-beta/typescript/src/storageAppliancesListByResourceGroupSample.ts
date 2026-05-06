// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of storage appliances in the provided resource group.
 *
 * @summary get a list of storage appliances in the provided resource group.
 * x-ms-original-file: 2026-05-01-preview/StorageAppliances_ListByResourceGroup.json
 */
async function listStorageAppliancesForResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageAppliances.listByResourceGroup("resourceGroupName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listStorageAppliancesForResourceGroup();
}

main().catch(console.error);
