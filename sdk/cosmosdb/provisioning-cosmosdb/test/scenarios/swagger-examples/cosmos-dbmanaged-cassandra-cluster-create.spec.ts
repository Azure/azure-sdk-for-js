// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/cassandraClusters
 * Primary schema key: Microsoft.DocumentDB/cassandraClusters
 * Also covers: none
 * Scenario: swagger-examples/cosmos-dbmanaged-cassandra-cluster-create
 * provisioning API: ClusterResource
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/e070ec9b11d1417d83170393ec90d7122e343e0f/specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2026-03-15/examples/CosmosDBManagedCassandraClusterCreate.json
 * Operation: CassandraClusters_CreateUpdate
 * Runtime baseline: cosmos-dbmanaged-cassandra-cluster-create.test.baseline.bicep and cosmos-dbmanaged-cassandra-cluster-create.test.baseline.json
 * Gap/reduction: none
 */

import { ClusterResource } from "@azure/provisioning-cosmosdb";
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

function buildScenarioStack({
  createResourceGroupStack,
  createSubscriptionStack,
  values,
}: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const resource0 = new ClusterResource(stack, {
    name: "clusterresource-test",
    location: "West US",
    tags: {},
    properties: {
      delegatedManagementSubnetId:
        "/subscriptions/536e130b-d7d6-4ac7-98a5-de20d69588d2/resourceGroups/customer-vnet-rg/providers/Microsoft.Network/virtualNetworks/customer-vnet/subnets/management",
      cassandraVersion: "3.11",
      hoursBetweenBackups: 24,
      authenticationMethod: "Cassandra",
      initialCassandraAdminPassword: "mypassword",
      externalSeedNodes: [
        { ipAddress: "10.52.221.2" },
        { ipAddress: "10.52.221.3" },
        { ipAddress: "10.52.221.4" },
      ],
      clusterNameOverride: "ClusterNameIllegalForAzureResource",
      clientCertificates: [
        {
          pem: "-----BEGIN CERTIFICATE-----\n...Base64 encoded certificate...\n-----END CERTIFICATE-----",
        },
      ],
      externalGossipCertificates: [
        {
          pem: "-----BEGIN CERTIFICATE-----\n...Base64 encoded certificate...\n-----END CERTIFICATE-----",
        },
      ],
    },
  });
  stack.outputs.add("resource0Id", "string", resource0.id);
  return stack;
}

describe("swagger-examples/cosmos-dbmanaged-cassandra-cluster-create", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.DocumentDB/cassandraClusters",
      apiVersion: "2026-03-15",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
