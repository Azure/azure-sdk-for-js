// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("stops the SAP Application Server Instance", () => {
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

  it("should stops the SAP Application Server Instance for stopTheSAPApplicationServerInstance", async function () {
    const result = await client.sapApplicationServerInstances.stop("test-rg", "X00", "app01", {
      body: { softStopTimeoutSeconds: 0 },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "app01");
    assert.strictEqual(result.endTime, "2021-08-19T03:38:07.000Z");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00/applicationInstances/app01",
    );
    assert.strictEqual(result.startTime, "2021-08-19T03:36:07.000Z");
    assert.strictEqual(result.status, "Succeeded");
  });

  it("should stops the SAP Application Server Instance for stopTheSAPApplicationServerInstanceAndItSInfrastructure", async function () {
    const result = await client.sapApplicationServerInstances.stop("test-rg", "X00", "app01", {
      body: { deallocateVm: true, softStopTimeoutSeconds: 0 },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "app01");
    assert.strictEqual(result.endTime, "2021-08-19T03:38:07.000Z");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00/applicationInstances/app01",
    );
    assert.strictEqual(result.startTime, "2021-08-19T03:36:07.000Z");
    assert.strictEqual(result.status, "Succeeded");
  });

  it("should stops the SAP Application Server Instance for softStopTheSAPApplicationServerInstance", async function () {
    const result = await client.sapApplicationServerInstances.stop("test-rg", "X00", "app01", {
      body: { softStopTimeoutSeconds: 300 },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "app01");
    assert.strictEqual(result.endTime, "2021-08-19T03:38:07.000Z");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00/applicationInstances/app01",
    );
    assert.strictEqual(result.startTime, "2021-08-19T03:36:07.000Z");
    assert.strictEqual(result.status, "Succeeded");
  });

  it("should stops the SAP Application Server Instance for softStopTheSAPApplicationServerInstanceAndItSInfrastructure", async function () {
    const result = await client.sapApplicationServerInstances.stop("test-rg", "X00", "app01", {
      body: { deallocateVm: true, softStopTimeoutSeconds: 300 },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "app01");
    assert.strictEqual(result.endTime, "2021-08-19T03:38:07.000Z");
    assert.strictEqual(
      result.id,
      "/subscriptions/6d875e77-e412-4d7d-9af4-8895278b4443/resourceGroups/test-rg/providers/Microsoft.Workloads/sapVirtualInstances/X00/applicationInstances/app01",
    );
    assert.strictEqual(result.startTime, "2021-08-19T03:36:07.000Z");
    assert.strictEqual(result.status, "Succeeded");
  });
});
