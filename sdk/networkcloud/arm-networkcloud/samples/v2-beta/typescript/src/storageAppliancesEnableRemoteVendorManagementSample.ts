// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enable remote vendor management of the provided storage appliance.
 *
 * @summary enable remote vendor management of the provided storage appliance.
 * x-ms-original-file: 2026-05-01-preview/StorageAppliances_EnableRemoteVendorManagement.json
 */
async function turnOnRemoteVendorManagementForStorageAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.storageAppliances.enableRemoteVendorManagement(
    "resourceGroupName",
    "storageApplianceName",
    {
      storageApplianceEnableRemoteVendorManagementParameters: { supportEndpoints: ["10.0.0.0/24"] },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await turnOnRemoteVendorManagementForStorageAppliance();
}

main().catch(console.error);
