// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validate operation for specified backed up item in the form of an asynchronous operation. Returns tracking headers which can be tracked using GetValidateOperationResult API.
 *
 * @summary validate operation for specified backed up item in the form of an asynchronous operation. Returns tracking headers which can be tracked using GetValidateOperationResult API.
 * x-ms-original-file: 2026-10-01/AzureIaasVm/TriggerValidateOperation_RestoreDisk.json
 */
async function triggerValidateOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.validateOperation.trigger("testVault", "testRG", {
    id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testVault/providers/Microsoft.RecoveryServices/vaults/testVault/backupFabrics/Azure/protectionContainers/IaasVMContainer;iaasvmcontainerv2;testRG;testvmName/protectedItems/VM;iaasvmcontainerv2;testRG;testvmName/recoveryPoints/348916168024334",
    properties: {
      objectType: "ValidateIaasVMRestoreOperationRequest",
      restoreRequest: {
        createNewCloudService: true,
        encryptionDetails: { encryptionEnabled: false },
        identityInfo: {
          isSystemAssignedIdentity: false,
          managedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/asmaskarRG1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/asmaskartestmsi",
        },
        objectType: "IaasVMRestoreRequest",
        originalStorageAccountOption: false,
        recoveryPointId: "348916168024334",
        recoveryType: "RestoreDisks",
        region: "southeastasia",
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg/providers/Microsoft.Compute/virtualMachines/netvmtestv2vm1",
        storageAccountId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testingRg/providers/Microsoft.Storage/storageAccounts/testAccount",
      },
    },
  });
}

/**
 * This sample demonstrates how to validate operation for specified backed up item in the form of an asynchronous operation. Returns tracking headers which can be tracked using GetValidateOperationResult API.
 *
 * @summary validate operation for specified backed up item in the form of an asynchronous operation. Returns tracking headers which can be tracked using GetValidateOperationResult API.
 * x-ms-original-file: 2026-10-01/AzureWorkload/TriggerValidateOperation_SnapshotFilesystemClash.json
 */
async function validateSQLSnapshotRestoreAfterResolvingFilesystemClashes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.validateOperation.trigger("testVault", "testRG", {
    id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.RecoveryServices/vaults/testVault/backupFabrics/Azure/protectionContainers/VMAppContainer;Compute;testRG;sqlVm/protectedItems/SQLDataBase;mssqlserver;inventory/recoveryPoints/1700000000000",
    properties: {
      objectType: "ValidateAzureWorkloadRestoreOperationRequest",
      restoreRequest: {
        objectType: "AzureWorkloadSQLRestoreRequest",
        recoveryMode: "Snapshot",
        recoveryType: "AlternateLocation",
        snapshotRestoreParameters: {
          disksToDetachOnClash: [
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/targetRG/providers/Microsoft.Compute/disks/sqlDataDisk01",
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/targetRG/providers/Microsoft.Compute/disks/sqlLogDisk01",
          ],
          skipAttachAndMount: false,
        },
        shouldUseAlternateTargetLocation: true,
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.Compute/virtualMachines/sqlVm",
        targetResourceGroupName: "targetRG",
        targetVirtualMachineId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/targetRG/providers/Microsoft.Compute/virtualMachines/sqlRestoreVm",
      },
    },
  });
}

async function main(): Promise<void> {
  await triggerValidateOperation();
  await validateSQLSnapshotRestoreAfterResolvingFilesystemClashes();
}

main().catch(console.error);
