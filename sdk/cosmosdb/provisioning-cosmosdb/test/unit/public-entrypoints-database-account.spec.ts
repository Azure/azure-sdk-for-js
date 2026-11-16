// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts
 * Also covers: Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces, Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables, Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables/throughputSettings, Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/throughputSettings, Microsoft.DocumentDB/databaseAccounts/cassandraRoleAssignments, Microsoft.DocumentDB/databaseAccounts/cassandraRoleDefinitions, Microsoft.DocumentDB/databaseAccounts/gremlinDatabases, Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs, Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs/throughputSettings, Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/throughputSettings, Microsoft.DocumentDB/databaseAccounts/gremlinRoleAssignments, Microsoft.DocumentDB/databaseAccounts/gremlinRoleDefinitions, Microsoft.DocumentDB/databaseAccounts/mongoMIRoleAssignments, Microsoft.DocumentDB/databaseAccounts/mongoMIRoleDefinitions, Microsoft.DocumentDB/databaseAccounts/mongodbDatabases, Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections, Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings, Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings, Microsoft.DocumentDB/databaseAccounts/mongodbRoleDefinitions, Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions, Microsoft.DocumentDB/databaseAccounts/notebookWorkspaces, Microsoft.DocumentDB/databaseAccounts/privateEndpointConnections, Microsoft.DocumentDB/databaseAccounts/privateLinkResources, Microsoft.DocumentDB/databaseAccounts/services, Microsoft.DocumentDB/databaseAccounts/sqlDatabases, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/clientEncryptionKeys, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/storedProcedures, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/throughputSettings, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/triggers, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/throughputSettings, Microsoft.DocumentDB/databaseAccounts/sqlRoleAssignments, Microsoft.DocumentDB/databaseAccounts/sqlRoleDefinitions, Microsoft.DocumentDB/databaseAccounts/tableRoleAssignments, Microsoft.DocumentDB/databaseAccounts/tableRoleDefinitions, Microsoft.DocumentDB/databaseAccounts/tables, Microsoft.DocumentDB/databaseAccounts/tables/throughputSettings
 * Scenario: public-entrypoints/public-entrypoints-database-account
 * provisioning API: CassandraKeyspace, CassandraKeyspaceTable, CassandraTableThroughputSetting, CassandraKeyspaceThroughputSetting, CassandraRoleAssignment, CassandraRoleDefinition, ClientEncryptionKey, Collection, MongoDbCollectionThroughputSetting, Container, CosmosDbSqlContainerThroughputSetting, DatabaseAccount, DatabaseAccountTable, CosmosTableThroughputSetting, Graph, GremlinGraphThroughputSetting, GremlinDatabase, GremlinDatabaseThroughputSetting, GremlinRoleAssignment, GremlinRoleDefinition, MongoDbDatabase, MongoMiRoleAssignment, MongoMiRoleDefinition, MongoRoleDefinitionGetResults, MongoUserDefinitionGetResults, MongoDbDatabaseThroughputSetting, NotebookWorkspace, PrivateEndpointConnection, PrivateLinkResource, Service, SqlDatabase, CosmosDbSqlDatabaseThroughputSetting, SqlRoleAssignment, SqlRoleDefinition, StoredProcedure, TableRoleAssignment, TableRoleDefinition, Trigger, UserDefinedFunction
 * Source: packages\services\cosmosdb\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-database-account.test.baseline.bicep and public-entrypoints-database-account.test.baseline.json
 * Gap/reduction: none
 */

