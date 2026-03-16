// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB database account. The "Update" method is preferred when performing updates on an account.
 *
 * @summary creates or updates an Azure Cosmos DB database account. The "Update" method is preferred when performing updates on an account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountCreateMax.json
 */
async function cosmosDBDatabaseAccountCreateMax(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.createOrUpdate("rg1", "ddb1", {
    location: "westus",
    tags: {},
    kind: "MongoDB",
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    databaseAccountOfferType: "Standard",
    ipRules: [{ ipAddressOrRange: "23.43.230.120" }, { ipAddressOrRange: "110.12.240.0/12" }],
    isVirtualNetworkFilterEnabled: true,
    virtualNetworkRules: [
      {
        id: "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        ignoreMissingVNetServiceEndpoint: false,
      },
    ],
    publicNetworkAccess: "Enabled",
    locations: [
      { failoverPriority: 0, locationName: "southcentralus", isZoneRedundant: false },
      { failoverPriority: 1, locationName: "eastus", isZoneRedundant: false },
    ],
    createMode: "Default",
    consistencyPolicy: {
      defaultConsistencyLevel: "BoundedStaleness",
      maxIntervalInSeconds: 10,
      maxStalenessPrefix: 200,
    },
    keyVaultKeyUri: "https://myKeyVault.vault.azure.net",
    defaultIdentity: "FirstPartyIdentity",
    enableFreeTier: false,
    apiProperties: { serverVersion: "3.2" },
    enableAnalyticalStorage: true,
    analyticalStorageConfiguration: { schemaType: "WellDefined" },
    backupPolicy: {
      type: "Periodic",
      periodicModeProperties: {
        backupIntervalInMinutes: 240,
        backupRetentionIntervalInHours: 8,
        backupStorageRedundancy: "Geo",
      },
    },
    cors: [{ allowedOrigins: "https://test" }],
    networkAclBypass: "AzureServices",
    networkAclBypassResourceIds: [
      "/subscriptions/subId/resourcegroups/rgName/providers/Microsoft.Synapse/workspaces/workspaceName",
    ],
    capacity: { totalThroughputLimit: 2000 },
    capacityMode: "Provisioned",
    enableMaterializedViews: false,
    enableBurstCapacity: true,
    minimalTlsVersion: "Tls12",
    enablePriorityBasedExecution: true,
    defaultPriorityLevel: "Low",
    enablePerRegionPerPartitionAutoscale: true,
    enableAllVersionsAndDeletesChangeFeed: false,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB database account. The "Update" method is preferred when performing updates on an account.
 *
 * @summary creates or updates an Azure Cosmos DB database account. The "Update" method is preferred when performing updates on an account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountCreateMin.json
 */
async function cosmosDBDatabaseAccountCreateMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.createOrUpdate("rg1", "ddb1", {
    location: "westus",
    databaseAccountOfferType: "Standard",
    locations: [{ failoverPriority: 0, locationName: "southcentralus", isZoneRedundant: false }],
    createMode: "Default",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB database account. The "Update" method is preferred when performing updates on an account.
 *
 * @summary creates or updates an Azure Cosmos DB database account. The "Update" method is preferred when performing updates on an account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBRestoreDatabaseAccountCreateUpdate.json
 */
async function cosmosDBRestoreDatabaseAccountCreateUpdateJson(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.createOrUpdate("rg1", "ddb1", {
    kind: "GlobalDocumentDB",
    location: "westus",
    apiProperties: { serverVersion: "3.2" },
    backupPolicy: { type: "Continuous", continuousModeProperties: { tier: "Continuous30Days" } },
    consistencyPolicy: {
      defaultConsistencyLevel: "BoundedStaleness",
      maxIntervalInSeconds: 10,
      maxStalenessPrefix: 200,
    },
    createMode: "Restore",
    databaseAccountOfferType: "Standard",
    enableAnalyticalStorage: true,
    enableFreeTier: false,
    enableMaterializedViews: false,
    keyVaultKeyUri: "https://myKeyVault.vault.azure.net",
    locations: [{ failoverPriority: 0, isZoneRedundant: false, locationName: "southcentralus" }],
    minimalTlsVersion: "Tls",
    restoreParameters: {
      databasesToRestore: [
        { collectionNames: ["collection1", "collection2"], databaseName: "db1" },
        { collectionNames: ["collection3", "collection4"], databaseName: "db2" },
      ],
      restoreMode: "PointInTime",
      restoreSource:
        "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.DocumentDB/locations/westus/restorableDatabaseAccounts/1a97b4bb-f6a0-430e-ade1-638d781830cc",
      restoreTimestampInUtc: new Date("2021-03-11T22:05:09Z"),
      restoreWithTtlDisabled: false,
      sourceBackupLocation: "westus",
    },
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBDatabaseAccountCreateMax();
  await cosmosDBDatabaseAccountCreateMin();
  await cosmosDBRestoreDatabaseAccountCreateUpdateJson();
}

main().catch(console.error);
