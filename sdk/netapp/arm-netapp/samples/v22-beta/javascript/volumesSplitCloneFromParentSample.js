// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to split operation to convert clone volume to an independent volume.
 *
 * @summary split operation to convert clone volume to an independent volume.
 * x-ms-original-file: 2025-09-01-preview/Volumes_SplitClone.json
 */
async function volumesSplitClone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.splitCloneFromParent("myRG", "account1", "pool1", "volume1");
  console.log(result);
}

async function main() {
  await volumesSplitClone();
}

main().catch(console.error);
