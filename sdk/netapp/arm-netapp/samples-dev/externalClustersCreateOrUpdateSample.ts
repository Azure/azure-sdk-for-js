// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the specified External Cluster
 *
 * @summary create or update the specified External Cluster
 * x-ms-original-file: 2026-08-15-preview/ExternalClusters_CreateOrUpdate.json
 */
async function externalClustersCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.externalClusters.createOrUpdate(
    "contosoNetAppRg",
    "contoso-external-cluster",
    {
      location: "eastus",
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contosoNetAppRg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/contosoIdentity1":
            {},
        },
      },
      properties: {
        interclusterLifsIpAddresses: ["10.0.1.100", "10.0.1.101"],
        clusterPeerPassphraseKeyVault: {
          keyVaultUri: "https://contoso-vault.vault.azure.net/",
          secretName: "cluster-passphrase",
          userAssignedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contosoNetAppRg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/contosoIdentity1",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await externalClustersCreateOrUpdate();
}

main().catch(console.error);
