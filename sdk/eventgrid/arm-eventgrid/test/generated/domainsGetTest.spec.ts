// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get properties of a domain", () => {
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

  it("should get properties of a domain for domainsGet", async function () {
    const result = await client.domains.get("examplerg", "exampledomain2");
    assert.ok(result);
    assert.strictEqual(result.name, "exampledomain2");
    assert.strictEqual(result.type, "Microsoft.EventGrid/domains");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/domains/exampledomain2",
    );
    assert.strictEqual(result.location, "westcentralus");
    assert.strictEqual(
      result.endpoint,
      "https://exampledomain2.westcentralus-1.eventgrid.azure.net/api/events",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.tags?.tag1, "value1");
    assert.strictEqual(result.tags?.tag2, "value2");
  });
});
