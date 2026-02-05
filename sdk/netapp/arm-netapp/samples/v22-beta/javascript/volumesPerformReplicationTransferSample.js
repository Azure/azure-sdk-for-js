// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to performs an adhoc replication transfer on a volume with volumeType Migration
 *
 * @summary performs an adhoc replication transfer on a volume with volumeType Migration
 * x-ms-original-file: 2025-09-01-preview/Volumes_PerformReplicationTransfer.json
 */
async function volumesPerformReplicationTransfer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.performReplicationTransfer("myRG", "account1", "pool1", "volume1");
}

async function main() {
  await volumesPerformReplicationTransfer();
}

main().catch(console.error);
