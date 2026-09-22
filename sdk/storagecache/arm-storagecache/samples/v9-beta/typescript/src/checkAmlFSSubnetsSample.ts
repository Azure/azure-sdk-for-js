// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check that subnets will be valid for AML file system create calls.
 *
 * @summary check that subnets will be valid for AML file system create calls.
 * x-ms-original-file: 2026-01-01/checkAmlFSSubnets.json
 */
async function checkAmlFSSubnets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.checkAmlFSSubnets({
    amlFilesystemSubnetInfo: {
      filesystemSubnet:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.Network/virtualNetworks/scvnet/subnets/fsSub",
      sku: { name: "AMLFS-Durable-Premium-125" },
      storageCapacityTiB: 16,
    },
  });
}

async function main(): Promise<void> {
  await checkAmlFSSubnets();
}

main().catch(console.error);
