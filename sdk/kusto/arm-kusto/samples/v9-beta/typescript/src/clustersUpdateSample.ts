// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Kusto cluster.
 *
 * @summary update a Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoClusterUpdateCMKKeyRotation.json
 */
async function kustoClusterUpdateCMKKeyRotation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.update(
    "kustoRgTest",
    "kustoClusterCMK",
    {
      location: "westus",
      keyVaultProperties: {
        keyVaultUri: "https://myvault.vault.azure.net",
        keyName: "myClusterCMKKey",
        keyVersion: "87654321-4321-4321-4321-210987654321",
        userIdentity:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustoRgTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kustoClusterIdentity",
      },
    },
    { ifMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a Kusto cluster.
 *
 * @summary update a Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoClusterUpdateDisableCMK.json
 */
async function kustoClusterUpdateDisableCMK(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.update(
    "kustoRgTest",
    "kustoClusterCMK",
    { location: "westus", keyVaultProperties: {} },
    { ifMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a Kusto cluster.
 *
 * @summary update a Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoClusterUpdateEnableCMK.json
 */
async function kustoClusterUpdateEnableCMK(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.update(
    "kustoRgTest",
    "kustoCluster",
    {
      location: "westus",
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustoRgTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kustoClusterIdentity":
            {},
        },
      },
      keyVaultProperties: {
        keyVaultUri: "https://myvault.vault.azure.net",
        keyName: "myClusterCMKKey",
        keyVersion: "12345678-1234-1234-1234-123456789098",
        userIdentity:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustoRgTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kustoClusterIdentity",
      },
    },
    { ifMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a Kusto cluster.
 *
 * @summary update a Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoClusterUpdateWithCMKFederatedIdentity.json
 */
async function kustoClusterUpdateWithCMKFederatedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.update(
    "kustoRgTest",
    "kustoCluster2",
    {
      location: "westus",
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustoRgTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kustoClusterIdentity":
            {},
        },
      },
      enableStreamingIngest: true,
      enablePurge: true,
      enableAutoStop: true,
      publicIPType: "IPv4",
      keyVaultProperties: {
        keyVaultUri: "https://myvault.vault.azure.net",
        keyName: "myClusterCMKKey",
        keyVersion: "12345678-1234-1234-1234-123456789098",
        userIdentity:
          "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustoRgTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kustoClusterIdentity",
        federatedIdentityClientId: "11111111-2222-3333-4444-555555555555",
      },
      engineType: "V3",
      restrictOutboundNetworkAccess: "Disabled",
    },
    { ifMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a Kusto cluster.
 *
 * @summary update a Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoClustersUpdate.json
 */
async function kustoClustersUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.update("kustorptest", "kustoCluster2", {}, { ifMatch: "*" });
  console.log(result);
}

async function main(): Promise<void> {
  await kustoClusterUpdateCMKKeyRotation();
  await kustoClusterUpdateDisableCMK();
  await kustoClusterUpdateEnableCMK();
  await kustoClusterUpdateWithCMKFederatedIdentity();
  await kustoClustersUpdate();
}

main().catch(console.error);
