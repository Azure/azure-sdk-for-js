// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DeviceUpdateRestClient } from "../../src";
import { Context } from "mocha";
import { assert } from "chai";
import { Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient, startRecorder } from "./utils/recordedClient";

describe("device test", () => {
  let recorder: Recorder;
  let client: DeviceUpdateRestClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await startRecorder(recorder);
    client = createRecordedClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("list devices", async function () {
    const result = await client
      .path("/deviceupdate/{instanceId}/management/devices", "sdkinstance")
      .get();
    if (result.status !== "200") {
      assert.fail(
        `GET "/deviceupdate/sdkinstance/management/devices" failed with ${result.status}`
      );
    }
  });
}).timeout(600000);
