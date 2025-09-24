// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Revokes an iSCSI connection which can be used to download a script. Executing this script opens a file explorer
displaying all recoverable files and folders. This is an asynchronous operation.
 *
 * @summary Revokes an iSCSI connection which can be used to download a script. Executing this script opens a file explorer
displaying all recoverable files and folders. This is an asynchronous operation.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/AzureIaasVm/Revoke_Ilr.json
 */

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function revokeInstantItemLevelRecoveryForAzureVM(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "PySDKBackupTestRsVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] ||
    "PythonSDKBackupTestRg";
  const fabricName = "Azure";
  const containerName =
    "iaasvmcontainer;iaasvmcontainerv2;pysdktestrg;pysdktestv2vm1";
  const protectedItemName = "vm;iaasvmcontainerv2;pysdktestrg;pysdktestv2vm1";
  const recoveryPointId = "1";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.itemLevelRecoveryConnections.revoke(
    vaultName,
    resourceGroupName,
    fabricName,
    containerName,
    protectedItemName,
    recoveryPointId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await revokeInstantItemLevelRecoveryForAzureVM();
}

main().catch(console.error);
