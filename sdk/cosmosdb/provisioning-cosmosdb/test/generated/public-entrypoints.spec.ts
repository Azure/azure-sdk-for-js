// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-cosmosdb";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.ClusterResource).toBeDefined();
    expect(packageExports.DataCenter).toBeDefined();
    expect(packageExports.DatabaseAccount).toBeDefined();
    expect(packageExports.CassandraKeyspace).toBeDefined();
    expect(packageExports.CassandraKeyspaceTable).toBeDefined();
    expect(packageExports.CassandraTableThroughputSetting).toBeDefined();
    expect(packageExports.CassandraKeyspaceThroughputSetting).toBeDefined();
    expect(packageExports.CassandraRoleAssignment).toBeDefined();
    expect(packageExports.CassandraRoleDefinition).toBeDefined();
    expect(packageExports.GremlinDatabase).toBeDefined();
    expect(packageExports.Graph).toBeDefined();
    expect(packageExports.GremlinGraphThroughputSetting).toBeDefined();
    expect(packageExports.GremlinDatabaseThroughputSetting).toBeDefined();
    expect(packageExports.GremlinRoleAssignment).toBeDefined();
    expect(packageExports.GremlinRoleDefinition).toBeDefined();
    expect(packageExports.MongoDbDatabase).toBeDefined();
    expect(packageExports.Collection).toBeDefined();
    expect(packageExports.MongoDbCollectionThroughputSetting).toBeDefined();
    expect(packageExports.MongoDbDatabaseThroughputSetting).toBeDefined();
    expect(packageExports.MongoRoleDefinitionGetResults).toBeDefined();
    expect(packageExports.MongoUserDefinitionGetResults).toBeDefined();
    expect(packageExports.MongoMiRoleAssignment).toBeDefined();
    expect(packageExports.MongoMiRoleDefinition).toBeDefined();
    expect(packageExports.NotebookWorkspace).toBeDefined();
    expect(packageExports.PrivateEndpointConnection).toBeDefined();
    expect(packageExports.PrivateLinkResource).toBeDefined();
    expect(packageExports.Service).toBeDefined();
    expect(packageExports.SqlDatabase).toBeDefined();
    expect(packageExports.ClientEncryptionKey).toBeDefined();
    expect(packageExports.Container).toBeDefined();
    expect(packageExports.StoredProcedure).toBeDefined();
    expect(packageExports.CosmosDbSqlContainerThroughputSetting).toBeDefined();
    expect(packageExports.Trigger).toBeDefined();
    expect(packageExports.UserDefinedFunction).toBeDefined();
    expect(packageExports.CosmosDbSqlDatabaseThroughputSetting).toBeDefined();
    expect(packageExports.SqlRoleAssignment).toBeDefined();
    expect(packageExports.SqlRoleDefinition).toBeDefined();
    expect(packageExports.TableRoleAssignment).toBeDefined();
    expect(packageExports.TableRoleDefinition).toBeDefined();
    expect(packageExports.DatabaseAccountTable).toBeDefined();
    expect(packageExports.CosmosTableThroughputSetting).toBeDefined();
    expect(packageExports.Fleet).toBeDefined();
    expect(packageExports.Fleetspace).toBeDefined();
    expect(packageExports.FleetspaceAccount).toBeDefined();
    expect(packageExports.Location).toBeDefined();
    expect(packageExports.RestorableDatabaseAccount).toBeDefined();
  });
});
