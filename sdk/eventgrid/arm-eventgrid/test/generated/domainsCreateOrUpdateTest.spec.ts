// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("asynchronously creates or updates a new domain with the specified parameters", () => {
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

  it("should asynchronously creates or updates a new domain with the specified parameters for domainsCreateOrUpdate", async function () {
    const result = await client.domains.createOrUpdate("examplerg", "exampledomain1", {
      location: "westus2",
      inboundIpRules: [
        { action: "Allow", ipMask: "12.18.30.15" },
        { action: "Allow", ipMask: "12.18.176.1" },
      ],
      publicNetworkAccess: "Enabled",
      tags: { tag1: "value1", tag2: "value2" },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "exampledomain1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/domains");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/domains/exampledomain1",
    );
    assert.strictEqual(result.location, "westus2");
    assert.strictEqual(
      result.endpoint,
      "https://exampledomain1.westus2-1.eventgrid.azure.net/api/events",
    );
    assert.ok(Array.isArray(result.inboundIpRules));
    assert.strictEqual(result.inboundIpRules.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.publicNetworkAccess, "Enabled");
    assert.strictEqual(result.tags?.tag1, "value1");
    assert.strictEqual(result.tags?.tag2, "value2");
  });
});
