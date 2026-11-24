// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Workspace resource.
 *
 * @summary create or update a Workspace resource.
 * x-ms-original-file: 2026-11-01/Workspaces_CreateOrUpdate.json
 */
async function createOrUpdateAWorkspaceInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("exampleRG", "exampleWorkspace", {
    properties: {
      scopes: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/exampleResourceGroup",
      ],
    },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/exampleResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleIdentity":
          {},
      },
    },
    location: "westus2",
    tags: { environment: "production", department: "engineering", project: "chaos-testing" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Workspace resource.
 *
 * @summary create or update a Workspace resource.
 * x-ms-original-file: 2026-11-01/Workspaces_CreateOrUpdate_CreateOnly.json
 */
async function createAWorkspaceOnlyWhenAbsentOrReturn412WhenItAlreadyExists(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate(
    "exampleRG",
    "exampleWorkspace",
    {
      location: "westus2",
      properties: {
        scopes: ["/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG"],
      },
    },
    { ifNoneMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Workspace resource.
 *
 * @summary create or update a Workspace resource.
 * x-ms-original-file: 2026-11-01/Workspaces_CreateOrUpdate_EmptyEncryption.json
 */
async function createOrUpdateAMicrosoftManagedWorkspaceWithEmptyEncryptionSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("exampleRG", "exampleWorkspace", {
    location: "westus2",
    properties: {
      scopes: ["/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG"],
      encryption: {},
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Workspace resource.
 *
 * @summary create or update a Workspace resource.
 * x-ms-original-file: 2026-11-01/Workspaces_CreateOrUpdate_OmitEncryption.json
 */
async function createOrUpdateAMicrosoftManagedWorkspaceWithoutEncryptionSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("exampleRG", "exampleWorkspace", {
    location: "westus2",
    properties: {
      scopes: ["/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG"],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Workspace resource.
 *
 * @summary create or update a Workspace resource.
 * x-ms-original-file: 2026-11-01/Workspaces_CreateOrUpdate_UpdateOnly.json
 */
async function updateAWorkspaceOnlyWhenPresentOrReturn412WhenItDoesNotExist(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate(
    "exampleRG",
    "exampleWorkspace",
    {
      location: "westus2",
      properties: {
        scopes: ["/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG"],
      },
    },
    { ifMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Workspace resource.
 *
 * @summary create or update a Workspace resource.
 * x-ms-original-file: 2026-11-01/Workspaces_CreateOrUpdate_WithCustomerKey.json
 */
async function createOrUpdateAWorkspaceWithACustomerManagedKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("exampleRG", "exampleWorkspace", {
    location: "westus2",
    properties: {
      scopes: ["/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG"],
      encryption: {
        customerManagedKeyEncryption: {
          keyEncryptionKeyUrl: "https://contoso-vault.vault.azure.net/keys/workspace-key",
          keyVaultResourceId:
            "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/customer-keys/providers/Microsoft.KeyVault/vaults/contoso-vault",
        },
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAWorkspaceInAResourceGroup();
  await createAWorkspaceOnlyWhenAbsentOrReturn412WhenItAlreadyExists();
  await createOrUpdateAMicrosoftManagedWorkspaceWithEmptyEncryptionSettings();
  await createOrUpdateAMicrosoftManagedWorkspaceWithoutEncryptionSettings();
  await updateAWorkspaceOnlyWhenPresentOrReturn412WhenItDoesNotExist();
  await createOrUpdateAWorkspaceWithACustomerManagedKey();
}

main().catch(console.error);
