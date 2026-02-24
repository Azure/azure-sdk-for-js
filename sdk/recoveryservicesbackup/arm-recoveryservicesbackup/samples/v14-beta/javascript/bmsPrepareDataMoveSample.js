// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to prepares source vault for Data Move operation
 *
 * @summary prepares source vault for Data Move operation
 * x-ms-original-file: 2026-01-01-preview/BackupDataMove/PrepareDataMove_Post.json
 */
async function prepareDataMove() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.bmsPrepareDataMove("source-rsv", "sourceRG", {
    dataMoveLevel: "Vault",
    targetRegion: "USGov Virginia",
    targetResourceId:
      "/subscriptions/04cf684a-d41f-4550-9f70-7708a3a2283b/resourceGroups/targetRG/providers/Microsoft.RecoveryServices/vaults/target-rsv",
  });
  console.log(result);
}

async function main() {
  await prepareDataMove();
}

main().catch(console.error);
