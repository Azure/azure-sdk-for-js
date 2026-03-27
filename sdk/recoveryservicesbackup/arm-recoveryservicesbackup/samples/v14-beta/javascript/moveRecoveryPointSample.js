// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to move recovery point from one datastore to another store.
 *
 * @summary move recovery point from one datastore to another store.
 * x-ms-original-file: 2026-01-01-preview/TriggerRecoveryPointMove_Post.json
 */
async function triggerRPMoveOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.moveRecoveryPoint(
    "testVault",
    "netsdktestrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "348916168024334",
    {
      objectType: "MoveRPAcrossTiersRequest",
      sourceTierType: "HardenedRP",
      targetTierType: "ArchivedRP",
    },
  );
}

async function main() {
  await triggerRPMoveOperation();
}

main().catch(console.error);
