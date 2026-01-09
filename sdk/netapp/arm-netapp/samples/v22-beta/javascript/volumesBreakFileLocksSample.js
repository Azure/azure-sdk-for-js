// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to break all the file locks on a volume
 *
 * @summary break all the file locks on a volume
 * x-ms-original-file: 2025-09-01-preview/Volumes_BreakFileLocks.json
 */
async function volumesBreakFileLocks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.breakFileLocks("myRG", "account1", "pool1", "volume1", {
    body: {
      clientIp: "101.102.103.104",
      confirmRunningDisruptiveOperation: true,
    },
  });
}

async function main() {
  await volumesBreakFileLocks();
}

main().catch(console.error);
