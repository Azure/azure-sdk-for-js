// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("lists the virtual network subnet usage for a given virtual network", () => {
  let recorder: Recorder;
  let client: PostgreSQLManagementFlexibleServerClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new PostgreSQLManagementFlexibleServerClient(
      credential,
      subscriptionId,
      clientOptions,
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should lists the virtual network subnet usage for a given virtual network for listTheVirtualNetworkSubnetUsageForAGivenVirtualNetwork", async function () {
    const result = await client.virtualNetworkSubnetUsage.list("eastus", {
      virtualNetworkArmResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.Network/virtualNetworks/examplevirtualnetwork",
    });
    assert.ok(result);
    assert.ok(Array.isArray(result.delegatedSubnetsUsage));
    assert.strictEqual(result.delegatedSubnetsUsage.length, 2);
    assert.strictEqual(result.location, "eastus");
    assert.strictEqual(result.subscriptionId, "ffffffff-ffff-ffff-ffff-ffffffffffff");
  });
});
