// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationClient } from "@azure/arm-onlineexperimentation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch an experiment workspace
 *
 * @summary patch an experiment workspace
 * x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_Update.json
 */
async function updateAnOnlineExperimentWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.onlineExperimentWorkspaces.update("res9871", "expworkspace3", {
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
 * This sample demonstrates how to patch an experiment workspace
 *
 * @summary patch an experiment workspace
 * x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_UpdateWithEncryption.json
 */
async function updateAnOnlineExperimentWorkspaceWithCustomerManagedEncryptionKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.onlineExperimentWorkspaces.update("res9871", "expworkspace3", {
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

async function main(): Promise<void> {
  await updateAnOnlineExperimentWorkspace();
  await updateAnOnlineExperimentWorkspaceWithCustomerManagedEncryptionKey();
}

main().catch(console.error);
