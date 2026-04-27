// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validate operation for specified backed up item. This is a synchronous operation.
 *
 * @summary validate operation for specified backed up item. This is a synchronous operation.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ValidateOperation_RestoreDisk.json
 */
async function validateOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.operation.validate("testVault", "testRG", {
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
  console.log(result);
}

/**
 * This sample demonstrates how to validate operation for specified backed up item. This is a synchronous operation.
 *
 * @summary validate operation for specified backed up item. This is a synchronous operation.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ValidateOperation_RestoreDisk_IdentityBasedRestoreDetails.json
 */
async function validateOperationWithIdentityBasedRestoreDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.operation.validate("testVault", "testRG", {
    id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testVault/providers/Microsoft.RecoveryServices/vaults/testVault/backupFabrics/Azure/protectionContainers/IaasVMContainer;iaasvmcontainerv2;testRG;testvmName/protectedItems/VM;iaasvmcontainerv2;testRG;testvmName/recoveryPoints/348916168024334",
    properties: {
      objectType: "ValidateIaasVMRestoreOperationRequest",
      restoreRequest: {
        createNewCloudService: true,
        encryptionDetails: { encryptionEnabled: false },
        identityBasedRestoreDetails: {
          targetStorageAccountId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testingRg/providers/Microsoft.Storage/storageAccounts/testAccount",
        },
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
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await validateOperation();
  await validateOperationWithIdentityBasedRestoreDetails();
}

main().catch(console.error);
