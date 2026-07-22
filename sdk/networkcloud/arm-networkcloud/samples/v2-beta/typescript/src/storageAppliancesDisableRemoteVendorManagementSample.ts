// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disable remote vendor management of the provided storage appliance.
 *
 * @summary disable remote vendor management of the provided storage appliance.
 * x-ms-original-file: 2026-05-01-preview/StorageAppliances_DisableRemoteVendorManagement.json
 */
async function turnOffRemoteVendorManagementForStorageAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.storageAppliances.disableRemoteVendorManagement(
    "resourceGroupName",
    "storageApplianceName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await turnOffRemoteVendorManagementForStorageAppliance();
}

main().catch(console.error);
