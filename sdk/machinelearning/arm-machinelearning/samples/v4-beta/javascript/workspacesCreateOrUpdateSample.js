// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a workspace with the specified parameters.
 *
 * @summary creates or updates a workspace with the specified parameters.
 * x-ms-original-file: 2025-12-01/Workspace/create.json
 */
async function createWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("workspace-1234", "testworkspace", {
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/workspace-1234/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testuai":
          {},
      },
    },
    location: "eastus2euap",
    description: "test description",
    applicationInsights:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/workspace-1234/providers/microsoft.insights/components/testinsights",
    containerRegistry:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/workspace-1234/providers/Microsoft.ContainerRegistry/registries/testRegistry",
    encryption: {
      identity: {
        userAssignedIdentity:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/workspace-1234/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testuai",
      },
      keyVaultProperties: {
        identityClientId: "",
        keyIdentifier:
          "https://testkv.vault.azure.net/keys/testkey/aabbccddee112233445566778899aabb",
        keyVaultArmId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/workspace-1234/providers/Microsoft.KeyVault/vaults/testkv",
      },
      status: "Enabled",
    },
    friendlyName: "HelloName",
    hbiWorkspace: false,
    keyVault:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/workspace-1234/providers/Microsoft.KeyVault/vaults/testkv",
    sharedPrivateLinkResources: [
      {
        name: "testdbresource",
        groupId: "Sql",
        privateLinkResourceId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/workspace-1234/providers/Microsoft.DocumentDB/databaseAccounts/testdbresource/privateLinkResources/Sql",
        requestMessage: "Please approve",
        status: "Approved",
      },
    ],
    storageAccount:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/accountcrud-1234/providers/Microsoft.Storage/storageAccounts/testStorageAccount",
  });
  console.log(result);
}

async function main() {
  await createWorkspace();
}

main().catch(console.error);
