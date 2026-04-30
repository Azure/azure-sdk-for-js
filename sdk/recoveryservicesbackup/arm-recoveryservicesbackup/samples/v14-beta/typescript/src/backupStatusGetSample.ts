// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the container backup status
 *
 * @summary get the container backup status
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/GetBackupStatus.json
 */
async function getAzureVirtualMachineBackupStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupStatus.get("southeastasia", {
    resourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Compute/VirtualMachines/testVm",
    resourceType: "VM",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getAzureVirtualMachineBackupStatus();
}

main().catch(console.error);
