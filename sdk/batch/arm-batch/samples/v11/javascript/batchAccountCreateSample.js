// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new Batch account with the specified parameters. Existing accounts cannot be updated with this API and should instead be updated with the Update Batch Account API.
 *
 * @summary creates a new Batch account with the specified parameters. Existing accounts cannot be updated with this API and should instead be updated with the Update Batch Account API.
 * x-ms-original-file: 2025-06-01/BatchAccountCreate_BYOS.json
 */
async function batchAccountCreateByos() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.create("default-azurebatch-japaneast", "sampleacct", {
    location: "japaneast",
    autoStorage: {
      storageAccountId:
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Storage/storageAccounts/samplestorage",
    },
    keyVaultReference: {
      id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.KeyVault/vaults/sample",
      url: "http://sample.vault.azure.net/",
    },
    poolAllocationMode: "UserSubscription",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new Batch account with the specified parameters. Existing accounts cannot be updated with this API and should instead be updated with the Update Batch Account API.
 *
 * @summary creates a new Batch account with the specified parameters. Existing accounts cannot be updated with this API and should instead be updated with the Update Batch Account API.
 * x-ms-original-file: 2025-06-01/BatchAccountCreate_Default.json
 */
async function batchAccountCreateDefault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.create("default-azurebatch-japaneast", "sampleacct", {
    location: "japaneast",
    autoStorage: {
      storageAccountId:
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Storage/storageAccounts/samplestorage",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new Batch account with the specified parameters. Existing accounts cannot be updated with this API and should instead be updated with the Update Batch Account API.
 *
 * @summary creates a new Batch account with the specified parameters. Existing accounts cannot be updated with this API and should instead be updated with the Update Batch Account API.
 * x-ms-original-file: 2025-06-01/BatchAccountCreate_SystemAssignedIdentity.json
 */
async function batchAccountCreateSystemAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.create("default-azurebatch-japaneast", "sampleacct", {
    identity: { type: "SystemAssigned" },
    location: "japaneast",
    autoStorage: {
      storageAccountId:
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Storage/storageAccounts/samplestorage",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new Batch account with the specified parameters. Existing accounts cannot be updated with this API and should instead be updated with the Update Batch Account API.
 *
 * @summary creates a new Batch account with the specified parameters. Existing accounts cannot be updated with this API and should instead be updated with the Update Batch Account API.
 * x-ms-original-file: 2025-06-01/BatchAccountCreate_UserAssignedIdentity.json
 */
async function batchAccountCreateUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.create("default-azurebatch-japaneast", "sampleacct", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    location: "japaneast",
    autoStorage: {
      storageAccountId:
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Storage/storageAccounts/samplestorage",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new Batch account with the specified parameters. Existing accounts cannot be updated with this API and should instead be updated with the Update Batch Account API.
 *
 * @summary creates a new Batch account with the specified parameters. Existing accounts cannot be updated with this API and should instead be updated with the Update Batch Account API.
 * x-ms-original-file: 2025-06-01/PrivateBatchAccountCreate.json
 */
async function privateBatchAccountCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.create("default-azurebatch-japaneast", "sampleacct", {
    location: "japaneast",
    autoStorage: {
      storageAccountId:
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Storage/storageAccounts/samplestorage",
    },
    keyVaultReference: {
      id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.KeyVault/vaults/sample",
      url: "http://sample.vault.azure.net/",
    },
    publicNetworkAccess: "Disabled",
  });
  console.log(result);
}

async function main() {
  await batchAccountCreateByos();
  await batchAccountCreateDefault();
  await batchAccountCreateSystemAssignedIdentity();
  await batchAccountCreateUserAssignedIdentity();
  await privateBatchAccountCreate();
}

main().catch(console.error);
