// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts
 * Also covers: Microsoft.DocumentDB/databaseAccounts/gremlinDatabases, Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs
 * Scenario: quick-start/cosmosdb-gremlin-autoscale
 * provisioning API: DatabaseAccount, Graph, GremlinDatabase
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.documentdb/cosmosdb-gremlin-autoscale/main.bicep
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.documentdb/cosmosdb-gremlin-autoscale/azuredeploy.json
 * Operation: n/a
 * Runtime baseline: cosmosdb-gremlin-autoscale.test.baseline.bicep and cosmosdb-gremlin-autoscale.test.baseline.json
 * Gap/reduction: Consistency-policy map selection uses equivalent conditionals for the source allowed values., Source API versions normalized to package API version; slash-delimited child names use public parent constructors.
 */

import { DatabaseAccount, Graph, GremlinDatabase } from "@azure/provisioning-cosmosdb";
import { fn } from "@azure/provisioning-core";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderOutputsToMatchSample,
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
  const p_accountName = stack.parameters.add("accountName", "string", {
    defaultValue: fn.format("gremlin-{0}", fn.uniqueString(fn.resourceGroup().id)),
    description: "Cosmos DB account name",
  });
  const p_location = stack.parameters.add("location", "string", {
    defaultValue: fn.resourceGroup().location,
    description: "Location for the Cosmos DB account.",
  });
  const p_primaryRegion = stack.parameters.add("primaryRegion", "string", {
    description: "The primary replica region for the Cosmos DB account.",
  });
  const p_secondaryRegion = stack.parameters.add("secondaryRegion", "string", {
    description: "The secondary replica region for the Cosmos DB account.",
  });
  const p_defaultConsistencyLevel = stack.parameters.add("defaultConsistencyLevel", "string", {
    defaultValue: "Session",
    allowed: ["Eventual", "ConsistentPrefix", "Session", "BoundedStaleness", "Strong"],
    description: "The default consistency level of the Cosmos DB account.",
  });
  const p_maxStalenessPrefix = stack.parameters.add("maxStalenessPrefix", "int", {
    defaultValue: 1e5,
    minValue: 10,
    maxValue: 2147483647,
    description:
      "Max stale requests. Required for BoundedStaleness. Valid ranges, Single Region: 10 to 2147483647. Multi Region: 100000 to 2147483647.",
  });
  const p_maxIntervalInSeconds = stack.parameters.add("maxIntervalInSeconds", "int", {
    defaultValue: 300,
    minValue: 5,
    maxValue: 86400,
    description:
      "Max lag time (seconds). Required for BoundedStaleness. Valid ranges, Single Region: 5 to 84600. Multi Region: 300 to 86400.",
  });
  const p_systemManagedFailover = stack.parameters.add("systemManagedFailover", "bool", {
    defaultValue: true,
    description: "Enable system managed failover for regions",
  });
  const p_databaseName = stack.parameters.add("databaseName", "string", {
    description: "The name for the Gremlin database",
  });
  const p_graphName = stack.parameters.add("graphName", "string", {
    description: "The name for the Gremlin graph",
  });
  const p_autoscaleMaxThroughput = stack.parameters.add("autoscaleMaxThroughput", "int", {
    defaultValue: 1e3,
    minValue: 1e3,
    maxValue: 1e6,
    description: "Maximum autoscale throughput for the graph",
  });
  const v_consistencyPolicy = stack.variables.add("consistencyPolicy", {
    Eventual: { defaultConsistencyLevel: "Eventual" },
    ConsistentPrefix: { defaultConsistencyLevel: "ConsistentPrefix" },
    Session: { defaultConsistencyLevel: "Session" },
    BoundedStaleness: {
      defaultConsistencyLevel: "BoundedStaleness",
      maxStalenessPrefix: p_maxStalenessPrefix,
      maxIntervalInSeconds: p_maxIntervalInSeconds,
    },
    Strong: { defaultConsistencyLevel: "Strong" },
  });
  const v_locations = stack.variables.add("locations", [
    {
      locationName: p_primaryRegion,
      failoverPriority: 0,
      isZoneRedundant: false,
    },
    {
      locationName: p_secondaryRegion,
      failoverPriority: 1,
      isZoneRedundant: false,
    },
  ]);
  const resource0 = new DatabaseAccount(stack, {
    name: fn.toLower(p_accountName),
    location: p_location,
    kind: "GlobalDocumentDB",
    properties: {
      capabilities: [{ name: "EnableGremlin" }],
      consistencyPolicy: fn.cond(
        fn.eq(p_defaultConsistencyLevel, "Eventual"),
        v_consistencyPolicy.Eventual,
        fn.cond(
          fn.eq(p_defaultConsistencyLevel, "ConsistentPrefix"),
          v_consistencyPolicy.ConsistentPrefix,
          fn.cond(
            fn.eq(p_defaultConsistencyLevel, "Session"),
            v_consistencyPolicy.Session,
            fn.cond(
              fn.eq(p_defaultConsistencyLevel, "BoundedStaleness"),
              v_consistencyPolicy.BoundedStaleness,
              v_consistencyPolicy.Strong,
            ),
          ),
        ),
      ),
      locations: v_locations,
      databaseAccountOfferType: "Standard",
      enableAutomaticFailover: p_systemManagedFailover,
    },
  });
  stack.outputs.add("resource0Id", "string", resource0.id);
  const resource1 = new GremlinDatabase(resource0, {
    name: p_databaseName,
    properties: { resource: { id: p_databaseName } },
  });
  stack.outputs.add("resource1Id", "string", resource1.id);
  const resource2 = new Graph(resource1, {
    name: p_graphName,
    properties: {
      resource: {
        id: p_graphName,
        indexingPolicy: {
          indexingMode: "consistent",
          includedPaths: [{ path: "/*" }],
          excludedPaths: [{ path: "/myPathToNotIndex/*" }],
        },
        partitionKey: { paths: ["/myPartitionKey"], kind: "Hash" },
      },
      options: {
        autoscaleSettings: { maxThroughput: p_autoscaleMaxThroughput },
      },
    },
  });
  stack.outputs.add("resource2Id", "string", resource2.id);
  return stack;
}

describe("quick-start/cosmosdb-gremlin-autoscale", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderOutputsToMatchSample(import.meta.url, rendered.outputs);
  });
});
