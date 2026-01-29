// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to re-Initializes the replication connection on the destination volume
 *
 * @summary re-Initializes the replication connection on the destination volume
 * x-ms-original-file: 2025-09-01-preview/Volumes_ReInitializeReplication.json
 */
async function volumesReInitializeReplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.reInitializeReplication("myRG", "account1", "pool1", "volume1");
}

async function main() {
  await volumesReInitializeReplication();
}

main().catch(console.error);
