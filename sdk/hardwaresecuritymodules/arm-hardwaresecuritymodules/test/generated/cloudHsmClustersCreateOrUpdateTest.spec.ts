// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { AzureDedicatedHSMResourceProvider } from "../../src/index.js";

describe("create or Update a Cloud HSM Cluster in the specified subscription", () => {
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

  it("should create or Update a Cloud HSM Cluster in the specified subscription for cloudHsmClusterCreateOrUpdateMaximumSetGen", async function () {
    const result = await client.cloudHsmClusters.createOrUpdate("rgcloudhsm", "chsm1", {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-resources/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity-1":
            {},
        },
      },
      location: "eastus2",
      properties: { publicNetworkAccess: "Disabled" },
      sku: { name: "Standard_B1", family: "B" },
      tags: { Dept: "hsm", Environment: "dogfood" },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "chsm1");
    assert.strictEqual(result.type, "Microsoft.HardwareSecurityModules/cloudHsmClusters");
    assert.strictEqual(
      result.id,
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgcloudhsm/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/chsm1",
    );
    assert.strictEqual(result.identity.type, "UserAssigned");
    assert.strictEqual(result.location, "eastus2");
  });
});
