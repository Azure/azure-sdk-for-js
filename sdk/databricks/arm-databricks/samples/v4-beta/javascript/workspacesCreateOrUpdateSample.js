// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new workspace.
 *
 * @summary creates a new workspace.
 * x-ms-original-file: 2026-01-01/DisableEncryption.json
 */
async function revertCustomerManagedKeyCMKEncryptionToMicrosoftManagedKeysEncryptionOnAWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("rg", "myWorkspace", {
    location: "westus",
    computeMode: "Hybrid",
    managedResourceGroupId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/myManagedRG",
    parameters: { encryption: { value: { keySource: "Default" } } },
    sku: { name: "premium" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new workspace.
 *
 * @summary creates a new workspace.
 * x-ms-original-file: 2026-01-01/EnableEncryption.json
 */
async function enableCustomerManagedKeyCMKEncryptionOnAWorkspaceWhichIsPreparedForEncryption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("rg", "myWorkspace", {
    location: "westus",
    computeMode: "Hybrid",
    managedResourceGroupId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/myManagedRG",
    parameters: {
      encryption: {
        value: {
          keyName: "myKeyName",
          keySource: "Microsoft.Keyvault",
          keyVaultUri: "https://myKeyVault.vault.azure.net/",
          keyVersion: "00000000000000000000000000000000",
        },
      },
      prepareEncryption: { value: true },
    },
    sku: { name: "premium" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new workspace.
 *
 * @summary creates a new workspace.
 * x-ms-original-file: 2026-01-01/PrepareEncryption.json
 */
async function createAWorkspaceWhichIsReadyForCustomerManagedKeyCMKEncryption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("rg", "myWorkspace", {
    location: "westus",
    computeMode: "Hybrid",
    managedResourceGroupId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/myManagedRG",
    parameters: { prepareEncryption: { value: true } },
    sku: { name: "premium" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new workspace.
 *
 * @summary creates a new workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceCreate.json
 */
async function createOrUpdateWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("rg", "myWorkspace", {
    location: "westus",
    accessConnector: {
      id: "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/adbrg/providers/Microsoft.Databricks/accessConnectors/myAccessConnector",
      identityType: "SystemAssigned",
    },
    computeMode: "Hybrid",
    defaultCatalog: { initialName: "", initialType: "UnityCatalog" },
    defaultStorageFirewall: "Enabled",
    managedResourceGroupId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/myManagedRG",
    sku: { name: "premium" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new workspace.
 *
 * @summary creates a new workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceCreateServerless.json
 */
async function createOrUpdateServerlessWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("rg", "myWorkspace", {
    location: "westus",
    computeMode: "Serverless",
    sku: { name: "premium" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new workspace.
 *
 * @summary creates a new workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceCreateWithParameters.json
 */
async function createOrUpdateWorkspaceWithCustomParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("rg", "myWorkspace", {
    location: "westus",
    accessConnector: {
      id: "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/adbrg/providers/Microsoft.Databricks/accessConnectors/myAccessConnector",
      identityType: "UserAssigned",
      userAssignedIdentityId:
        "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity",
    },
    computeMode: "Hybrid",
    defaultCatalog: { initialName: "", initialType: "HiveMetastore" },
    defaultStorageFirewall: "Enabled",
    managedResourceGroupId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/myManagedRG",
    parameters: {
      customPrivateSubnetName: { value: "myPrivateSubnet" },
      customPublicSubnetName: { value: "myPublicSubnet" },
      customVirtualNetworkId: {
        value:
          "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/myNetwork",
      },
    },
    sku: { name: "premium" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new workspace.
 *
 * @summary creates a new workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceEnhancedSecurityComplianceCreateOrUpdate.json
 */
async function createOrUpdateAWorkspaceWithEnhancedSecurityComplianceAddOn() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("rg", "myWorkspace", {
    location: "eastus2",
    computeMode: "Hybrid",
    enhancedSecurityCompliance: {
      automaticClusterUpdate: { value: "Enabled" },
      complianceSecurityProfile: { complianceStandards: ["PCI_DSS", "HIPAA"], value: "Enabled" },
      enhancedSecurityMonitoring: { value: "Enabled" },
    },
    managedResourceGroupId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/myManagedRG",
    sku: { name: "premium" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new workspace.
 *
 * @summary creates a new workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceManagedDiskEncryptionCreate.json
 */
async function createAWorkspaceWithCustomerManagedKeyCMKEncryptionForManagedDisks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("rg", "myWorkspace", {
    location: "westus",
    computeMode: "Hybrid",
    encryption: {
      entities: {
        managedDisk: {
          keySource: "Microsoft.Keyvault",
          keyVaultProperties: {
            keyName: "test-cmk-key",
            keyVaultUri: "https://test-vault-name.vault.azure.net/",
            keyVersion: "00000000000000000000000000000000",
          },
          rotationToLatestKeyVersionEnabled: true,
        },
      },
    },
    managedResourceGroupId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/myManagedRG",
    sku: { name: "premium" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new workspace.
 *
 * @summary creates a new workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceManagedDiskEncryptionUpdate.json
 */
async function updateAWorkspaceWithCustomerManagedKeyCMKEncryptionForManagedDisks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("rg", "myWorkspace", {
    location: "westus",
    computeMode: "Hybrid",
    encryption: {
      entities: {
        managedDisk: {
          keySource: "Microsoft.Keyvault",
          keyVaultProperties: {
            keyName: "test-cmk-key",
            keyVaultUri: "https://test-vault-name.vault.azure.net/",
            keyVersion: "00000000000000000000000000000000",
          },
          rotationToLatestKeyVersionEnabled: true,
        },
      },
    },
    managedResourceGroupId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/myManagedRG",
    sku: { name: "premium" },
    tags: { mytag1: "myvalue1" },
  });
  console.log(result);
}

async function main() {
  await revertCustomerManagedKeyCMKEncryptionToMicrosoftManagedKeysEncryptionOnAWorkspace();
  await enableCustomerManagedKeyCMKEncryptionOnAWorkspaceWhichIsPreparedForEncryption();
  await createAWorkspaceWhichIsReadyForCustomerManagedKeyCMKEncryption();
  await createOrUpdateWorkspace();
  await createOrUpdateServerlessWorkspace();
  await createOrUpdateWorkspaceWithCustomParameters();
  await createOrUpdateAWorkspaceWithEnhancedSecurityComplianceAddOn();
  await createAWorkspaceWithCustomerManagedKeyCMKEncryptionForManagedDisks();
  await updateAWorkspaceWithCustomerManagedKeyCMKEncryptionForManagedDisks();
}

main().catch(console.error);
