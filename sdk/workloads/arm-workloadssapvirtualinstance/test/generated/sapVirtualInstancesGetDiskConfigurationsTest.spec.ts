// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { WorkloadsClient } from "../../src/index.js";

describe("get the SAP Disk Configuration Layout prod/non-prod SAP System", () => {
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

  it("should get the SAP Disk Configuration Layout prod/non-prod SAP System for sapDiskConfigurationsForInputEnvironmentNonProd", async function () {
    const result = await client.sapVirtualInstances.getDiskConfigurations("centralus", {
      appLocation: "eastus",
      sapProduct: "S4HANA",
      environment: "NonProd",
      databaseType: "HANA",
      deploymentType: "ThreeTier",
      dbVmSku: "Standard_M32ts",
    });
    assert.ok(result);
  });

  it("should get the SAP Disk Configuration Layout prod/non-prod SAP System for sapDiskConfigurationsForInputEnvironmentProd", async function () {
    const result = await client.sapVirtualInstances.getDiskConfigurations("centralus", {
      appLocation: "eastus",
      sapProduct: "S4HANA",
      environment: "Prod",
      databaseType: "HANA",
      deploymentType: "ThreeTier",
      dbVmSku: "Standard_M32ts",
    });
    assert.ok(result);
  });
});
