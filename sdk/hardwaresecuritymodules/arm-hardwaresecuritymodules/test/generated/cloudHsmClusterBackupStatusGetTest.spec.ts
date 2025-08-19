// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { AzureDedicatedHSMResourceProvider } from "../../src/index.js";

describe("gets the backup operation status of the specified Cloud HSM Cluster", () => {
  let recorder: Recorder;
  let client: AzureDedicatedHSMResourceProvider;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new AzureDedicatedHSMResourceProvider(
      credential,
      subscriptionId,
      clientOptions,
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should gets the backup operation status of the specified Cloud HSM Cluster for cloudHsmClusterGetBackupStatusMaximumSetGen", async function () {
    const result = await client.cloudHsmClusterBackupStatus.get(
      "rgcloudhsm",
      "chsm1",
      "572a45927fc240e1ac075de27371680b",
    );
    assert.ok(result);
    assert.strictEqual(
      result.properties.azureStorageBlobContainerUri,
      "https://myaccount.blob.core.windows.net/sascontainer/sasContainer",
    );
    assert.strictEqual(
      result.properties.endTime,
      "2022-09-12T12:00:00.0000000Z",
    );
    assert.strictEqual(
      result.properties.jobId,
      "572a45927fc240e1ac075de27371680b",
    );
    assert.strictEqual(
      result.properties.startTime,
      "2022-09-12T12:00:00.0000000Z",
    );
    assert.strictEqual(result.properties.status, "InProgress");
  });
});
