// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("gets the sizing recommendations", () => {
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

  it("should gets the sizing recommendations for sapSizingRecommendationsForNonHADistributedSystem", async function () {
    const result = await client.sapVirtualInstances.getSizingRecommendations("centralus", {
      appLocation: "eastus",
      environment: "Prod",
      sapProduct: "S4HANA",
      deploymentType: "ThreeTier",
      saps: 20000,
      dbMemory: 1024,
      databaseType: "HANA",
      dbScaleMethod: "ScaleUp",
    });
    assert.ok(result);
    assert.strictEqual(result.deploymentType, "ThreeTier");
    assert.strictEqual(result.applicationServerVmSku, "Standard_E8ds_v4");
    assert.strictEqual(result.applicationServerInstanceCount, 2);
    assert.strictEqual(result.centralServerVmSku, "Standard_E4ds_v4");
    assert.strictEqual(result.centralServerInstanceCount, 1);
  });

  it("should gets the sizing recommendations for sapSizingRecommendationsForHAWithAvailabilitySet", async function () {
    const result = await client.sapVirtualInstances.getSizingRecommendations("centralus", {
      appLocation: "eastus",
      environment: "Prod",
      sapProduct: "S4HANA",
      deploymentType: "ThreeTier",
      saps: 75000,
      dbMemory: 1024,
      databaseType: "HANA",
      dbScaleMethod: "ScaleUp",
      highAvailabilityType: "AvailabilitySet",
    });
    assert.ok(result);
    assert.strictEqual(result.deploymentType, "ThreeTier");
    assert.strictEqual(result.applicationServerVmSku, "Standard_E16ds_v4");
    assert.strictEqual(result.applicationServerInstanceCount, 3);
    assert.strictEqual(result.centralServerVmSku, "Standard_E8ds_v4");
    assert.strictEqual(result.centralServerInstanceCount, 2);
  });

  it("should gets the sizing recommendations for sapSizingRecommendationsForHAWithAvailabilityZone", async function () {
    const result = await client.sapVirtualInstances.getSizingRecommendations("centralus", {
      appLocation: "eastus",
      environment: "Prod",
      sapProduct: "S4HANA",
      deploymentType: "ThreeTier",
      saps: 75000,
      dbMemory: 1024,
      databaseType: "HANA",
      dbScaleMethod: "ScaleUp",
      highAvailabilityType: "AvailabilityZone",
    });
    assert.ok(result);
    assert.strictEqual(result.deploymentType, "ThreeTier");
    assert.strictEqual(result.applicationServerVmSku, "Standard_E8ds_v4");
    assert.strictEqual(result.applicationServerInstanceCount, 6);
    assert.strictEqual(result.centralServerVmSku, "Standard_E4ds_v4");
    assert.strictEqual(result.centralServerInstanceCount, 2);
  });

  it("should gets the sizing recommendations for sapSizingRecommendationsForSingleServer", async function () {
    const result = await client.sapVirtualInstances.getSizingRecommendations("centralus", {
      appLocation: "eastus",
      environment: "NonProd",
      sapProduct: "S4HANA",
      deploymentType: "SingleServer",
      saps: 60000,
      dbMemory: 2000,
      databaseType: "HANA",
      dbScaleMethod: "ScaleUp",
    });
    assert.ok(result);
    assert.strictEqual(result.vmSku, "Standard_M128s");
    assert.strictEqual(result.deploymentType, "SingleServer");
  });
});