import {
  CassandraKeyspace,
  CassandraKeyspaceTable,
  CassandraTableThroughputSetting,
  CassandraKeyspaceThroughputSetting,
  CassandraRoleAssignment,
  CassandraRoleDefinition,
  ClientEncryptionKey,
  Collection,
  MongoDbCollectionThroughputSetting,
  Container,
  CosmosDbSqlContainerThroughputSetting,
  DatabaseAccount,
  DatabaseAccountTable,
  CosmosTableThroughputSetting,
  Graph,
  GremlinGraphThroughputSetting,
  GremlinDatabase,
  GremlinDatabaseThroughputSetting,
  GremlinRoleAssignment,
  GremlinRoleDefinition,
  MongoDbDatabase,
  MongoMiRoleAssignment,
  MongoMiRoleDefinition,
  MongoRoleDefinitionGetResults,
  MongoUserDefinitionGetResults,
  MongoDbDatabaseThroughputSetting,
  NotebookWorkspace,
  PrivateEndpointConnection,
  PrivateLinkResource,
  Service,
  SqlDatabase,
  CosmosDbSqlDatabaseThroughputSetting,
  SqlRoleAssignment,
  SqlRoleDefinition,
  StoredProcedure,
  TableRoleAssignment,
  TableRoleDefinition,
  Trigger,
  UserDefinedFunction,
} from "@azure/provisioning-cosmosdb";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../utils/index.js";

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
    properties: {
      databaseAccountOfferType: "Standard",
      locations: [{ locationName: "eastus", failoverPriority: 0 }],
    },
    location: "eastus",
  });
  stack.outputs.add("resource0Id", "string", resource0.id);
  const resource1 = new CassandraKeyspace(resource0, {
    name: "cassandrakeyspace-test",
    properties: { resource: { id: "cassandrakeyspace-test" } },
  });
  stack.outputs.add("resource1Id", "string", resource1.id);
  const resource2 = new CassandraKeyspaceTable(resource1, {
    name: "cassandrakeyspacetab-test",
    properties: { resource: { id: "cassandrakeyspacetab-test" } },
  });
  stack.outputs.add("resource2Id", "string", resource2.id);
  const resource3 = new CassandraTableThroughputSetting(resource2, {
    properties: { resource: {} },
  });
  stack.outputs.add("resource3Id", "string", resource3.id);
  const resource4 = new CassandraKeyspaceThroughputSetting(resource1, {
    properties: { resource: {} },
  });
  stack.outputs.add("resource4Id", "string", resource4.id);
  const resource5 = new CassandraRoleAssignment(resource0, {
    name: "cassandraroleassignm-test",
  });
  stack.outputs.add("resource5Id", "string", resource5.id);
  const resource6 = new CassandraRoleDefinition(resource0, {
    name: "cassandraroledefinit-test",
  });
  stack.outputs.add("resource6Id", "string", resource6.id);
  const resource7 = new SqlDatabase(resource0, {
    name: "sqldatabase-test",
    properties: { resource: { id: "sqldatabase-test" } },
  });
  stack.outputs.add("resource7Id", "string", resource7.id);
  const resource8 = new ClientEncryptionKey(resource7, {
    name: "clientencryptionkey-test",
    properties: { resource: {} },
  });
  stack.outputs.add("resource8Id", "string", resource8.id);
  const resource9 = new MongoDbDatabase(resource0, {
    name: "mongodbdatabase-test",
    properties: { resource: { id: "mongodbdatabase-test" } },
  });
  stack.outputs.add("resource9Id", "string", resource9.id);
  const resource10 = new Collection(resource9, {
    name: "collection-test",
    properties: { resource: { id: "collection-test" } },
  });
  stack.outputs.add("resource10Id", "string", resource10.id);
  const resource11 = new MongoDbCollectionThroughputSetting(resource10, {
    properties: { resource: {} },
  });
  stack.outputs.add("resource11Id", "string", resource11.id);
  const resource12 = new Container(resource7, {
    name: "container-test",
    properties: { resource: { id: "container-test" } },
  });
  stack.outputs.add("resource12Id", "string", resource12.id);
  const resource13 = new CosmosDbSqlContainerThroughputSetting(resource12, {
    properties: { resource: {} },
  });
  stack.outputs.add("resource13Id", "string", resource13.id);
  const resource14 = new DatabaseAccountTable(resource0, {
    name: "databaseaccounttable-test",
    properties: { resource: { id: "databaseaccounttable-test" } },
  });
  stack.outputs.add("resource14Id", "string", resource14.id);
  const resource15 = new CosmosTableThroughputSetting(resource14, {
    properties: { resource: {} },
  });
  stack.outputs.add("resource15Id", "string", resource15.id);
  const resource16 = new GremlinDatabase(resource0, {
    name: "gremlindatabase-test",
    properties: { resource: { id: "gremlindatabase-test" } },
  });
  stack.outputs.add("resource16Id", "string", resource16.id);
  const resource17 = new Graph(resource16, {
    name: "graph-test",
    properties: { resource: { id: "graph-test" } },
  });
  stack.outputs.add("resource17Id", "string", resource17.id);
  const resource18 = new GremlinGraphThroughputSetting(resource17, {
    properties: { resource: {} },
  });
  stack.outputs.add("resource18Id", "string", resource18.id);
  const resource19 = new GremlinDatabaseThroughputSetting(resource16, {
    properties: { resource: {} },
  });
  stack.outputs.add("resource19Id", "string", resource19.id);
  const resource20 = new GremlinRoleAssignment(resource0, {
    name: "gremlinroleassignmen-test",
  });
  stack.outputs.add("resource20Id", "string", resource20.id);
  const resource21 = new GremlinRoleDefinition(resource0, {
    name: "gremlinroledefinitio-test",
  });
  stack.outputs.add("resource21Id", "string", resource21.id);
  const resource22 = new MongoMiRoleAssignment(resource0, {
    name: "mongomiroleassignmen-test",
  });
  stack.outputs.add("resource22Id", "string", resource22.id);
  const resource23 = new MongoMiRoleDefinition(resource0, {
    name: "mongomiroledefinitio-test",
  });
  stack.outputs.add("resource23Id", "string", resource23.id);
  const resource24 = new MongoRoleDefinitionGetResults(resource0, {
    name: "mongoroledefinitiong-test",
  });
  stack.outputs.add("resource24Id", "string", resource24.id);
  const resource25 = new MongoUserDefinitionGetResults(resource0, {
    name: "mongouserdefinitiong-test",
  });
  stack.outputs.add("resource25Id", "string", resource25.id);
  const resource26 = new MongoDbDatabaseThroughputSetting(resource9, {
    properties: { resource: {} },
  });
  stack.outputs.add("resource26Id", "string", resource26.id);
  const resource27 = new NotebookWorkspace(resource0, { name: "default" });
  stack.outputs.add("resource27Id", "string", resource27.id);
  const resource28 = new PrivateEndpointConnection(resource0, {
    name: "privateendpointconne-test",
  });
  stack.outputs.add("resource28Id", "string", resource28.id);
  const resource29 = new PrivateLinkResource(resource0, {
    name: "privatelinkresource-test",
    existing: true,
  });
  stack.outputs.add("resource29Id", "string", resource29.id);
  const resource30 = new Service(resource0, { name: "service-test" });
  stack.outputs.add("resource30Id", "string", resource30.id);
  const resource31 = new CosmosDbSqlDatabaseThroughputSetting(resource7, {
    properties: { resource: {} },
  });
  stack.outputs.add("resource31Id", "string", resource31.id);
  const resource32 = new SqlRoleAssignment(resource0, {
    name: "sqlroleassignment-test",
  });
  stack.outputs.add("resource32Id", "string", resource32.id);
  const resource33 = new SqlRoleDefinition(resource0, {
    name: "sqlroledefinition-test",
  });
  stack.outputs.add("resource33Id", "string", resource33.id);
  const resource34 = new StoredProcedure(resource12, {
    name: "storedprocedure-test",
    properties: { resource: { id: "storedprocedure-test" } },
  });
  stack.outputs.add("resource34Id", "string", resource34.id);
  const resource35 = new TableRoleAssignment(resource0, {
    name: "tableroleassignment-test",
  });
  stack.outputs.add("resource35Id", "string", resource35.id);
  const resource36 = new TableRoleDefinition(resource0, {
    name: "tableroledefinition-test",
  });
  stack.outputs.add("resource36Id", "string", resource36.id);
  const resource37 = new Trigger(resource12, {
    name: "trigger-test",
    properties: { resource: { id: "trigger-test" } },
  });
  stack.outputs.add("resource37Id", "string", resource37.id);
  const resource38 = new UserDefinedFunction(resource12, {
    name: "userdefinedfunction-test",
    properties: { resource: { id: "userdefinedfunction-test" } },
  });
  stack.outputs.add("resource38Id", "string", resource38.id);
  return stack;
}

describe("public-entrypoints/public-entrypoints-database-account", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
