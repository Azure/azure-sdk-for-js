// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 *  These are a duplicate of the public SmsClientWithToken.spec.ts tests, but with additional logic to enable recording/playback.
 *  This is a workaround because Http Requests with Randomized UUIDs do not play well with the recorder
 *  These tests will be skipped in Live Mode since the public tests run in live mode only.
 */

import { env, isLiveMode, isPlaybackMode, record, Recorder } from "@azure/test-utils-recorder";
import { SmsSendRequest, SmsClient } from "../../src/smsClient";
import { assert } from "chai";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import * as sinon from "sinon";
import { parseConnectionString } from "@azure/communication-common";
import { createCredential, recorderConfiguration } from "../utils/recordedClient";
import { Uuid } from "../../src/utils/uuid";
import { Context } from "mocha";

if (isNode) {
  dotenv.config();
}

describe("SmsClientWithToken [Playback/Record]", async () => {
  let recorder: Recorder;

  beforeEach(async function(this: Context) {
    if (isLiveMode()) {
      console.log("Skipping because public tests will run instead.");
      this.skip();
    }
    recorder = record(this, recorderConfiguration);
    recorder.skip("browser");
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

  it("can send an SMS when url and token credential are provided", async function() {
    const credential = createCredential();
    const endpoint = parseConnectionString(env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING)
      .endpoint;
    const fromNumber = env.AZURE_PHONE_NUMBER as string;
    const toNumber = env.AZURE_PHONE_NUMBER as string;

    const smsClient = new SmsClient(endpoint, credential);

    const sendRequest: SmsSendRequest = {
      from: fromNumber,
      to: [toNumber],
      message: "test message"
    };

    const responses = await smsClient.send(sendRequest);
    const response = responses[0];
    assert.equal(response.httpStatusCode, 202);
    assert.isTrue(response.successful);
  }).timeout(5000);
});
