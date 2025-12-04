// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the replication connection on the destination volume, and send release to the source replication
 *
 * @summary delete the replication connection on the destination volume, and send release to the source replication
 * x-ms-original-file: 2025-09-01-preview/Volumes_DeleteReplication.json
 */
async function volumesDeleteReplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.deleteReplication("myRG", "account1", "pool1", "volume1");
}

async function main() {
  await volumesDeleteReplication();
}

main().catch(console.error);
