/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
* Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  env,
  Recorder,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";
import { CdnClient } from "../../src/cdnClient.js";
import * as logger from '@azure/logger';  

  

logger.setLogLevel('verbose');  

 
export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("CdnClient test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: CdnClient;

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || '';
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new CdnClient(credential, subscriptionId, recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("edgeActions create test", async function () {
    const resourceGroupName = "SSS3PT_myjstest";
    const edgeActionName = "testedgeaction";
    const result = await client.edgeActions.create(
      resourceGroupName,
      edgeActionName,
      {
        location: "global",
        sku: { name: "Standard", tier: "Standard" },
      },
      testPollingOptions,
    );
    assert.isNotNull(result);
  });

  it("edgeActionVersions create test", async function () {
    const resourceGroupName = "SSS3PT_myjstest";
    const edgeActionName = "testedgeaction";
    const version = "version1";
    const result = await client.edgeActionVersions.create(
      resourceGroupName,
      edgeActionName,
      version,
      {
        location: "global",
        properties: { deploymentType: "zip", isDefaultVersion: "True" },
      },
      testPollingOptions,
    );
    assert.isNotNull(result);
  });

  
  it.only("edgeActionVersions swapDefault test", async function () {
    const resourceGroupName = "SSS3PT_myjstest";
    const edgeActionName = "testedgeaction";
    const version = "version1";
    const result = await client.edgeActionVersions.swapDefault(
      resourceGroupName,
      edgeActionName,
      version,
      testPollingOptions,
    );
    assert.isUndefined(result);
  });
})
