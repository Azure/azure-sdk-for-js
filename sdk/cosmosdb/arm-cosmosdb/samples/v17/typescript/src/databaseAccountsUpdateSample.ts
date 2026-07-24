// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the properties of an existing Azure Cosmos DB database account.
 *
 * @summary updates the properties of an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2026-03-15/CosmosDBDatabaseAccountPatch.json
 */
async function cosmosDBDatabaseAccountPatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
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
    enableBurstCapacity: true,
    enablePriorityBasedExecution: true,
    defaultPriorityLevel: "Low",
    enablePerRegionPerPartitionAutoscale: true,
    analyticalStorageConfiguration: { schemaType: "WellDefined" },
    backupPolicy: {
      type: "Periodic",
      periodicModeProperties: {
        backupIntervalInMinutes: 240,
        backupRetentionIntervalInHours: 720,
        backupStorageRedundancy: "Local",
      },
    },
    networkAclBypass: "AzureServices",
    networkAclBypassResourceIds: [
      "/subscriptions/subId/resourcegroups/rgName/providers/Microsoft.Synapse/workspaces/workspaceName",
    ],
    capacity: { totalThroughputLimit: 2000 },
    enablePartitionMerge: true,
    enforceHierarchicalPartitionKeyIdLastLevel: false,
    minimalTlsVersion: "Tls",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBDatabaseAccountPatch();
}

main().catch(console.error);
