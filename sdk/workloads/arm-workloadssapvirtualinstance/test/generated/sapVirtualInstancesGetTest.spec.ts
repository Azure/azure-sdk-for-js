// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("gets a Virtual Instance for SAP solutions resource", () => {
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

  it("should gets a Virtual Instance for SAP solutions resource for sapVirtualInstancesGet", async function () {
    const result = await client.sapVirtualInstances.get("test-rg", "X00");
    assert.ok(result);
    assert.strictEqual(result.name, "X00");
    assert.strictEqual(result.type, "Microsoft.Workloads/sapVirtualInstances");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00",
    );
    assert.strictEqual(result.location, "westcentralus");
    assert.strictEqual(result.properties.environment, "Prod");
    assert.strictEqual(result.properties.health, "Healthy");
    assert.strictEqual(result.properties.provisioningState, "Succeeded");
  });

  it("should gets a Virtual Instance for SAP solutions resource for sapVirtualInstancesGetWithAcssInstallationBlocked", async function () {
    const result = await client.sapVirtualInstances.get("test-rg", "X00");
    assert.ok(result);
    assert.strictEqual(result.name, "X00");
    assert.strictEqual(result.type, "Microsoft.Workloads/sapVirtualInstances");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00",
    );
    assert.strictEqual(result.location, "westcentralus");
    assert.strictEqual(result.properties.environment, "Prod");
    assert.strictEqual(result.properties.health, "Healthy");
    assert.strictEqual(result.properties.provisioningState, "Succeeded");
  });
});
