// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new StorageSyncService.
 *
 * @summary create a new StorageSyncService.
 * x-ms-original-file: 2022-09-01/StorageSyncServices_Create.json
 */
async function storageSyncServicesCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.storageSyncServices.create(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    {
      identity: { type: "SystemAssigned, UserAssigned" },
      location: "WestUS",
      incomingTrafficPolicy: "AllowAllTraffic",
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageSyncServicesCreate();
}

main().catch(console.error);
