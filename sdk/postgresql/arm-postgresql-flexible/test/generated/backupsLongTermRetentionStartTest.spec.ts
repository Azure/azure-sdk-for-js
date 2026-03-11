// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("initiates a long term retention backup", () => {
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

  it("should initiates a long term retention backup for initiateALongTermRetentionBackup", async function () {
    const result = await client.backupsLongTermRetention.start(
      "exampleresourcegroup",
      "exampleserver",
      {
        backupSettings: { backupName: "exampleltrbackup" },
        targetDetails: { sasUriList: ["sasuri"] },
      },
    );
    assert.ok(result);
    assert.strictEqual(result.backupMetadata, "backupmetadata");
    assert.strictEqual(result.dataTransferredInBytes, 23);
    assert.strictEqual(result.datasourceSizeInBytes, 23);
    assert.strictEqual(result.endTime.getTime(), new Date("2025-06-01T18:35:22.123Z").getTime());
    assert.strictEqual(result.percentComplete, 100);
    assert.strictEqual(result.startTime.getTime(), new Date("2025-06-01T18:30:22.123Z").getTime());
    assert.strictEqual(result.status, "Running");
  });
});
