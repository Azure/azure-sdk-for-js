// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the give namespace name availability.
 *
 * @summary check the give namespace name availability.
 * x-ms-original-file: 2022-09-01/StorageSyncServiceCheckNameAvailability_AlreadyExists.json
 */
async function storageSyncServiceCheckNameAvailabilityAlreadyExists() {
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
async function storageSyncServiceCheckNameAvailabilityAvailable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5c6bc8e1-1eaf-4192-94d8-58ce463ac86c";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.storageSyncServices.checkNameAvailability("westus", {
    name: "newstoragesyncservicename",
    type: "Microsoft.StorageSync/storageSyncServices",
  });
  console.log(result);
}

async function main() {
  await storageSyncServiceCheckNameAvailabilityAlreadyExists();
  await storageSyncServiceCheckNameAvailabilityAvailable();
}

main().catch(console.error);
