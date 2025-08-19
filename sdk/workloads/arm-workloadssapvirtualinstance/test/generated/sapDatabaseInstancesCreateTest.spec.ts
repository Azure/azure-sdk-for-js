// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error", () => {
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

  it("should creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error for sapDatabaseInstancesCreate", async function () {
    const result = await client.sapDatabaseInstances.create("test-rg", "X00", "databaseServer", {
      location: "westcentralus",
      properties: {},
      tags: {},
    });
    assert.ok(result);
    assert.strictEqual(result.name, "databaseServer");
    assert.strictEqual(result.type, "Microsoft.Workloads/sapVirtualInstances/databaseInstances");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00/databaseInstances/databaseServer",
    );
    assert.strictEqual(result.location, "westcentralus");
    assert.strictEqual(result.properties.databaseSid, "X00");
    assert.strictEqual(result.properties.databaseType, "hdb");
    assert.strictEqual(result.properties.ipAddress, "10.0.0.5");
    assert.strictEqual(result.properties.provisioningState, "Succeeded");
    assert.strictEqual(result.properties.status, "Running");
  });

  it("should creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error for createSAPDatabaseInstancesForHASystemWithAvailabilitySet", async function () {
    const result = await client.sapDatabaseInstances.create("test-rg", "X00", "databaseServer", {
      location: "westcentralus",
      properties: {},
      tags: {},
    });
    assert.ok(result);
    assert.strictEqual(result.name, "databaseServer");
    assert.strictEqual(result.type, "Microsoft.Workloads/sapVirtualInstances/databaseInstances");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00/databaseInstances/databaseServer",
    );
    assert.strictEqual(result.location, "westcentralus");
    assert.strictEqual(result.properties.databaseSid, "X00");
    assert.strictEqual(result.properties.databaseType, "hdb");
    assert.strictEqual(result.properties.ipAddress, "10.0.0.5");
    assert.strictEqual(result.properties.provisioningState, "Succeeded");
  });
});
