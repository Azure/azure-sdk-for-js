// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets information of an on demand backup, given its name", () => {
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

  it("should gets information of an on demand backup, given its name for getAnOnDemandBackupGivenItsName", async function () {
    const result = await client.backupsAutomaticAndOnDemand.get(
      "exampleresourcegroup",
      "exampleserver",
      "backup_638830782181266873",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "backup_20250601T183022");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers/backups");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/backups/backup_638830782181266873",
    );
    assert.strictEqual(result.backupType, "Full");
    assert.strictEqual(
      result.completedTime.getTime(),
      new Date("2025-06-01T14:30:22.123456+00:00").getTime(),
    );
    assert.strictEqual(result.source, "Automatic");
  });
});
