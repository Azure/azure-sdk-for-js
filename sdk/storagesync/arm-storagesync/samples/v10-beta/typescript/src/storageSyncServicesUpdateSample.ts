// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch a given StorageSyncService.
 *
 * @summary patch a given StorageSyncService.
 * x-ms-original-file: 2022-09-01/StorageSyncServices_Update.json
 */
async function storageSyncServicesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.storageSyncServices.update(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    {
      parameters: {
        incomingTrafficPolicy: "AllowAllTraffic",
        useIdentity: true,
        tags: { Dept: "IT", Environment: "Test" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageSyncServicesUpdate();
}

main().catch(console.error);
