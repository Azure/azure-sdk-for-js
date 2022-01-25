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
import { isNode, RestError } from "@azure/core-http";
import * as fs from "fs";

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
  const url =
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

  it("downloadToFile", async function(this: Context) {
    if (!isPlaybackMode() || !isNode) {
      // tslint:disable-next-line:no-invalid-this
      this.skip();
    }
    const fileName = "downloadToFileTest";
    const downloadResponse = await callingServerServiceClient.downloadToFile(fileName, url);
    assert.strictEqual(downloadResponse.readableStreamBody, undefined);
    assert.isTrue(fs.existsSync(fileName));
    assert.isTrue(fs.readFileSync(fileName).includes("0-eus-d15-af5689148b0afa252a57a0121b744dcd"));
    fs.unlinkSync(fileName);
    assert.isFalse(fs.existsSync(fileName));
  });

  it("download with redirection", async function(this: Context) {
    if (!isPlaybackMode()) {
      // tslint:disable-next-line:no-invalid-this
      this.skip();
    }
    const redirectedUrl =
      "https://endpoint/v1/objects/0-sa-d4-a29f0c0212c0a2a634ab078245184de8/content/acsmetadata";
    const downloadResponse = await callingServerServiceClient.download(redirectedUrl);
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
      await callingServerServiceClient.download(url);
    } catch (e) {
      assert.equal((e as RestError).statusCode, 401);
    }
  });
});
