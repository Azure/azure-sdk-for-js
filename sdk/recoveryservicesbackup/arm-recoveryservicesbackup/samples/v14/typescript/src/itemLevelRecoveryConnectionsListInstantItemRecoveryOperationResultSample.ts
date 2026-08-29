// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the mount scripts (iSCSI connection details) for an active Instant Item Recovery (ILR) session on the recovery point. Required from API version 2026-08-01 onwards; replaces the scripts previously returned inline in the operationsStatus (ILR provision) response.
 *
 * @summary fetches the mount scripts (iSCSI connection details) for an active Instant Item Recovery (ILR) session on the recovery point. Required from API version 2026-08-01 onwards; replaces the scripts previously returned inline in the operationsStatus (ILR provision) response.
 * x-ms-original-file: 2026-08-01/AzureIaasVm/ListInstantItemRecoveryOperationResult.json
 */
async function listTheInstantItemRecoveryOperationResultMountScriptsForAnActiveILRSession(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.itemLevelRecoveryConnections.listInstantItemRecoveryOperationResult(
    "PythonSDKBackupTestRg",
    "PySDKBackupTestRsVault",
    "Azure",
    "iaasvmcontainer;iaasvmcontainerv2;pysdktestrg;pysdktestv2vm1",
    "vm;iaasvmcontainerv2;pysdktestrg;pysdktestv2vm1",
    "38823086363464",
    { provisionInstantItemRecoveryOperationId: "00000000-0000-0000-0000-000000000001" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listTheInstantItemRecoveryOperationResultMountScriptsForAnActiveILRSession();
}

main().catch(console.error);
