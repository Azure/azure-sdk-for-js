// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a given StorageSyncService.
 *
 * @summary get a given StorageSyncService.
 * x-ms-original-file: 2022-09-01/StorageSyncServices_Get.json
 */
async function storageSyncServicesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.storageSyncServices.get(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageSyncServicesGet();
}

main().catch(console.error);
