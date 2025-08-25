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
import { BicepClient } from "@azure/arm-resourcesbicep";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Bicep test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: BicepClient;

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new BicepClient(credential, subscriptionId, recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("decompileOperationGroup bicep test", async function () {
    const res = await client.decompileOperationGroup.bicep({
      template:
        '{\r\n "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",\r\n "contentVersion": "1.0.0.0",\r\n "metadata": {\r\n "_generator": {\r\n "name": "bicep",\r\n "version": "0.15.31.15270",\r\n "templateHash": "9249505596133208719"\r\n }\r\n },\r\n "parameters": {\r\n "storageAccountName": {\r\n "type": "string"\r\n }\r\n },\r\n "resources": []\r\n}',
    });
    assert.ok(res);
  });
});
