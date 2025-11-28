// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to relocates volume to a new stamp
 *
 * @summary relocates volume to a new stamp
 * x-ms-original-file: 2025-09-01-preview/Volumes_Relocate.json
 */
async function volumesRelocate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.relocate("myRG", "account1", "pool1", "volume1", {
    body: {},
  });
}

async function main() {
  await volumesRelocate();
}

main().catch(console.error);
