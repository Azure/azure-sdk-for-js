// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("get a list of SAP supported SKUs for ASCS, Application and Database tier", () => {
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

  it("should get a list of SAP supported SKUs for ASCS, Application and Database tier for sapSupportedSKUsForDistributedNonHAEnvironment", async function () {
    const result = await client.sapVirtualInstances.getSapSupportedSku("centralus", {
      appLocation: "eastus",
      sapProduct: "S4HANA",
      environment: "Prod",
      databaseType: "HANA",
      deploymentType: "ThreeTier",
    });
    assert.ok(result);
    assert.ok(Array.isArray(result.supportedSkus));
    assert.strictEqual(result.supportedSkus.length, 18);
  });

  it("should get a list of SAP supported SKUs for ASCS, Application and Database tier for sapSupportedSKUsForDistributedHAEnvironmentWithAvailabilitySet", async function () {
    const result = await client.sapVirtualInstances.getSapSupportedSku("centralus", {
      appLocation: "eastus",
      sapProduct: "S4HANA",
      environment: "Prod",
      databaseType: "HANA",
      deploymentType: "ThreeTier",
      highAvailabilityType: "AvailabilitySet",
    });
    assert.ok(result);
    assert.ok(Array.isArray(result.supportedSkus));
    assert.strictEqual(result.supportedSkus.length, 18);
  });

  it("should get a list of SAP supported SKUs for ASCS, Application and Database tier for sapSupportedSkusForHAWithAvailabilityZone", async function () {
    const result = await client.sapVirtualInstances.getSapSupportedSku("centralus", {
      appLocation: "eastus",
      sapProduct: "S4HANA",
      environment: "Prod",
      databaseType: "HANA",
      deploymentType: "ThreeTier",
      highAvailabilityType: "AvailabilityZone",
    });
    assert.ok(result);
    assert.ok(Array.isArray(result.supportedSkus));
    assert.strictEqual(result.supportedSkus.length, 14);
  });

  it("should get a list of SAP supported SKUs for ASCS, Application and Database tier for sapSupportedSKUsForSingleServer", async function () {
    const result = await client.sapVirtualInstances.getSapSupportedSku("centralus", {
      appLocation: "eastus",
      sapProduct: "S4HANA",
      environment: "NonProd",
      databaseType: "HANA",
      deploymentType: "SingleServer",
    });
    assert.ok(result);
    assert.ok(Array.isArray(result.supportedSkus));
    assert.strictEqual(result.supportedSkus.length, 4);
  });
});
