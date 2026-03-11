// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("updates an existing migration. The request body can contain one to many of the mutable properties present in the migration definition. Certain property updates initiate migration state transitions", () => {
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

  it("should updates an existing migration. The request body can contain one to many of the mutable properties present in the migration definition. Certain property updates initiate migration state transitions for updateAnExistingMigration", async function () {
    const result = await client.migrations.update(
      "exampleresourcegroup",
      "exampleserver",
      "examplemigration",
      { setupLogicalReplicationOnSourceDbIfNeeded: "True" },
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
      new Date("2025-06-01T20:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.overwriteDbsInTarget, "False");
    assert.strictEqual(result.setupLogicalReplicationOnSourceDbIfNeeded, "True");
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
});
