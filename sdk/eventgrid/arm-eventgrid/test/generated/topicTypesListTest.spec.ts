// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("list all registered topic types", () => {
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

  it("should list all registered topic types for topicTypesList", async function () {
    const resArray = new Array();
    for await (const item of client.topicTypes.list()) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 2);
    assert.strictEqual(resArray[0].name, "Microsoft.Eventhub.Namespaces");
    assert.strictEqual(resArray[0].type, "Microsoft.EventGrid/topicTypes");
    assert.strictEqual(
      resArray[0].id,
      "/providers/Microsoft.EventGrid/topicTypes/Microsoft.Eventhub.Namespaces",
    );
  });
});
