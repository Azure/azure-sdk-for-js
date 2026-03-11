// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets the results of a long retention backup operation for a server", () => {
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

  it("should gets the results of a long retention backup operation for a server for getTheResultsOfALongRetentionBackupOperationForAServer", async function () {
    const result = await client.backupsLongTermRetention.get(
      "exampleresourcegroup",
      "exampleserver",
      "exampleltrbackup",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "exampleltrbackup");
    assert.strictEqual(
      result.type,
      "Microsoft.DBforPostgreSQL/flexibleServers/ltrbackupOperations",
    );
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver",
    );
    assert.strictEqual(result.backupMetadata, "backupMetadata");
    assert.strictEqual(result.backupName, "exampleltrbackup");
    assert.strictEqual(result.dataTransferredInBytes, 9);
    assert.strictEqual(result.datasourceSizeInBytes, 21);
    assert.strictEqual(result.endTime.getTime(), new Date("2025-06-01T18:35:22.123Z").getTime());
    assert.strictEqual(result.percentComplete, 4);
    assert.strictEqual(result.startTime.getTime(), new Date("2025-06-01T18:30:22.123Z").getTime());
    assert.strictEqual(result.status, "Running");
  });
});
