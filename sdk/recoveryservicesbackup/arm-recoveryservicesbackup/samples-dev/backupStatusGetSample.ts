// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the container backup status
 *
 * @summary Get the container backup status
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/AzureIaasVm/GetBackupStatus.json
 */

import {
  BackupStatusRequest,
  RecoveryServicesBackupClient,
} from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAzureVirtualMachineBackupStatus(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const azureRegion = "southeastasia";
  const parameters: BackupStatusRequest = {
    resourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Compute/VirtualMachines/testVm",
    resourceType: "VM",
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupStatus.get(azureRegion, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await getAzureVirtualMachineBackupStatus();
}

main().catch(console.error);
