// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeDiskClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a disk encryption set
 *
 * @summary creates or updates a disk encryption set
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Create.json
 */
async function createADiskEncryptionSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.diskEncryptionSets.createOrUpdate(
    "myResourceGroup",
    "myDiskEncryptionSet",
    {
      location: "West US",
      identity: { type: "SystemAssigned" },
      activeKey: {
        sourceVault: {
          id: "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/myVMVault",
        },
        keyUrl: "https://myvmvault.vault-int.azure-int.net/keys/{key}",
      },
      encryptionType: "EncryptionAtRestWithCustomerKey",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk encryption set
 *
 * @summary creates or updates a disk encryption set
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Create_WithKeyVaultFromADifferentSubscription.json
 */
async function createADiskEncryptionSetWithKeyVaultFromADifferentSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.diskEncryptionSets.createOrUpdate(
    "myResourceGroup",
    "myDiskEncryptionSet",
    {
      location: "West US",
      identity: { type: "SystemAssigned" },
      activeKey: { keyUrl: "https://myvaultdifferentsub.vault-int.azure-int.net/keys/{key}" },
      encryptionType: "EncryptionAtRestWithCustomerKey",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk encryption set
 *
 * @summary creates or updates a disk encryption set
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Create_WithKeyVaultFromADifferentTenant.json
 */
async function createADiskEncryptionSetWithKeyVaultFromADifferentTenant(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.diskEncryptionSets.createOrUpdate(
    "myResourceGroup",
    "myDiskEncryptionSet",
    {
      location: "West US",
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}":
            {},
        },
      },
      activeKey: { keyUrl: "https://myvaultdifferenttenant.vault-int.azure-int.net/keys/{key}" },
      encryptionType: "EncryptionAtRestWithCustomerKey",
      federatedClientId: "00000000-0000-0000-0000-000000000000",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createADiskEncryptionSet();
  await createADiskEncryptionSetWithKeyVaultFromADifferentSubscription();
  await createADiskEncryptionSetWithKeyVaultFromADifferentTenant();
}

main().catch(console.error);
