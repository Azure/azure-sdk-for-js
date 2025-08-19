// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("get the recommended SAP Availability Zone Pair Details for your region", () => {
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

  it("should get the recommended SAP Availability Zone Pair Details for your region for sapAvailabilityZoneDetailsInEastUs", async function () {
    const result = await client.sapVirtualInstances.getAvailabilityZoneDetails("eastus", {
      appLocation: "eastus",
      sapProduct: "S4HANA",
      databaseType: "HANA",
    });
    assert.ok(result);
    assert.ok(Array.isArray(result.availabilityZonePairs));
    assert.strictEqual(result.availabilityZonePairs.length, 1);
  });

  it("should get the recommended SAP Availability Zone Pair Details for your region for sapAvailabilityZoneDetailsInNorthEurope", async function () {
    const result = await client.sapVirtualInstances.getAvailabilityZoneDetails("northeurope", {
      appLocation: "northeurope",
      sapProduct: "S4HANA",
      databaseType: "HANA",
    });
    assert.ok(result);
    assert.ok(Array.isArray(result.availabilityZonePairs));
    assert.strictEqual(result.availabilityZonePairs.length, 1);
  });
});
