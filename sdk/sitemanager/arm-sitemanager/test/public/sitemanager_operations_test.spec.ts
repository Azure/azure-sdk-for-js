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
import { EdgeClient } from "@azure/arm-sitemanager";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Sitemanager test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: EdgeClient;
  let resourceGroup: string;

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new EdgeClient(credential, subscriptionId, recorder.configureClientOptions({}));
    resourceGroup = "myjstest";
  });

  afterEach(async function () {
    await recorder.stop();
  });
  it("sites list test", async function () {
    const resArray = new Array();
    for await (let item of client.sites.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.ok(resArray);
  });
});
