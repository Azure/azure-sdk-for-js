// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a storage sync service.
 *
 * @summary gets the private link resources that need to be created for a storage sync service.
 * x-ms-original-file: 2022-09-01/PrivateLinkResources_List.json
 */
async function privateLinkResourcesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.privateLinkResources.listByStorageSyncService("res6977", "sss2527");
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkResourcesList();
}

main().catch(console.error);
