// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("update an existing event subscription of a namespace topic", () => {
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

  it("should update an existing event subscription of a namespace topic for namespaceTopicEventSubscriptionsUpdate", async function () {
    const result = await client.namespaceTopicEventSubscriptions.update(
      "examplerg",
      "exampleNamespaceName1",
      "exampleNamespaceTopicName1",
      "exampleNamespaceTopicEventSubscriptionName1",
      {
        deliveryConfiguration: {
          deliveryMode: "Queue",
          queue: { eventTimeToLive: "P1D", maxDeliveryCount: 3, receiveLockDurationInSeconds: 60 },
        },
        eventDeliverySchema: "CloudEventSchemaV1_0",
      },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "exampleNamespaceTopicEventSubscriptionName1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/namespaces/topics/eventsubscriptions");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/namespaces/examplenamespace2/topics/exampleNamespaceTopicName1/eventSubscriptions/exampleNamespaceTopicEventSubscriptionName1",
    );
    assert.strictEqual(result.eventDeliverySchema, "CloudEventSchemaV1_0");
    assert.strictEqual(result.provisioningState, "Succeeded");
  });
});
