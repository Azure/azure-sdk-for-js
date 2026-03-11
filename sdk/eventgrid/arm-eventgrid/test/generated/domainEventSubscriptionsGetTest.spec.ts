// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get properties of an event subscription of a domain", () => {
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

  it("should get properties of an event subscription of a domain for domainEventSubscriptionsGet", async function () {
    const result = await client.domainEventSubscriptions.get(
      "examplerg",
      "exampleDomain1",
      "examplesubscription1",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplesubscription1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/domains/eventSubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/domains/exampleDomain1/eventSubscriptions/examplesubscription1",
    );
    assert.strictEqual(result.eventDeliverySchema, "EventGridSchema");
    assert.ok(Array.isArray(result.labels));
    assert.strictEqual(result.labels.length, 2);
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.topic,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/domains/exampleDomain1",
    );
  });
});
