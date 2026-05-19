// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a storage pool
 *
 * @summary create a storage pool
 * x-ms-original-file: 2026-01-01-preview/StoragePools_Create_MaximumSet_Gen.json
 */
async function storagePoolsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.create("rgpurestorage", "storagepool-01", {
    properties: {
      availabilityZone: "1",
      vnetInjection: {
        subnetId:
          "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgpurestorage/providers/Microsoft.Network/virtualNetworks/vnet-01/subnets/subnet-01",
        vnetId:
          "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgpurestorage/providers/Microsoft.Network/virtualNetworks/vnet-01",
      },
      provisionedBandwidthMbPerSec: 17,
      reservationResourceId:
        "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgpurestorage/providers/PureStorage.Block/reservations/reservation-01",
    },
    identity: { type: "None", userAssignedIdentities: { "identity-01": {} } },
    tags: { environment: "production" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await storagePoolsCreate();
}

main().catch(console.error);
