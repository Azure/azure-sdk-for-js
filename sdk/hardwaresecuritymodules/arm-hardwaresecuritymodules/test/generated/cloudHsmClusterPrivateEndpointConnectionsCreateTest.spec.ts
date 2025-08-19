// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "../public/utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { AzureDedicatedHSMResourceProvider } from "../../src/index.js";

describe("creates or updates the private endpoint connection for the Cloud Hsm Cluster", () => {
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

  it("should creates or updates the private endpoint connection for the Cloud Hsm Cluster for cloudHsmClusterPrivateEndpointConnectionCreateMaximumSetGen", async function () {
    const result = await client.cloudHsmClusterPrivateEndpointConnections.create(
      "rgcloudhsm",
      "chsm1",
      "sample-pec",
      {
        properties: {
          privateLinkServiceConnectionState: {
            description: "My name is Joe and I'm approving this.",
            status: "Approved",
          },
        },
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "sample-pec");
    assert.strictEqual(
      result.type,
      "Microsoft.HardwareSecurityModules/cloudHsmClusters/privateEndpointConnections",
    );
    assert.strictEqual(
      result.id,
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgcloudhsm/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/chsm1/privateEndpointConnections/sample-pec",
    );
    assert.strictEqual(result.properties.provisioningState, "Succeeded");
    assert.strictEqual(result.systemData.createdAt, "2020-01-01T12:00:00.0000000Z");
    assert.strictEqual(result.systemData.createdBy, "User1");
    assert.strictEqual(result.systemData.createdByType, "User");
    assert.strictEqual(result.systemData.lastModifiedAt, "2020-01-01T12:00:00.0000000Z");
    assert.strictEqual(result.systemData.lastModifiedBy, "User2");
  });
});
