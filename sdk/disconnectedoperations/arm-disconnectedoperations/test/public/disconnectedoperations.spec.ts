// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { DisconnectedOperationsManagementClient } from "../../src/index.js";

describe("My test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: DisconnectedOperationsManagementClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    const credential = createTestCredential();
    client = new DisconnectedOperationsManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it.skip("operations list test", async function () {
    const resArray = new Array();
    for await (const item of client.disconnectedOperations.listBySubscription()) {
      resArray.push(item);
    }
    assert.ok(resArray);
  });
});
