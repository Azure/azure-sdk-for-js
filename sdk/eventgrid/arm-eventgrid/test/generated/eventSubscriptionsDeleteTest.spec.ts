// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { beforeEach, afterEach, it, describe } from "vitest";

describe("delete an existing event subscription", () => {
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

  it("should delete an existing event subscription for eventSubscriptionsDeleteForCustomTopic", async function () {
    await client.eventSubscriptions.delete(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
      "examplesubscription1",
    );
    /* Test passes if no exception is thrown */
  });

  it("should delete an existing event subscription for eventSubscriptionsDeleteForResource", async function () {
    await client.eventSubscriptions.delete(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventHub/namespaces/examplenamespace1",
      "examplesubscription10",
    );
    /* Test passes if no exception is thrown */
  });

  it("should delete an existing event subscription for eventSubscriptionsDeleteForResourceGroup", async function () {
    await client.eventSubscriptions.delete(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg",
      "examplesubscription2",
    );
    /* Test passes if no exception is thrown */
  });

  it("should delete an existing event subscription for eventSubscriptionsDeleteForSubscription", async function () {
    await client.eventSubscriptions.delete(
      "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40",
      "examplesubscription3",
    );
    /* Test passes if no exception is thrown */
  });
});
