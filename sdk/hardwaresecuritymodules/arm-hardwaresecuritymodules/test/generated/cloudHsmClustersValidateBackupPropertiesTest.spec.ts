// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { AzureDedicatedHSMResourceProvider } from "../../src/index.js";

describe("pre Backup operation to validate whether the customer can perform a backup on the Cloud HSM Cluster resource in the specified subscription", () => {
  let recorder: Recorder;
  let client: AzureDedicatedHSMResourceProvider;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId, clientOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should pre Backup operation to validate whether the customer can perform a backup on the Cloud HSM Cluster resource in the specified subscription for cloudHsmClusterValidateBackupValidationMaximumSetGen", async function () {
    const result = await client.cloudHsmClusters.validateBackupProperties("rgcloudhsm", "chsm1", {
      backupRequestProperties: {
        azureStorageBlobContainerUri:
          "https://myaccount.blob.core.windows.net/sascontainer/sasContainer",
        token: "se=2018-02-01T00%3A00Z&spr=https&sv=2017-04-17&sr=b&sig=REDACTED",
      },
    });
    assert.ok(result);
    assert.strictEqual(
      result.properties.azureStorageBlobContainerUri,
      "https://myaccount.blob.core.windows.net/sascontainer/sasContainer",
    );
    assert.strictEqual(result.properties.endTime, "2022-09-12T12:00:00.0000000Z");
    assert.strictEqual(result.properties.jobId, "572a45927fc240e1ac075de27371680b");
    assert.strictEqual(result.properties.startTime, "2022-09-12T12:00:00.0000000Z");
    assert.strictEqual(result.properties.status, "InProgress");
  });
});
