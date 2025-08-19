// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { AzureDedicatedHSMResourceProvider } from "../../src/index.js";

describe("the List operation gets information about the Cloud HSM Clusters associated with the subscription", () => {
  let recorder: Recorder;
  let client: AzureDedicatedHSMResourceProvider;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId, clientOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should the List operation gets information about the Cloud HSM Clusters associated with the subscription for cloudHsmClusterListBySubscriptionMaximumSetGen", async function () {
    const resArray = new Array();
    for await (const item of client.cloudHsmClusters.listBySubscription()) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 2);
    assert.strictEqual(resArray[0].name, "chsm1");
    assert.strictEqual(resArray[0].type, "Microsoft.HardwareSecurityModules/cloudHsmClusters");
    assert.strictEqual(
      resArray[0].id,
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgcloudhsm/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/chsm1",
    );
    assert.strictEqual(resArray[0].location, "eastus2");
  });
});
