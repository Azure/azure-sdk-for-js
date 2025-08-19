// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("puts the SAP Application Server Instance resource", () => {
  let recorder: Recorder;
  let client: WorkloadsClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new WorkloadsClient(credential, subscriptionId, clientOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should puts the SAP Application Server Instance resource for sapApplicationServerInstancesUpdate", async function () {
    const result = await client.sapApplicationServerInstances.update("test-rg", "X00", "app01", {
      tags: { tag1: "value1" },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "app01");
    assert.strictEqual(result.type, "Microsoft.Workloads/sapVirtualInstances/applicationInstances");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00/applicationInstances/app01",
    );
    assert.strictEqual(result.location, "westcentralus");
    assert.strictEqual(result.properties.dispatcherStatus, "Running");
    assert.strictEqual(result.properties.gatewayPort, 3300);
    assert.strictEqual(result.properties.health, "Healthy");
    assert.strictEqual(result.properties.hostname, "vh-nw1");
    assert.strictEqual(result.properties.icmHttpPort, 3312);
  });
});
