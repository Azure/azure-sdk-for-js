// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to finalizes the migration of an external volume by releasing the replication and breaking the external cluster peering if no other migration is active.
 *
 * @summary finalizes the migration of an external volume by releasing the replication and breaking the external cluster peering if no other migration is active.
 * x-ms-original-file: 2025-09-01-preview/Volumes_FinalizeExternalReplication.json
 */
async function volumesFinalizeExternalReplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.finalizeExternalReplication("myRG", "account1", "pool1", "volume1");
}

async function main() {
  await volumesFinalizeExternalReplication();
}

main().catch(console.error);
