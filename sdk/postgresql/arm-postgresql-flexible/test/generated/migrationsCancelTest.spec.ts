// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("cancels an active migration", () => {
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

  it("should cancels an active migration for cancelAnActiveMigration", async function () {
    const result = await client.migrations.cancel(
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
    assert.strictEqual(result.location, "East US");
    assert.ok(Array.isArray(result.dbsToMigrate));
    assert.strictEqual(result.dbsToMigrate.length, 4);
    assert.strictEqual(result.migrateRoles, "False");
    assert.strictEqual(result.migrationId, "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
    assert.strictEqual(result.migrationMode, "Offline");
    assert.strictEqual(result.migrationOption, "ValidateAndMigrate");
    assert.strictEqual(
      result.migrationWindowStartTimeInUtc.getTime(),
      new Date("2025-06-01T18:30:22.12345Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "True");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "True");
    assert.strictEqual(
      result.sourceDbServerResourceId,
      "examplesource:5432@exampleadministratorlogin",
    );
    assert.strictEqual(result.sourceType, "OnPremises");
    assert.strictEqual(result.sslMode, "Prefer");
    assert.strictEqual(
      result.targetDbServerResourceId,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBForPostgreSql/flexibleServers/exampletarget",
    );
    assert.strictEqual(result.triggerCutover, "True");
  });
});
