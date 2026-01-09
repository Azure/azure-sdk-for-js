// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to moves volume to another pool
 *
 * @summary moves volume to another pool
 * x-ms-original-file: 2025-09-01-preview/Volumes_PoolChange.json
 */
async function volumesAuthorizeReplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.poolChange("myRG", "account1", "pool1", "volume1", {
    newPoolResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/netAppAccounts/account1/capacityPools/pool1",
  });
}

async function main() {
  await volumesAuthorizeReplication();
}

main().catch(console.error);
