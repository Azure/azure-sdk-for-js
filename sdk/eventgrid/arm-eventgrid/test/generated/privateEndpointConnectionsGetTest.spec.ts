// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get a specific private endpoint connection under a topic, domain, or partner namespace or namespace", () => {
  let recorder: Recorder;
  let client: EventGridManagementClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new EventGridManagementClient(credential, subscriptionId, clientOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should get a specific private endpoint connection under a topic, domain, or partner namespace or namespace for privateEndpointConnectionsGet", async function () {
    const result = await client.privateEndpointConnections.get(
      "examplerg",
      "topics",
      "exampletopic1",
      "BMTPE5.8A30D251-4C61-489D-A1AA-B37C4A329B8B",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "BMTPE5.8A30D251-4C61-489D-A1AA-B37C4A329B8B");
    assert.strictEqual(result.type, "Microsoft.EventGrid/topics/privateEndpointConnections");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1/privateEndpointConnections/BMTPE5.8A30D251-4C61-489D-A1AA-B37C4A329B8B",
    );
    assert.ok(Array.isArray(result.groupIds));
    assert.strictEqual(result.groupIds.length, 1);
    assert.strictEqual(result.provisioningState, "Succeeded");
  });
});
