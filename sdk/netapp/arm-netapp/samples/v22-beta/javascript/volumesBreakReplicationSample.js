// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to break the replication connection on the destination volume
 *
 * @summary break the replication connection on the destination volume
 * x-ms-original-file: 2025-09-01-preview/Volumes_BreakReplication.json
 */
async function volumesBreakReplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.breakReplication("myRG", "account1", "pool1", "volume1", {
    body: { forceBreakReplication: false },
  });
}

async function main() {
  await volumesBreakReplication();
}

main().catch(console.error);
