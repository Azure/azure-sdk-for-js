// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts
 * Also covers: Microsoft.DocumentDB/databaseAccounts/sqlDatabases, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/storedProcedures, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/triggers, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions
 * Scenario: quick-start/cosmosdb-sql-container-sprocs
 * provisioning API: Container, DatabaseAccount, SqlDatabase, StoredProcedure, Trigger, UserDefinedFunction
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.documentdb/cosmosdb-sql-container-sprocs/main.bicep
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.documentdb/cosmosdb-sql-container-sprocs/azuredeploy.json
 * Operation: n/a
 * Runtime baseline: cosmosdb-sql-container-sprocs.test.baseline.bicep and cosmosdb-sql-container-sprocs.test.baseline.json
 * Gap/reduction: Consistency-policy map selection uses equivalent conditionals for the source allowed values., Source API versions normalized to package API version; slash-delimited child names use public parent constructors.
 */

import {
  Container,
  DatabaseAccount,
  SqlDatabase,
  StoredProcedure,
  Trigger,
  UserDefinedFunction,
} from "@azure/provisioning-cosmosdb";
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

function buildScenarioStack({
  createResourceGroupStack,
  createSubscriptionStack,
  values,
}: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const p_accountName = stack.parameters.add("accountName", "string", {
    defaultValue: fn.format("sql-{0}", fn.uniqueString(fn.resourceGroup().id)),
    description: "Cosmos DB account name",
  });
  const p_location = stack.parameters.add("location", "string", {
    defaultValue: fn.resourceGroup().location,
    description: "Location for the Cosmos DB account.",
  });
  const p_primaryRegion = stack.parameters.add("primaryRegion", "string", {
    description: "The primary region for the Cosmos DB account.",
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
    defaultValue: "database1",
    description: "The name for the database",
  });
  const p_containerName = stack.parameters.add("containerName", "string", {
    defaultValue: "container1",
    description: "The name for the container",
  });
  const p_throughput = stack.parameters.add("throughput", "int", {
    defaultValue: 400,
    minValue: 400,
    maxValue: 1e6,
    description: "The throughput for the container",
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
  ]);
  const resource0 = new DatabaseAccount(stack, {
    name: fn.toLower(p_accountName),
    location: p_location,
    kind: "GlobalDocumentDB",
    properties: {
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
  const resource1 = new SqlDatabase(resource0, {
    name: p_databaseName,
    properties: { resource: { id: p_databaseName } },
  });
  stack.outputs.add("resource1Id", "string", resource1.id);
  const resource2 = new Container(resource1, {
    name: p_containerName,
    properties: {
      resource: {
        id: p_containerName,
        partitionKey: { paths: ["/myPartitionKey"], kind: "Hash" },
        indexingPolicy: {
          indexingMode: "consistent",
          includedPaths: [{ path: "/*" }],
          excludedPaths: [{ path: "/_etag/?" }],
        },
      },
      options: { throughput: p_throughput },
    },
  });
  stack.outputs.add("resource2Id", "string", resource2.id);
  const resource3 = new StoredProcedure(resource2, {
    name: "myStoredProcedure",
    properties: {
      resource: {
        id: "myStoredProcedure",
        body: "function () { var context = getContext(); var response = context.getResponse(); response.setBody('Hello, World'); }",
      },
    },
  });
  stack.outputs.add("resource3Id", "string", resource3.id);
  const resource4 = new Trigger(resource2, {
    name: "myPreTrigger",
    properties: {
      resource: {
        id: "myPreTrigger",
        triggerType: "Pre",
        triggerOperation: "Create",
        body: "function validateToDoItemTimestamp(){var context=getContext();var request=context.getRequest();var itemToCreate=request.getBody();if(!('timestamp'in itemToCreate)){var ts=new Date();itemToCreate['timestamp']=ts.getTime();}request.setBody(itemToCreate);}",
      },
    },
  });
  stack.outputs.add("resource4Id", "string", resource4.id);
  const resource5 = new UserDefinedFunction(resource2, {
    name: "myUserDefinedFunction",
    properties: {
      resource: {
        id: "myUserDefinedFunction",
        body: "function tax(income){if(income==undefined)throw'no input';if(income<1000)return income*0.1;else if(income<10000)return income*0.2;else return income*0.4;}",
      },
    },
  });
  stack.outputs.add("resource5Id", "string", resource5.id);
  return stack;
}

describe("quick-start/cosmosdb-sql-container-sprocs", () => {
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
