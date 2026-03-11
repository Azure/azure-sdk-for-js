// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("creates a new migration", () => {
  let recorder: Recorder;
  let client: PostgreSQLManagementFlexibleServerClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new PostgreSQLManagementFlexibleServerClient(
      credential,
      subscriptionId,
      clientOptions,
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should creates a new migration for createAMigration", async function () {
    const result = await client.migrations.create(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
      {
        location: "eastus",
        dbsToMigrate: [
          "exampledatabase1",
          "exampledatabase2",
          "exampledatabase3",
          "exampledatabase4",
        ],
        migrationMode: "Offline",
        overwriteDbsInTarget: "True",
        secretParameters: {
          adminCredentials: {
            sourceServerPassword: "examplesourcepassword",
            targetServerPassword: "exampletargetpassword",
          },
        },
        sourceDbServerResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplemigration");
    assert.strictEqual(result.type, "Microsoft.DBForPostgreSql/flexibleServers/migrations");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget/migrations/examplemigration",
    );
    assert.strictEqual(result.location, "eastus");
    assert.ok(Array.isArray(result.dbsToMigrate));
    assert.strictEqual(result.dbsToMigrate.length, 4);
    assert.strictEqual(result.migrateRoles, "False");
    assert.strictEqual(result.migrationId, "d3ceacbb-a5fd-43dc-a9db-6022b5154856");
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "True");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "False");
    assert.strictEqual(
      result.sourceDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    );
    assert.strictEqual(result.startDataMigration, "False");
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget",
    );
    assert.strictEqual(result.triggerCutover, "False");
    assert.strictEqual(result.tags?.key1624, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  });

  it("should creates a new migration for createAMigrationWithOtherSourceTypeForValidatingAndMigrating", async function () {
    const result = await client.migrations.create(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
      {
        location: "eastus",
        dbsToMigrate: [
          "exampledatabase1",
          "exampledatabase2",
          "exampledatabase3",
          "exampledatabase4",
        ],
        migrationMode: "Offline",
        migrationOption: "ValidateAndMigrate",
        overwriteDbsInTarget: "True",
        secretParameters: {
          adminCredentials: {
            sourceServerPassword: "examplesourcepassword",
            targetServerPassword: "exampletargetpassword",
          },
        },
        sourceDbServerResourceId: "examplesource:5432@exampleuser",
        sourceType: "OnPremises",
        sslMode: "Prefer",
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplemigration");
    assert.strictEqual(result.type, "Microsoft.DBForPostgreSql/flexibleServers/migrations");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget/migrations/examplemigration",
    );
    assert.strictEqual(result.location, "eastus");
    assert.ok(Array.isArray(result.dbsToMigrate));
    assert.strictEqual(result.dbsToMigrate.length, 4);
    assert.strictEqual(result.migrateRoles, "False");
    assert.strictEqual(result.migrationId, "d3ceacbb-a5fd-43dc-a9db-6022b5154856");
    assert.strictEqual(result.migrationOption, "ValidateAndMigrate");
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "True");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "False");
    assert.strictEqual(result.sourceDbServerResourceId, "examplesource:5432@exampleuser");
    assert.strictEqual(result.sourceType, "OnPremises");
    assert.strictEqual(result.sslMode, "Prefer");
    assert.strictEqual(result.startDataMigration, "False");
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget",
    );
    assert.strictEqual(result.triggerCutover, "False");
    assert.strictEqual(result.tags?.key1624, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  });

  it("should creates a new migration for createAMigrationForValidatingOnly", async function () {
    const result = await client.migrations.create(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
      {
        location: "eastus",
        dbsToMigrate: [
          "exampledatabase1",
          "exampledatabase2",
          "exampledatabase3",
          "exampledatabase4",
        ],
        migrationMode: "Offline",
        migrationOption: "Validate",
        overwriteDbsInTarget: "True",
        secretParameters: {
          adminCredentials: {
            sourceServerPassword: "examplesourcepassword",
            targetServerPassword: "exampletargetpassword",
          },
        },
        sourceDbServerResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplemigration");
    assert.strictEqual(result.type, "Microsoft.DBForPostgreSql/flexibleServers/migrations");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget/migrations/examplemigration",
    );
    assert.strictEqual(result.location, "eastus");
    assert.ok(Array.isArray(result.dbsToMigrate));
    assert.strictEqual(result.dbsToMigrate.length, 4);
    assert.strictEqual(result.migrateRoles, "False");
    assert.strictEqual(result.migrationId, "d3ceacbb-a5fd-43dc-a9db-6022b5154856");
    assert.strictEqual(result.migrationOption, "Validate");
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "True");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "False");
    assert.strictEqual(
      result.sourceDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    );
    assert.strictEqual(result.startDataMigration, "False");
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget",
    );
    assert.strictEqual(result.triggerCutover, "False");
    assert.strictEqual(result.tags?.key1624, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  });

  it("should creates a new migration for createAMigrationWithFullyQualifiedDomainNamesForSourceAndTargetServers", async function () {
    const result = await client.migrations.create(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
      {
        location: "eastus",
        dbsToMigrate: [
          "exampledatabase1",
          "exampledatabase2",
          "exampledatabase3",
          "exampledatabase4",
        ],
        migrationMode: "Offline",
        overwriteDbsInTarget: "True",
        secretParameters: {
          adminCredentials: { sourceServerPassword: "xxxxxxxx", targetServerPassword: "xxxxxxxx" },
        },
        sourceDbServerFullyQualifiedDomainName: "examplesource.contoso.com",
        sourceDbServerResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
        targetDbServerFullyQualifiedDomainName: "exampletarget.contoso.com",
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplemigration");
    assert.strictEqual(result.type, "Microsoft.DBForPostgreSql/flexibleServers/migrations");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget/migrations/examplemigration",
    );
    assert.strictEqual(result.location, "eastus");
    assert.ok(Array.isArray(result.dbsToMigrate));
    assert.strictEqual(result.dbsToMigrate.length, 4);
    assert.strictEqual(result.migrateRoles, "False");
    assert.strictEqual(result.migrationId, "d3ceacbb-a5fd-43dc-a9db-6022b5154856");
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "True");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "False");
    assert.strictEqual(result.sourceDbServerFullyQualifiedDomainName, "examplesource.contoso.com");
    assert.strictEqual(
      result.sourceDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    );
    assert.strictEqual(result.startDataMigration, "False");
    assert.strictEqual(result.targetDbServerFullyQualifiedDomainName, "exampletarget.contoso.com");
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget",
    );
    assert.strictEqual(result.triggerCutover, "False");
    assert.strictEqual(result.tags?.key1624, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  });

  it("should creates a new migration for createAMigrationSpecifyingUserNames", async function () {
    const result = await client.migrations.create(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
      {
        location: "eastus",
        dbsToMigrate: [
          "exampledatabase1",
          "exampledatabase2",
          "exampledatabase3",
          "exampledatabase4",
        ],
        migrationMode: "Offline",
        secretParameters: {
          adminCredentials: {
            sourceServerPassword: "examplesourcepassword",
            targetServerPassword: "exampletargetpassword",
          },
          sourceServerUsername: "newadmin@examplesource",
          targetServerUsername: "targetadmin",
        },
        sourceDbServerResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplemigration");
    assert.strictEqual(result.type, "Microsoft.DBForPostgreSql/flexibleServers/migrations");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget/migrations/examplemigration",
    );
    assert.strictEqual(result.location, "eastus");
    assert.ok(Array.isArray(result.dbsToMigrate));
    assert.strictEqual(result.dbsToMigrate.length, 4);
    assert.strictEqual(result.migrateRoles, "False");
    assert.strictEqual(result.migrationId, "d3ceacbb-a5fd-43dc-a9db-6022b5154856");
    assert.strictEqual(result.migrationMode, "Offline");
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "False");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "False");
    assert.strictEqual(
      result.sourceDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    );
    assert.strictEqual(result.startDataMigration, "False");
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget",
    );
    assert.strictEqual(result.triggerCutover, "False");
    assert.strictEqual(result.tags?.key1624, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  });

  it("should creates a new migration for createAMigrationWithPrivateEndpoint", async function () {
    const result = await client.migrations.create(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
      {
        location: "eastus",
        dbsToMigrate: [
          "exampledatabase1",
          "exampledatabase2",
          "exampledatabase3",
          "exampledatabase4",
        ],
        migrationInstanceResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/examplesourcemigration",
        migrationMode: "Offline",
        overwriteDbsInTarget: "True",
        secretParameters: {
          adminCredentials: {
            sourceServerPassword: "examplesourcepassword",
            targetServerPassword: "exampletargetpassword",
          },
        },
        sourceDbServerResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplemigration");
    assert.strictEqual(result.type, "Microsoft.DBForPostgreSql/flexibleServers/migrations");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget/migrations/examplemigration",
    );
    assert.strictEqual(result.location, "eastus");
    assert.ok(Array.isArray(result.dbsToMigrate));
    assert.strictEqual(result.dbsToMigrate.length, 4);
    assert.strictEqual(result.migrateRoles, "False");
    assert.strictEqual(result.migrationId, "d3ceacbb-a5fd-43dc-a9db-6022b5154856");
    assert.strictEqual(
      result.migrationInstanceResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/examplesourcemigration",
    );
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "True");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "False");
    assert.strictEqual(
      result.sourceDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    );
    assert.strictEqual(result.startDataMigration, "False");
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget",
    );
    assert.strictEqual(result.triggerCutover, "False");
    assert.strictEqual(result.tags?.key1624, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  });

  it("should creates a new migration for createAMigrationWithRoles", async function () {
    const result = await client.migrations.create(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
      {
        location: "eastus",
        dbsToMigrate: [
          "exampledatabase1",
          "exampledatabase2",
          "exampledatabase3",
          "exampledatabase4",
        ],
        migrateRoles: "True",
        migrationMode: "Offline",
        overwriteDbsInTarget: "True",
        secretParameters: {
          adminCredentials: {
            sourceServerPassword: "examplesourcepassword",
            targetServerPassword: "exampletargetpassword",
          },
        },
        sourceDbServerResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplemigration");
    assert.strictEqual(result.type, "Microsoft.DBForPostgreSql/flexibleServers/migrations");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget/migrations/examplemigration",
    );
    assert.strictEqual(result.location, "eastus");
    assert.ok(Array.isArray(result.dbsToMigrate));
    assert.strictEqual(result.dbsToMigrate.length, 4);
    assert.strictEqual(result.migrateRoles, "True");
    assert.strictEqual(result.migrationId, "d3ceacbb-a5fd-43dc-a9db-6022b5154856");
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "True");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "False");
    assert.strictEqual(
      result.sourceDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/servers/examplesource",
    );
    assert.strictEqual(result.startDataMigration, "False");
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget",
    );
    assert.strictEqual(result.triggerCutover, "False");
    assert.strictEqual(result.tags?.key1624, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  });
});
