// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { record, Recorder, env } from "@azure/test-utils-recorder";
import { SendRequest, SmsClient } from "../src/smsClient";
import { assert } from "chai";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import { createCredential, recorderConfiguration } from "./utils/recordedClient";

if (isNode) {
  dotenv.config();
}

describe("SmsClientWithToken [Playback/Live]", async () => {
  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderConfiguration);
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("successfully issues a token for a user", async function() {
    const credential = createCredential();

    if (!credential) {
      this.skip();
    }

    const endpoint = env.COMMUNICATION_ENDPOINT;
    const fromNumber = env.AZURE_PHONE_NUMBER;
    const toNumber = env.AZURE_PHONE_NUMBER;

    const smsClient = new SmsClient(endpoint, credential);
    const sendRequest: SendRequest = {
      from: fromNumber,
      to: [toNumber],
      message: "test message"
    };

    const response = await smsClient.send(sendRequest);
    assert.equal(response._response.status, 200);
  }).timeout(5000);
});
