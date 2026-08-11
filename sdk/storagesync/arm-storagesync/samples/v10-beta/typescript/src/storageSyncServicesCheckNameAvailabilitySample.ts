// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check the give namespace name availability.
 *
 * @summary check the give namespace name availability.
 * x-ms-original-file: 2022-09-01/StorageSyncServiceCheckNameAvailability_AlreadyExists.json
 */
async function storageSyncServiceCheckNameAvailabilityAlreadyExists(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5c6bc8e1-1eaf-4192-94d8-58ce463ac86c";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.storageSyncServices.checkNameAvailability("westus", {
    name: "newstoragesyncservicename",
    type: "Microsoft.StorageSync/storageSyncServices",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to check the give namespace name availability.
 *
 * @summary check the give namespace name availability.
 * x-ms-original-file: 2022-09-01/StorageSyncServiceCheckNameAvailability_Available.json
 */
async function storageSyncServiceCheckNameAvailabilityAvailable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5c6bc8e1-1eaf-4192-94d8-58ce463ac86c";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.storageSyncServices.checkNameAvailability("westus", {
    name: "newstoragesyncservicename",
    type: "Microsoft.StorageSync/storageSyncServices",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await storageSyncServiceCheckNameAvailabilityAlreadyExists();
  await storageSyncServiceCheckNameAvailabilityAvailable();
}

main().catch(console.error);
