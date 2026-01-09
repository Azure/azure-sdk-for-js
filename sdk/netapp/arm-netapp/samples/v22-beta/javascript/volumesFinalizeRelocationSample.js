// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to finalizes the relocation of the volume and cleans up the old volume.
 *
 * @summary finalizes the relocation of the volume and cleans up the old volume.
 * x-ms-original-file: 2025-09-01-preview/Volumes_FinalizeRelocation.json
 */
async function volumesFinalizeRelocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.finalizeRelocation("myRG", "account1", "pool1", "volume1");
}

async function main() {
  await volumesFinalizeRelocation();
}

main().catch(console.error);
