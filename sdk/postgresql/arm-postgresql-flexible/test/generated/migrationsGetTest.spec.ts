// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets information about a migration", () => {
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

  it("should gets information about a migration for getInformationAboutAMigration", async function () {
    const result = await client.migrations.get(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
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
  });

  it("should gets information about a migration for getInformationAboutAMigrationWithSuccessfulValidationAndSuccessfulMigration", async function () {
    const result = await client.migrations.get(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
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
    assert.strictEqual(result.dbsToMigrate.length, 1);
    assert.strictEqual(result.migrateRoles, "False");
    assert.strictEqual(result.migrationId, "f2354e72-2828-4a19-ad20-b4cd9e2673c1");
    assert.strictEqual(result.migrationMode, "Offline");
    assert.strictEqual(result.migrationOption, "ValidateAndMigrate");
    assert.strictEqual(
      result.migrationWindowEndTimeInUtc.getTime(),
      new Date("2025-06-01T20:30:22.123456Z").getTime(),
    );
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "True");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "True");
    assert.strictEqual(result.sourceDbServerResourceId, "20.228.214.65:5432@postgres");
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget",
    );
    assert.strictEqual(result.triggerCutover, "True");
  });

  it("should gets information about a migration for getInformationAboutAMigrationWithSuccessfulValidationButFailedMigration", async function () {
    const result = await client.migrations.get(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
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
    assert.strictEqual(result.dbsToMigrate.length, 1);
    assert.strictEqual(result.migrateRoles, "False");
    assert.strictEqual(result.migrationId, "da52db29-cfeb-4670-a1ad-683edb14c621");
    assert.strictEqual(result.migrationMode, "Offline");
    assert.strictEqual(result.migrationOption, "ValidateAndMigrate");
    assert.strictEqual(
      result.migrationWindowEndTimeInUtc.getTime(),
      new Date("2025-06-01T20:30:22.123456Z").getTime(),
    );
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "True");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "True");
    assert.strictEqual(
      result.sourceDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/servers/examplesource",
    );
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampletarget",
    );
  });

  it("should gets information about a migration for getInformationAboutAMigrationWithSuccessfulValidationOnly", async function () {
    const result = await client.migrations.get(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
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
    assert.strictEqual(result.dbsToMigrate.length, 1);
    assert.strictEqual(result.migrateRoles, "False");
    assert.strictEqual(result.migrationId, "77840327-7be8-44b8-adc0-af0ccccfeb36");
    assert.strictEqual(result.migrationMode, "Offline");
    assert.strictEqual(result.migrationOption, "Validate");
    assert.strictEqual(
      result.migrationWindowEndTimeInUtc.getTime(),
      new Date("2025-06-01T20:30:22.123456Z").getTime(),
    );
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "True");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "True");
    assert.strictEqual(result.sourceDbServerResourceId, "20.228.214.65:5432@postgres");
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget",
    );
    assert.strictEqual(result.triggerCutover, "True");
  });

  it("should gets information about a migration for getInformationAboutAMigrationWithValidationFailures", async function () {
    const result = await client.migrations.get(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplemigration");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers/migrations");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampletarget/migrations/examplemigration",
    );
    assert.strictEqual(result.location, "eastus");
    assert.ok(Array.isArray(result.dbsToMigrate));
    assert.strictEqual(result.dbsToMigrate.length, 7);
    assert.strictEqual(result.migrateRoles, "False");
    assert.strictEqual(result.migrationId, "a3e2d3cc-b139-4201-9431-e4f3003140fd");
    assert.strictEqual(result.migrationMode, "Offline");
    assert.strictEqual(result.migrationOption, "Validate");
    assert.strictEqual(
      result.migrationWindowEndTimeInUtc.getTime(),
      new Date("2025-06-01T20:30:22.123456Z").getTime(),
    );
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "True");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "True");
    assert.strictEqual(result.sourceDbServerResourceId, "20.228.214.65:5432@postgres");
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampletarget",
    );
    assert.strictEqual(result.triggerCutover, "True");
  });
});
