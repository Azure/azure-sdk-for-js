/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { env, Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";
import { HyperExecuteClient } from "@azure/arm-lambdatesthyperexecute";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("HyperExecute test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: HyperExecuteClient;

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new HyperExecuteClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });
  it("operations list test", async function () {
    const resArray = new Array();
    for await (let item of client.operations.list()) {
      resArray.push(item);
    }
    assert.notEqual(resArray.length, 0);
  });
});
