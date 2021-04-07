// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 *  These are a duplicate of the public SmsClient.spec.ts tests, but with additional logic to enable recording/playback.
 *  This is a workaround because Http Requests with Randomized UUIDs do not play well with the recorder
 *  These tests will be skipped in Live Mode since the public tests run in live mode only.
 */

import { SmsClient } from "../../src/smsClient";
import { env, isLiveMode, isPlaybackMode, record, Recorder } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import * as sinon from "sinon";
import { Uuid } from "../../src/utils/uuid";
import { recorderConfiguration } from "../utils/recordedClient";
import { Context } from "mocha";
import smsClientSuites from "../public/suites/smsClientSuites";

if (isNode) {
  dotenv.config();
}

describe("SmsClient [Playback/Record]", async () => {
  let recorder: Recorder;

  before(async function(this: Context) {
    this.smsClient = new SmsClient(env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING as string);
  });

  beforeEach(async function(this: Context) {
    recorder = record(this, recorderConfiguration);

    if (isLiveMode()) {
      console.log("Skipping because public tests will run instead.");
      this.skip();
    }

    if (isPlaybackMode()) {
      sinon.stub(Uuid, "generateUuid").returns("sanitized");
      sinon.stub(Date, "now").returns(0);
    }
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
    if (isPlaybackMode()) {
      sinon.restore();
    }
  });

  describe("when sending SMS", smsClientSuites);

});
