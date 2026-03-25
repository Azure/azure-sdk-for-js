// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to revokes an iSCSI connection which can be used to download a script. Executing this script opens a file explorer
 * displaying all recoverable files and folders. This is an asynchronous operation.
 *
 * @summary revokes an iSCSI connection which can be used to download a script. Executing this script opens a file explorer
 * displaying all recoverable files and folders. This is an asynchronous operation.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/Revoke_Ilr.json
 */
async function revokeInstantItemLevelRecoveryForAzureVm() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.itemLevelRecoveryConnections.revoke(
    "PySDKBackupTestRsVault",
    "PythonSDKBackupTestRg",
    "Azure",
    "iaasvmcontainer;iaasvmcontainerv2;pysdktestrg;pysdktestv2vm1",
    "vm;iaasvmcontainerv2;pysdktestrg;pysdktestv2vm1",
    "1",
  );
}

async function main() {
  await revokeInstantItemLevelRecoveryForAzureVm();
}

main().catch(console.error);
