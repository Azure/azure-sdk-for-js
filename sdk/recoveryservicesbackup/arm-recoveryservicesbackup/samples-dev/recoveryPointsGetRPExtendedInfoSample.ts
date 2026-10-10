// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers fetching the additional details of a recovery point, which are not returned by the recovery point GET
 * API. This is an asynchronous operation. Returns tracking headers which can be tracked using the
 * GetRPExtendedInfoOperationResult API.
 *
 * @summary triggers fetching the additional details of a recovery point, which are not returned by the recovery point GET
 * API. This is an asynchronous operation. Returns tracking headers which can be tracked using the
 * GetRPExtendedInfoOperationResult API.
 * x-ms-original-file: 2026-10-01/AzureIaasVm/TriggerGetRPExtendedInfo.json
 */
async function triggerGetRPExtendedInfo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.recoveryPoints.getRPExtendedInfo("testRG", "testVault", "Azure", {
    properties: {
      recoveryPointIds: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.RecoveryServices/vaults/testVault/backupFabrics/Azure/protectionContainers/IaasVMContainer;iaasvmcontainerv2;testRG;testvmName/protectedItems/VM;iaasvmcontainerv2;testRG;testvmName/recoveryPoints/348916168024334",
      ],
    },
  });
}

async function main(): Promise<void> {
  await triggerGetRPExtendedInfo();
}

main().catch(console.error);
