// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  isPlaybackMode,
  record,
  Recorder,
  RecorderEnvironmentSetup
} from "@azure-tools/test-recorder";
import { assert } from "chai";
import { CallingServerClient } from "../../src";
import { Context } from "mocha";
import { bodyToString } from "./utils";
import { RestError } from "@azure/core-http";

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

describe("Download Content", function() {
  let recorder: Recorder;
  const uri =
    "https://endpoint/v1/objects/0-eus-d15-af5689148b0afa252a57a0121b744dcd/content/acsmetadata";
  const callingServerServiceClient = new CallingServerClient(
    "endpoint=https://endpoint/;accesskey=banana"
  );

  beforeEach(async function(this: Context) {
    recorder = record(this, environmentSetup);
    /* Place your code here*/
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("download", async function(this: Context) {
    if (!isPlaybackMode()) {
      // tslint:disable-next-line:no-invalid-this
      this.skip();
    }

    const downloadResponse = await callingServerServiceClient.download(uri);
    const metadata = await bodyToString(downloadResponse, downloadResponse.contentLength!);
    assert.strictEqual(metadata.includes("0-eus-d15-af5689148b0afa252a57a0121b744dcd"), true);
  });

  it("download with redirection", async function(this: Context) {
    if (!isPlaybackMode()) {
      // tslint:disable-next-line:no-invalid-this
      this.skip();
    }
    const redirectedUri =
      "https://endpoint/v1/objects/0-sa-d4-a29f0c0212c0a2a634ab078245184de8/content/acsmetadata";
    const downloadResponse = await callingServerServiceClient.download(redirectedUri);
    const metadataStream = downloadResponse.readableStreamBody;
    assert.notStrictEqual(metadataStream, null);
    const metadata = await bodyToString(downloadResponse, downloadResponse.contentLength!);
    assert.strictEqual(metadata.includes("0-sa-d4-a29f0c0212c0a2a634ab078245184de8"), true);
  });

  it("unauthorized download", async function(this: Context) {
    if (!isPlaybackMode()) {
      // tslint:disable-next-line:no-invalid-this
      this.skip();
    }

    try {
      await callingServerServiceClient.download(uri);
    } catch (e) {
      assert.equal((e as RestError).statusCode, 401);
    }
  });
});
