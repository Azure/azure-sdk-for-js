// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * ###WORKAROUND###
 *  This duplicates of public SmsClientWithToken.spec.ts tests, but with additional logic to enable recording/playback.
 *  This is a workaround because Http Requests with Randomized UUIDs do not play well with the recorder
 *  These tests will be skipped in Live Mode since the public tests run in live mode only.
 */

import { env, isLiveMode, isPlaybackMode, record, Recorder } from "@azure/test-utils-recorder";
import { SmsClient } from "../../../src/smsClient";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import * as sinon from "sinon";
import { parseConnectionString } from "@azure/communication-common";
import { createCredential, recorderConfiguration } from "../../public/utils/recordedClient";
import { Uuid } from "../../../src/utils/uuid";
import { Context } from "mocha";
import sendSmsSuites from "../../public/suites/smsClient.send";

if (isNode) {
  dotenv.config();
}

describe("SmsClient Using Token Based Authentication [Playback/Record]", async () => {
  let recorder: Recorder;

  beforeEach(async function(this: Context) {
    if (isLiveMode()) {
      console.log("Skipping because public tests will run instead.");
      this.skip();
    }
    recorder = record(this, recorderConfiguration);
    if (isPlaybackMode()) {
      sinon.stub(Uuid, "generateUuid").returns("sanitized");
      sinon.stub(Date, "now").returns(0);
    }

    const credential = createCredential();
    const endpoint = parseConnectionString(env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING)
      .endpoint;
    this.smsClient = new SmsClient(endpoint, credential);
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
    if (isPlaybackMode()) {
      sinon.restore();
    }
  });

  describe("when sending SMS", sendSmsSuites);
});
