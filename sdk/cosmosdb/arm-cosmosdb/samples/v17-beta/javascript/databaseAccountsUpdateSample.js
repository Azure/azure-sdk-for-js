// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the properties of an existing Azure Cosmos DB database account.
 *
 * @summary updates the properties of an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountPatch.json
 */
async function cosmosDBDatabaseAccountPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.update("rg1", "ddb1", {
    location: "westus",
    tags: { dept: "finance" },
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/eu2cgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    ipRules: [{ ipAddressOrRange: "23.43.230.120" }, { ipAddressOrRange: "110.12.240.0/12" }],
    isVirtualNetworkFilterEnabled: true,
    virtualNetworkRules: [
      {
        id: "/subscriptions/subId/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        ignoreMissingVNetServiceEndpoint: false,
      },
    ],
    consistencyPolicy: {
      defaultConsistencyLevel: "BoundedStaleness",
      maxIntervalInSeconds: 10,
      maxStalenessPrefix: 200,
    },
    defaultIdentity: "FirstPartyIdentity",
    enableFreeTier: false,
    enableAnalyticalStorage: true,
    analyticalStorageConfiguration: { schemaType: "WellDefined" },
    backupPolicy: {
      type: "Periodic",
      periodicModeProperties: {
        backupIntervalInMinutes: 240,
        backupRetentionIntervalInHours: 720,
        backupStorageRedundancy: "Geo",
      },
    },
    networkAclBypass: "AzureServices",
    networkAclBypassResourceIds: [
      "/subscriptions/subId/resourcegroups/rgName/providers/Microsoft.Synapse/workspaces/workspaceName",
    ],
    capacity: { totalThroughputLimit: 2000 },
    capacityMode: "Provisioned",
    diagnosticLogSettings: { enableFullTextQuery: "True" },
    enablePartitionMerge: true,
    enableBurstCapacity: true,
    minimalTlsVersion: "Tls",
    enablePriorityBasedExecution: true,
    defaultPriorityLevel: "Low",
    enablePerRegionPerPartitionAutoscale: true,
  });
  console.log(result);
}

async function main() {
  await cosmosDBDatabaseAccountPatch();
}

main().catch(console.error);
