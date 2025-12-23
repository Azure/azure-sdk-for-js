// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the specified volume within the capacity pool
 *
 * @summary create or update the specified volume within the capacity pool
 * x-ms-original-file: 2025-09-01-preview/Volumes_CreateOrUpdate.json
 */
async function volumesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.createOrUpdate("myRG", "account1", "pool1", "volume1", {
    location: "eastus",
    properties: {
      creationToken: "my-unique-file-path",
      serviceLevel: "Premium",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRP/providers/Microsoft.Network/virtualNetworks/testvnet3/subnets/testsubnet3",
      usageThreshold: 107374182400,
    },
  });
  console.log(result);
}

async function main() {
  await volumesCreateOrUpdate();
}

main().catch(console.error);
