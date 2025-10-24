// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the latest status of the backup for a volume
 *
 * @summary get the latest status of the backup for a volume
 * x-ms-original-file: 2025-07-01-preview/Volumes_LatestBackupStatus.json
 */
async function volumesBackupStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backups.getLatestStatus("myRG", "account1", "pool1", "volume1");
  console.log(result);
}

async function main() {
  await volumesBackupStatus();
}

main().catch(console.error);
