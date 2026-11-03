// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Workspace.
 *
 * @summary update a Workspace.
 * x-ms-original-file: 2026-11-01/Workspaces_Update.json
 */
async function updateAWorkspaceInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.update("exampleRG", "exampleWorkspace", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/exampleResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleIdentity":
          {},
      },
    },
    tags: { environment: "production", department: "engineering", project: "chaos-testing" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a Workspace.
 *
 * @summary update a Workspace.
 * x-ms-original-file: 2026-11-01/Workspaces_Update_ChangeKeyVault.json
 */
async function updateAWorkspaceWithAValidatedKeyAndResourceIDInAnotherVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.update("exampleRG", "exampleWorkspace", {
    properties: {
      encryption: {
        customerManagedKeyEncryption: {
          keyEncryptionKeyUrl: "https://contoso-vault-b.vault.azure.net/keys/Workspace-Key-Next",
          keyVaultResourceId:
            "/subscriptions/22222222-2222-2222-2222-222222222222/resourceGroups/customer-keys/providers/Microsoft.KeyVault/vaults/contoso-vault-b",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a Workspace.
 *
 * @summary update a Workspace.
 * x-ms-original-file: 2026-11-01/Workspaces_Update_EmptyCustomerKeyPatch.json
 */
async function updateAWorkspaceWithAnEmptyCMKPatchAndRetainItsExistingKeyURL() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.update("exampleRG", "exampleWorkspace", {
    properties: { encryption: { customerManagedKeyEncryption: {} } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a Workspace.
 *
 * @summary update a Workspace.
 * x-ms-original-file: 2026-11-01/Workspaces_Update_OmitEncryption.json
 */
async function updateWorkspaceTagsWithoutChangingCustomerManagedEncryption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.update("exampleRG", "exampleWorkspace", {
    tags: { environment: "production" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a Workspace.
 *
 * @summary update a Workspace.
 * x-ms-original-file: 2026-11-01/Workspaces_Update_ReplaceCustomerKey.json
 */
async function updateOnlyTheCustomerKeyURIOfAnEncryptedWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.update("exampleRG", "exampleWorkspace", {
    properties: {
      encryption: {
        customerManagedKeyEncryption: {
          keyEncryptionKeyUrl: "https://contoso-vault.vault.azure.net/keys/replacement-key",
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await updateAWorkspaceInAResourceGroup();
  await updateAWorkspaceWithAValidatedKeyAndResourceIDInAnotherVault();
  await updateAWorkspaceWithAnEmptyCMKPatchAndRetainItsExistingKeyURL();
  await updateWorkspaceTagsWithoutChangingCustomerManagedEncryption();
  await updateOnlyTheCustomerKeyURIOfAnEncryptedWorkspace();
}

main().catch(console.error);
