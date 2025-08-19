// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Workspace } from "@azure/arm-databricks";
import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new workspace.
 *
 * @summary Creates a new workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/PrepareEncryption.json
 */
async function createAWorkspaceWhichIsReadyForCustomerManagedKeyCmkEncryption(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const parameters: Workspace = {
    location: "westus",
    managedResourceGroupId: "/subscriptions/subid/resourceGroups/myManagedRG",
    parameters: { prepareEncryption: { value: true } },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new workspace.
 *
 * @summary Creates a new workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceManagedDiskEncryptionCreate.json
 */
async function createAWorkspaceWithCustomerManagedKeyCmkEncryptionForManagedDisks(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const parameters: Workspace = {
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
    location: "westus",
    managedResourceGroupId: "/subscriptions/subid/resourceGroups/myManagedRG",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new workspace.
 *
 * @summary Creates a new workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceCreate.json
 */
async function createOrUpdateWorkspace(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const parameters: Workspace = {
    location: "westus",
    managedResourceGroupId: "/subscriptions/subid/resourceGroups/myManagedRG",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new workspace.
 *
 * @summary Creates a new workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceCreateWithParameters.json
 */
async function createOrUpdateWorkspaceWithCustomParameters(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const parameters: Workspace = {
    location: "westus",
    managedResourceGroupId: "/subscriptions/subid/resourceGroups/myManagedRG",
    parameters: {
      customPrivateSubnetName: { value: "myPrivateSubnet" },
      customPublicSubnetName: { value: "myPublicSubnet" },
      customVirtualNetworkId: {
        value:
          "/subscriptions/subid/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/myNetwork",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new workspace.
 *
 * @summary Creates a new workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/EnableEncryption.json
 */
async function enableCustomerManagedKeyCmkEncryptionOnAWorkspaceWhichIsPreparedForEncryption(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const parameters: Workspace = {
    location: "westus",
    managedResourceGroupId: "/subscriptions/subid/resourceGroups/myManagedRG",
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
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new workspace.
 *
 * @summary Creates a new workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/DisableEncryption.json
 */
async function revertCustomerManagedKeyCmkEncryptionToMicrosoftManagedKeysEncryptionOnAWorkspace(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const parameters: Workspace = {
    location: "westus",
    managedResourceGroupId: "/subscriptions/subid/resourceGroups/myManagedRG",
    parameters: { encryption: { value: { keySource: "Default" } } },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new workspace.
 *
 * @summary Creates a new workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceManagedDiskEncryptionUpdate.json
 */
async function updateAWorkspaceWithCustomerManagedKeyCmkEncryptionForManagedDisks(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const parameters: Workspace = {
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
    location: "westus",
    managedResourceGroupId: "/subscriptions/subid/resourceGroups/myManagedRG",
    tags: { mytag1: "myvalue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAWorkspaceWhichIsReadyForCustomerManagedKeyCmkEncryption();
  await createAWorkspaceWithCustomerManagedKeyCmkEncryptionForManagedDisks();
  await createOrUpdateWorkspace();
  await createOrUpdateWorkspaceWithCustomParameters();
  await enableCustomerManagedKeyCmkEncryptionOnAWorkspaceWhichIsPreparedForEncryption();
  await revertCustomerManagedKeyCmkEncryptionToMicrosoftManagedKeysEncryptionOnAWorkspace();
  await updateAWorkspaceWithCustomerManagedKeyCmkEncryptionForManagedDisks();
}

main().catch(console.error);
