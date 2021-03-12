// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isPlaybackMode, record, Recorder } from "@azure/test-utils-recorder";
import { SmsSendRequest, SmsClient } from "../src/smsClient";
import { assert } from "chai";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import * as sinon from "sinon";
import { parseConnectionString } from "@azure/communication-common";
import { createCredential, recorderConfiguration } from "./utils/recordedClient";
import { Uuid } from "../src/utils/uuid";

if (isNode) {
  dotenv.config();
}

describe("SmsClientWithToken [Playback/Live]", async () => {
  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderConfiguration);
    if (isPlaybackMode()) {
      sinon.stub(Uuid, "generateUuid").returns("sanitized");
      sinon.stub(Date, "now").returns(0);
    }
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
    if (isPlaybackMode()) {
      sinon.restore();
    }
  });

  it("can send a SMS when url and token credential are provided", async function() {
    const credential = createCredential();

    if (!credential) {
      this.skip();
    }

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
