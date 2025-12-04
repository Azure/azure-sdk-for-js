// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete subvolume
 *
 * @summary delete subvolume
 * x-ms-original-file: 2025-09-01-preview/Subvolumes_Delete.json
 */
async function subvolumesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.subvolumes.delete("myRG", "account1", "pool1", "volume1", "subvolume1");
}

async function main() {
  await subvolumesDelete();
}

main().catch(console.error);
