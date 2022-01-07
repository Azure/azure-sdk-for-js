// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Recorder } from "@azure-tools/test-recorder";
import { DeviceUpdateRestClient } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { assert } from "chai";

describe("device test", () => {
  let recorder: Recorder;
  let client: DeviceUpdateRestClient;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("list devices", async function() {
    const result = await client.path("/deviceupdate/{instanceId}/management/devices", "sdkinstance").get();
    if (result.status !== "200") {
      assert.fail(`GET "/deviceupdate/sdkinstance/management/devices" failed with ${result.status}`);
    }
  });
}).timeout(60000000000);
