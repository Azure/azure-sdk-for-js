// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationClient } from "@azure/arm-onlineexperimentation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create an experiment workspace, or update an existing workspace
 *
 * @summary create an experiment workspace, or update an existing workspace
 * x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_CreateOrUpdate.json
 */
async function createOrUpdateAnOnlineExperimentWorkspaceWithFreeSku(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.onlineExperimentWorkspaces.createOrUpdate(
    "res9871",
    "expworkspace7",
    {
      location: "eastus2",
      tags: { newKey: "newVal" },
      properties: {
        logAnalyticsWorkspaceResourceId:
          "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/res9871/providers/Microsoft.OperationalInsights/workspaces/log9871",
        logsExporterStorageAccountResourceId:
          "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/res9871/providers/Microsoft.Storage/storageAccounts/sto9871",
        appConfigurationResourceId:
          "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/res9871/providers/Microsoft.AppConfiguration/configurationStores/appconfig9871",
      },
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
            {},
          "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id2":
            {},
        },
      },
      sku: { name: "F0" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create an experiment workspace, or update an existing workspace
 *
 * @summary create an experiment workspace, or update an existing workspace
 * x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_CreateOrUpdateWithEncryption.json
 */
async function createOrUpdateAnOnlineExperimentWorkspaceWithFreeSkuAndCustomerManagedKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.onlineExperimentWorkspaces.createOrUpdate(
    "res9871",
    "expworkspace7",
    {
      location: "eastus2",
      tags: { newKey: "newVal" },
      properties: {
        logAnalyticsWorkspaceResourceId:
          "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/res9871/providers/Microsoft.OperationalInsights/workspaces/log9871",
        logsExporterStorageAccountResourceId:
          "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/res9871/providers/Microsoft.Storage/storageAccounts/sto9871",
        appConfigurationResourceId:
          "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/res9871/providers/Microsoft.AppConfiguration/configurationStores/appconfig9871",
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
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
            {},
          "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id2":
            {},
        },
      },
      sku: { name: "F0" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnOnlineExperimentWorkspaceWithFreeSku();
  await createOrUpdateAnOnlineExperimentWorkspaceWithFreeSkuAndCustomerManagedKey();
}

main().catch(console.error);
