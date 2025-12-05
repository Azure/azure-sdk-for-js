// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-computedisk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates (patches) a disk encryption set.
 *
 * @summary updates (patches) a disk encryption set.
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Update.json
 */
async function updateADiskEncryptionSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.diskEncryptionSets.update("myResourceGroup", "myDiskEncryptionSet", {
    activeKey: {
      sourceVault: {
        id: "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/myVMVault",
      },
      keyUrl: "https://myvmvault.vault-int.azure-int.net/keys/keyName/keyVersion",
    },
    encryptionType: "EncryptionAtRestWithCustomerKey",
    tags: { department: "Development", project: "Encryption" },
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk encryption set.
 *
 * @summary updates (patches) a disk encryption set.
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Update_WithRotationToLatestKeyVersionEnabled.json
 */
async function updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueSucceeded() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.diskEncryptionSets.update("myResourceGroup", "myDiskEncryptionSet", {
    identity: { type: "SystemAssigned" },
    activeKey: {
      keyUrl: "https://myvaultdifferentsub.vault-int.azure-int.net/keys/keyName/keyVersion1",
    },
    encryptionType: "EncryptionAtRestWithCustomerKey",
    rotationToLatestKeyVersionEnabled: true,
  });
}

/**
 * This sample demonstrates how to updates (patches) a disk encryption set.
 *
 * @summary updates (patches) a disk encryption set.
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Update_WithRotationToLatestKeyVersionEnabledInProgress.json
 */
async function updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueUpdating() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.diskEncryptionSets.update("myResourceGroup", "myDiskEncryptionSet", {
    identity: { type: "SystemAssigned" },
    activeKey: {
      keyUrl: "https://myvaultdifferentsub.vault-int.azure-int.net/keys/keyName/keyVersion1",
    },
    encryptionType: "EncryptionAtRestWithCustomerKey",
    rotationToLatestKeyVersionEnabled: true,
  });
}

async function main() {
  await updateADiskEncryptionSet();
  await updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueSucceeded();
  await updateADiskEncryptionSetWithRotationToLatestKeyVersionEnabledSetToTrueUpdating();
}

main().catch(console.error);
