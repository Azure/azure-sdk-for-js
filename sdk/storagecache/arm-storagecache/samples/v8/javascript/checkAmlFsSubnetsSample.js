// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Check that subnets will be valid for AML file system create calls.
 *
 * @summary Check that subnets will be valid for AML file system create calls.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2025-07-01/examples/checkAmlFSSubnets.json
 */
async function checkAmlFsSubnets() {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const amlFilesystemSubnetInfo = {
    filesystemSubnet:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.Network/virtualNetworks/scvnet/subnets/fsSub",
    sku: { name: "AMLFS-Durable-Premium-125" },
    storageCapacityTiB: 16,
  };
  const options = { amlFilesystemSubnetInfo };
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.checkAmlFSSubnets(options);
  console.log(result);
}

async function main() {
  await checkAmlFsSubnets();
}

main().catch(console.error);
