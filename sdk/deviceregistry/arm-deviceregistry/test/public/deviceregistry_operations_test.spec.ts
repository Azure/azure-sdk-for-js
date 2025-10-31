/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";
import { DeviceRegistryManagementClient } from "../../src/deviceRegistryManagementClient.js";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("DeviceRegistry test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: DeviceRegistryManagementClient;
  let location: string;
  let resourceGroup: string;
  let assetEndpointProfileName: string;
  let customlocationsName: string;

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new DeviceRegistryManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    location = "";
    resourceGroup = "";
    assetEndpointProfileName = "";
    customlocationsName = "";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("operations list test", async () => {
    const resArray = new Array();
    for await (const item of client.operations.list()) {
      resArray.push(item);
    }
    assert.notEqual(resArray.length, 0);
  });

  it.only("assetEndpointProfiles createOrReplace test", async () => {
    const result = await client.assetEndpointProfiles.createOrReplace(
      resourceGroup,
      assetEndpointProfileName,
      {
        location: location,
        extendedLocation: {
          type: "CustomLocation",
          name: `/subscriptions/${subscriptionId}/resourcegroups/${resourceGroup}/providers/microsoft.extendedlocation/customlocations/${customlocationsName}`,
        },
        tags: { },
        properties: {

        },
      },
      testPollingOptions,
    );
    assert.equal(result.name, assetEndpointProfileName);
  });

  it.only("assetEndpointProfiles update test", async () => {
    const poller = client.assetEndpointProfiles.update(
      resourceGroup,
      assetEndpointProfileName,
      {
        tags: { },
        properties: {
          
        },
      },
      testPollingOptions,
    );

    const result = await poller.pollUntilDone();
    assert.equal(result.name, assetEndpointProfileName);
  });
});
