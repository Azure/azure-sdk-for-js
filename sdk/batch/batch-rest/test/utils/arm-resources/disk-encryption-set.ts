// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import { getLocation, getResourceGroupName, getSubscriptionId } from "./env-const.js";
import { ComputeManagementClient } from "@azure/arm-compute";
import type { DiskEncryptionSet } from "@azure/arm-compute";

/**
 * Creates a Disk Encryption Set (DES) wired to a customer-managed key in a Key Vault.
 * Intended for BYOS Batch account scenarios where pools need encryption with a CMK.
 *
 * @param diskEncryptionSetName - Name of the Disk Encryption Set resource to create.
 * @param keyVaultResourceId - The full ARM resource ID of the Key Vault containing the key.
 * @param keyVaultKeyUrl - The full key identifier URL (including version) of the Key Vault key. Example:
 *   https://<kv-name>.vault.azure.net/keys/<key-name>/<key-version>
 * @returns The created DiskEncryptionSet.
 */
export async function createDiskEncryptionSet(
  diskEncryptionSetName: string,
  keyVaultResourceId: string,
  keyVaultKeyUrl: string,
): Promise<DiskEncryptionSet> {
  const computeClient = new ComputeManagementClient(createTestCredential(), getSubscriptionId());

  const desParams: DiskEncryptionSet = {
    location: getLocation(),
    identity: { type: "SystemAssigned" },
    activeKey: {
      sourceVault: { id: keyVaultResourceId },
      keyUrl: keyVaultKeyUrl,
    },
    encryptionType: "EncryptionAtRestWithCustomerKey",
  };

  try {
    const des = await computeClient.diskEncryptionSets.beginCreateOrUpdateAndWait(
      getResourceGroupName(),
      diskEncryptionSetName,
      desParams,
    );
    return des;
  } catch (err) {
    console.error("Error creating Disk Encryption Set:", err);
    throw err;
  }
}

/**
 * Deletes a Disk Encryption Set by name.
 * @param diskEncryptionSetName - Name of the Disk Encryption Set to delete.
 */
export async function deleteDiskEncryptionSet(diskEncryptionSetName: string): Promise<void> {
  const computeClient = new ComputeManagementClient(createTestCredential(), getSubscriptionId());
  try {
    await computeClient.diskEncryptionSets.beginDeleteAndWait(
      getResourceGroupName(),
      diskEncryptionSetName,
    );
  } catch (err) {
    console.error("Error deleting Disk Encryption Set:", err);
    throw err;
  }
}
