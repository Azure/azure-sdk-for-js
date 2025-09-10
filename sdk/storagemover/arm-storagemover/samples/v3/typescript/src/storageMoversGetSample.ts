// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Storage Mover resource.
 *
 * @summary gets a Storage Mover resource.
 * x-ms-original-file: 2025-07-01/StorageMovers_Get.json
 */
async function storageMoversGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.storageMovers.get("examples-rg", "examples-storageMoverName");
  console.log(result);
}

async function main(): Promise<void> {
  await storageMoversGet();
}

main().catch(console.error);
