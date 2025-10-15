// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Storage Movers in a resource group.
 *
 * @summary lists all Storage Movers in a resource group.
 * x-ms-original-file: 2025-07-01/StorageMovers_List.json
 */
async function storageMoversList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageMovers.list("examples-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await storageMoversList();
}

main().catch(console.error);
