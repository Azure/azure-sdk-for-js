// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMapsManagementClient } from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a Maps Account. Only a subset of the parameters may be updated after creation, such as Sku, Tags, Properties.
 *
 * @summary updates a Maps Account. Only a subset of the parameters may be updated after creation, such as Sku, Tags, Properties.
 * x-ms-original-file: 2025-10-01-preview/UpdateAccount.json
 */
async function updateAccountTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.accounts.update("myResourceGroup", "myMapsAccount", {
    tags: { specialTag: "true" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a Maps Account. Only a subset of the parameters may be updated after creation, such as Sku, Tags, Properties.
 *
 * @summary updates a Maps Account. Only a subset of the parameters may be updated after creation, such as Sku, Tags, Properties.
 * x-ms-original-file: 2025-10-01-preview/UpdateAccountEncryption.json
 */
async function updateAccountEncryption(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.accounts.update("myResourceGroup", "myMapsAccount", {
    identity: {
      type: "SystemAssigned",
      userAssignedIdentities: {
        "/subscriptions/21a9967a-e8a9-4656-a70b-96ff1c4d05a0/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identityName":
          null,
      },
    },
    encryption: {
      customerManagedKeyEncryption: {
        keyEncryptionKeyIdentity: { identityType: "systemAssignedIdentity" },
        keyEncryptionKeyUrl: "https://contosovault.vault.azure.net/keys/contosokek",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a Maps Account. Only a subset of the parameters may be updated after creation, such as Sku, Tags, Properties.
 *
 * @summary updates a Maps Account. Only a subset of the parameters may be updated after creation, such as Sku, Tags, Properties.
 * x-ms-original-file: 2025-10-01-preview/UpdateAccountGen2.json
 */
async function updateToGen2Account(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.accounts.update("myResourceGroup", "myMapsAccount", {
    kind: "Gen2",
    sku: { name: "G2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a Maps Account. Only a subset of the parameters may be updated after creation, such as Sku, Tags, Properties.
 *
 * @summary updates a Maps Account. Only a subset of the parameters may be updated after creation, such as Sku, Tags, Properties.
 * x-ms-original-file: 2025-10-01-preview/UpdateAccountManagedIdentity.json
 */
async function updateAccountManagedIdentities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.accounts.update("myResourceGroup", "myMapsAccount", {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/21a9967a-e8a9-4656-a70b-96ff1c4d05a0/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identityName":
          {},
      },
    },
    kind: "Gen2",
    linkedResources: [
      {
        id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/accounts/{storageName}",
        uniqueName: "myBatchStorageAccount",
      },
    ],
    sku: { name: "G2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAccountTags();
  await updateAccountEncryption();
  await updateToGen2Account();
  await updateAccountManagedIdentities();
}

main().catch(console.error);
