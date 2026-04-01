// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers Data Move Operation on target vault
 *
 * @summary triggers Data Move Operation on target vault
 * x-ms-original-file: 2026-01-01-preview/BackupDataMove/TriggerDataMove_Post.json
 */
async function triggerDataMove() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.bmsTriggerDataMove("target-rsv", "targetRG", {
    correlationId: "MTg2OTcyMzM4NzYyMjc1NDY3Nzs1YmUzYmVmNi04YjJiLTRhOTItOTllYi01NTM0MDllYjk2NjE=",
    dataMoveLevel: "Vault",
    sourceRegion: "USGov Iowa",
    sourceResourceId:
      "/subscriptions/04cf684a-d41f-4550-9f70-7708a3a2283b/resourceGroups/sourceRG/providers/Microsoft.RecoveryServices/vaults/source-rsv",
  });
  console.log(result);
}

async function main() {
  await triggerDataMove();
}

main().catch(console.error);
