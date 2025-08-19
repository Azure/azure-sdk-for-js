// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error", () => {
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

  it("should creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error for sapCentralServerInstancesCreate", async function () {
    const result = await client.sapCentralServerInstances.create(
      "test-rg",
      "X00",
      "centralServer",
      { location: "westcentralus", properties: {}, tags: {} },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "centralServer");
    assert.strictEqual(result.type, "Microsoft.Workloads/sapVirtualInstances/centralInstances");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00/centralInstances/centralServer",
    );
    assert.strictEqual(result.location, "westcentralus");
    assert.strictEqual(result.properties.health, "Healthy");
    assert.strictEqual(result.properties.instanceNo, "00");
  });

  it("should creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error for createSAPCentralInstancesForHASystemWithAvailabilitySet", async function () {
    const result = await client.sapCentralServerInstances.create(
      "test-rg",
      "X00",
      "centralServer",
      { location: "westcentralus", properties: {}, tags: {} },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "centralServer");
    assert.strictEqual(result.type, "Microsoft.Workloads/sapVirtualInstances/centralInstances");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00/centralInstances/centralServer",
    );
    assert.strictEqual(result.location, "westcentralus");
    assert.strictEqual(result.properties.health, "Healthy");
    assert.strictEqual(result.properties.instanceNo, "00");
  });
});
