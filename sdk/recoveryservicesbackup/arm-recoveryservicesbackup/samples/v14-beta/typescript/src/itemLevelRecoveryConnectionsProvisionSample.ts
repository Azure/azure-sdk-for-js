// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provisions a script which invokes an iSCSI connection to the backup data. Executing this script opens a file
 * explorer displaying all the recoverable files and folders. This is an asynchronous operation. To know the status of
 * provisioning, call GetProtectedItemOperationResult API.
 *
 * @summary provisions a script which invokes an iSCSI connection to the backup data. Executing this script opens a file
 * explorer displaying all the recoverable files and folders. This is an asynchronous operation. To know the status of
 * provisioning, call GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/Provision_Ilr.json
 */
async function provisionInstantItemLevelRecoveryForAzureVm(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.itemLevelRecoveryConnections.provision(
    "PySDKBackupTestRsVault",
    "PythonSDKBackupTestRg",
    "Azure",
    "iaasvmcontainer;iaasvmcontainerv2;pysdktestrg;pysdktestv2vm1",
    "vm;iaasvmcontainerv2;pysdktestrg;pysdktestv2vm1",
    "1",
    {
      properties: {
        initiatorName: "Hello World",
        objectType: "IaasVMILRRegistrationRequest",
        recoveryPointId: "38823086363464",
        renewExistingRegistration: true,
        virtualMachineId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/pysdktestrg/providers/Microsoft.Compute/virtualMachines/pysdktestv2vm1",
      },
    },
  );
}

async function main(): Promise<void> {
  await provisionInstantItemLevelRecoveryForAzureVm();
}

main().catch(console.error);
