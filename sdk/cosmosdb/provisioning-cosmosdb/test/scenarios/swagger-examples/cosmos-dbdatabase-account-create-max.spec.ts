// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts
 * Also covers: none
 * Scenario: swagger-examples/cosmos-dbdatabase-account-create-max
 * provisioning API: DatabaseAccount
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/e070ec9b11d1417d83170393ec90d7122e343e0f/specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2026-03-15/examples/CosmosDBDatabaseAccountCreateMax.json
 * Operation: DatabaseAccounts_CreateOrUpdate
 * Runtime baseline: cosmos-dbdatabase-account-create-max.test.baseline.bicep and cosmos-dbdatabase-account-create-max.test.baseline.json
 * Gap/reduction: none
 */

import { DatabaseAccount } from "@azure/provisioning-cosmosdb";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

type BuildScenarioHelpers = {
  createResourceGroupStack: (name?: string) => import("@azure/provisioning-core").Stack;
  createSubscriptionStack: (name?: string) => import("@azure/provisioning-core").Stack;
  values: {
    subscriptionId: string;
    tenantId: string;
    objectId: string;
    principalId: string;
    clientId: string;
    resourceGroupName: string;
    location: string;
    secondaryLocation: string;
  };
};

const values = {
  subscriptionId: "00000000-0000-0000-0000-000000000000",
  tenantId: "11111111-1111-1111-1111-111111111111",
  objectId: "22222222-2222-2222-2222-222222222222",
  principalId: "33333333-3333-3333-3333-333333333333",
  clientId: "44444444-4444-4444-4444-444444444444",
  resourceGroupName: "rg-cdk-package-test",
  location: "eastus",
  secondaryLocation: "westus",
};

function buildScenarioStack({ createResourceGroupStack }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const resource0 = new DatabaseAccount(stack, {
    name: "databaseaccount-test",
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
    properties: {
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
        {
          failoverPriority: 0,
          locationName: "southcentralus",
          isZoneRedundant: false,
        },
        { failoverPriority: 1, locationName: "eastus", isZoneRedundant: false },
      ],
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
      enableBurstCapacity: true,
      enablePriorityBasedExecution: true,
      defaultPriorityLevel: "Low",
      enablePerRegionPerPartitionAutoscale: true,
      analyticalStorageConfiguration: { schemaType: "WellDefined" },
      createMode: "Default",
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
      capacity: { totalThroughputLimit: 2e3 },
      enforceHierarchicalPartitionKeyIdLastLevel: false,
      minimalTlsVersion: "Tls12",
    },
  });
  stack.outputs.add("resource0Id", "string", resource0.id);
  return stack;
}

describe("swagger-examples/cosmos-dbdatabase-account-create-max", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.DocumentDB/databaseAccounts",
      apiVersion: "2026-03-15",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
