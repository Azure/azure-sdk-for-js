// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("updates a Virtual Instance for SAP solutions resource", () => {
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

  it("should updates a Virtual Instance for SAP solutions resource for sapVirtualInstancesUpdate", async function () {
    const result = await client.sapVirtualInstances.update("test-rg", "X00", {
      identity: { type: "None" },
      properties: {},
      tags: { key1: "svi1" },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "X00");
    assert.strictEqual(result.type, "Microsoft.Workloads/sapVirtualInstances");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00",
    );
    assert.strictEqual(result.identity.type, "None");
    assert.strictEqual(result.location, "westcentralus");
  });

  it("should updates a Virtual Instance for SAP solutions resource for sapVirtualInstancesTrustedAccessEnableUpdate", async function () {
    const result = await client.sapVirtualInstances.update("test-rg", "X00", {
      identity: { type: "None" },
      properties: { managedResourcesNetworkAccessType: "Private" },
      tags: { key1: "svi1" },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "X00");
    assert.strictEqual(result.type, "Microsoft.Workloads/sapVirtualInstances");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00",
    );
    assert.strictEqual(result.identity.type, "None");
    assert.strictEqual(result.location, "westcentralus");
  });
});
