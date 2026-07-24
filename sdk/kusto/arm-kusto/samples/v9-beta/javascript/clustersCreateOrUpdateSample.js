// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Kusto cluster.
 *
 * @summary create or update a Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoClusterCreateWithCMKFederatedIdentity.json
 */
async function kustoClusterCreateWithCMKFederatedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate("kustoRgTest", "kustoClusterCMK", {
    location: "westus",
    sku: { name: "Standard_L16as_v3", capacity: 2, tier: "Standard" },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustoRgTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kustoClusterIdentity":
          {},
      },
    },
    enableStreamingIngest: true,
    enablePurge: true,
    enableDoubleEncryption: false,
    enableAutoStop: true,
    publicIPType: "IPv4",
    publicNetworkAccess: "Enabled",
    restrictOutboundNetworkAccess: "Disabled",
    keyVaultProperties: {
      keyVaultUri: "https://myvault.vault.azure.net",
      keyName: "myClusterCMKKey",
      keyVersion: "12345678-1234-1234-1234-123456789098",
      userIdentity:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustoRgTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kustoClusterIdentity",
      federatedIdentityClientId: "11111111-2222-3333-4444-555555555555",
    },
    engineType: "V3",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Kusto cluster.
 *
 * @summary create or update a Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoClusterCreateWithCMKUserAssignedIdentity.json
 */
async function kustoClusterCreateWithCMKUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate("kustoRgTest", "kustoClusterCMK", {
    location: "westus",
    sku: { name: "Standard_L16as_v3", capacity: 2, tier: "Standard" },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustoRgTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kustoClusterIdentity":
          {},
      },
    },
    enableStreamingIngest: true,
    enablePurge: true,
    enableDoubleEncryption: false,
    enableAutoStop: true,
    publicIPType: "IPv4",
    publicNetworkAccess: "Enabled",
    restrictOutboundNetworkAccess: "Disabled",
    keyVaultProperties: {
      keyVaultUri: "https://myvault.vault.azure.net",
      keyName: "myClusterCMKKey",
      keyVersion: "12345678-1234-1234-1234-123456789098",
      userIdentity:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustoRgTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/kustoClusterIdentity",
    },
    engineType: "V3",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Kusto cluster.
 *
 * @summary create or update a Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoClustersCreateOrUpdate.json
 */
async function kustoClustersCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate("kustorptest", "kustoCluster", {
    identity: { type: "SystemAssigned" },
    location: "westus",
    allowedIpRangeList: ["0.0.0.0/0"],
    enableAutoStop: true,
    enableDoubleEncryption: false,
    enablePurge: true,
    enableStreamingIngest: true,
    languageExtensions: {
      value: [
        { languageExtensionImageName: "Python3_10_8", languageExtensionName: "PYTHON" },
        { languageExtensionImageName: "R", languageExtensionName: "R" },
      ],
    },
    publicIPType: "DualStack",
    publicNetworkAccess: "Enabled",
    sku: { name: "Standard_L16as_v3", capacity: 2, tier: "Standard" },
  });
  console.log(result);
}

async function main() {
  await kustoClusterCreateWithCMKFederatedIdentity();
  await kustoClusterCreateWithCMKUserAssignedIdentity();
  await kustoClustersCreateOrUpdate();
}

main().catch(console.error);
