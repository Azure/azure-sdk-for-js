// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OnlineExperimentationClient } = require("@azure/arm-onlineexperimentation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch an online experimentation workspace.
 *
 * @summary patch an online experimentation workspace.
 * x-ms-original-file: 2025-08-01-preview/OnlineExperimentationWorkspaces_Update.json
 */
async function updateAnOnlineExperimentWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.onlineExperimentationWorkspaces.update("res9871", "expworkspace3", {
    tags: { newKey: "newVal" },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {},
        "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id2":
          {},
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to patch an online experimentation workspace.
 *
 * @summary patch an online experimentation workspace.
 * x-ms-original-file: 2025-08-01-preview/OnlineExperimentationWorkspaces_UpdatePublicNetworkAccess.json
 */
async function updateAnOnlineExperimentationWorkspaceWithPublicNetworkAccess() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.onlineExperimentationWorkspaces.update("res9871", "expworkspace3", {
    properties: { publicNetworkAccess: "Enabled" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to patch an online experimentation workspace.
 *
 * @summary patch an online experimentation workspace.
 * x-ms-original-file: 2025-08-01-preview/OnlineExperimentationWorkspaces_UpdateWithEncryption.json
 */
async function updateAnOnlineExperimentationWorkspaceWithCustomerManagedEncryptionKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.onlineExperimentationWorkspaces.update("res9871", "expworkspace3", {
    tags: { newKey: "newVal" },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {},
        "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id2":
          {},
      },
    },
    properties: {
      logAnalyticsWorkspaceResourceId:
        "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/res9871/providers/Microsoft.OperationalInsights/workspaces/log9871",
      logsExporterStorageAccountResourceId:
        "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/res9871/providers/Microsoft.Storage/storageAccounts/sto9871",
      encryption: {
        customerManagedKeyEncryption: {
          keyEncryptionKeyIdentity: {
            identityType: "UserAssignedIdentity",
            userAssignedIdentityResourceId:
              "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1",
          },
          keyEncryptionKeyUrl: "https://contosovault.vault.azure.net/keys/contosokek",
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await updateAnOnlineExperimentWorkspace();
  await updateAnOnlineExperimentationWorkspaceWithPublicNetworkAccess();
  await updateAnOnlineExperimentationWorkspaceWithCustomerManagedEncryptionKey();
}

main().catch(console.error);
