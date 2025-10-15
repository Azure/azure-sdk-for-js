// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates (patches) a disk encryption set.
 *
 * @summary updates (patches) a disk encryption set.
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Update.json
 */
async function updateADiskEncryptionSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.diskEncryptionSets.update("myResourceGroup", "myDiskEncryptionSet", {
    properties: {
      activeKey: {
        sourceVault: {
          id: "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/myVMVault",
        },
        keyUrl: "https://myvmvault.vault-int.azure-int.net/keys/keyName/keyVersion",
      },
      encryptionType: "EncryptionAtRestWithCustomerKey",
    },
    tags: { department: "Development", project: "Encryption" },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk encryption set.
 *
 * @summary updates (patches) a disk encryption set.
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Update_WithRotationToLatestKeyVersionEnabled.json
 */
async function updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueSucceeded(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.diskEncryptionSets.update("myResourceGroup", "myDiskEncryptionSet", {
    identity: { type: "SystemAssigned" },
    properties: {
      activeKey: {
        keyUrl: "https://myvaultdifferentsub.vault-int.azure-int.net/keys/keyName/keyVersion1",
      },
      encryptionType: "EncryptionAtRestWithCustomerKey",
      rotationToLatestKeyVersionEnabled: true,
    },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk encryption set.
 *
 * @summary updates (patches) a disk encryption set.
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Update_WithRotationToLatestKeyVersionEnabledInProgress.json
 */
async function updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueUpdating(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.diskEncryptionSets.update("myResourceGroup", "myDiskEncryptionSet", {
    identity: { type: "SystemAssigned" },
    properties: {
      activeKey: {
        keyUrl: "https://myvaultdifferentsub.vault-int.azure-int.net/keys/keyName/keyVersion1",
      },
      encryptionType: "EncryptionAtRestWithCustomerKey",
      rotationToLatestKeyVersionEnabled: true,
    },
  });
}

async function main(): Promise<void> {
  await updateADiskEncryptionSet();
  await updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueSucceeded();
  await updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueUpdating();
}

main().catch(console.error);
