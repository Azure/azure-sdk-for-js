// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("regenerate a shared access key for a partner namespace", () => {
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

  it("should regenerate a shared access key for a partner namespace for partnerNamespacesRegenerateKey", async function () {
    const result = await client.partnerNamespaces.regenerateKey(
      "examplerg",
      "examplePartnerNamespaceName1",
      { keyName: "key1" },
    );
    assert.ok(result);
    assert.strictEqual(result.key1, "testKey1Value");
    assert.strictEqual(result.key2, "testKey2Value");
  });
});
