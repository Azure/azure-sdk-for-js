// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reverts the volume relocation process, cleans up the new volume and starts using the former-existing volume.
 *
 * @summary reverts the volume relocation process, cleans up the new volume and starts using the former-existing volume.
 * x-ms-original-file: 2025-09-01-preview/Volumes_RevertRelocation.json
 */
async function volumesRevertRelocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.revertRelocation("myRG", "account1", "pool1", "volume1");
}

async function main() {
  await volumesRevertRelocation();
}

main().catch(console.error);
