// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, RecorderEnvironmentSetup, env, isPlaybackMode, record } from "@azure-tools/test-recorder";
import { CallingServerClient } from "../../src";
import { Context } from "mocha";
import { RestError } from "@azure/core-http";
import { assert } from "chai";

const replaceableVariables: { [k: string]: string } = {
  COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana"
};

const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1endpoint"),
    (recording: string): string => recording.replace("endpoint:443", "endpoint")
  ],
  queryParametersToSkip: []
};

describe("Delete Live Tests", function() {
  let recorder: Recorder;
  const url = "https://endpoint/v1/objects/0-wus-d6-fdf8ff0fdcd668bca8c52c0b1ee79b05";
  const invalidUrl = "https://endpoint/v1/objects/0-wus-d4-ca4017a32f8514aa9f054f0917270000";

  const callingServerServiceClient = new CallingServerClient(
    env.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING ||
      "endpoint=https://endpoint/;accesskey=banana"
  );

  beforeEach(async function(this: Context) {
    recorder = record(this, environmentSetup);
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("delete", async function(this: Context) {
    if (!isPlaybackMode()) {
      // tslint:disable-next-line:no-invalid-this
      this.skip();
    }

    const result = await callingServerServiceClient.deleteRecording(url);
    assert.equal(200, result._response.status);
  });

  it("unauthorized delete", async function(this: Context) {
    if (!isPlaybackMode()) {
      // tslint:disable-next-l ine:no-invalid-this
      this.skip();
    }

    try {
      const unauthorizedCallingServerServiceClient = new CallingServerClient(
        "endpoint=https://test.communication.azure.com/;accesskey=1234"
      );
      await unauthorizedCallingServerServiceClient.deleteRecording(url);
    } catch (e) {
      assert.equal((e as RestError).statusCode, 401);
    }
  });

  it("invalid file delete", async function(this: Context) {
    if (!isPlaybackMode()) {
      // tslint:disable-next-line:no-invalid-this
      this.skip();
    }
    try {
      await callingServerServiceClient.download(invalidUrl);
    } catch (e) {
      assert.equal((e as RestError).statusCode, 404);
    }
  });
});
