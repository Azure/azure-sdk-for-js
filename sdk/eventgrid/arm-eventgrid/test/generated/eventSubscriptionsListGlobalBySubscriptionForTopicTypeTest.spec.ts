// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("list all global event subscriptions under an Azure subscription for a topic type", () => {
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

  it("should list all global event subscriptions under an Azure subscription for a topic type for eventSubscriptionsListGlobalBySubscriptionForTopicType", async function () {
    const resArray = new Array();
    for await (const item of client.eventSubscriptions.listGlobalBySubscriptionForTopicType(
      "Microsoft.Resources.Subscriptions",
    )) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 1);
    assert.strictEqual(resArray[0].name, "examplesubscription3");
    assert.strictEqual(resArray[0].type, "Microsoft.EventGrid/eventSubscriptions");
    assert.strictEqual(
      resArray[0].id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription3",
    );
  });
});
