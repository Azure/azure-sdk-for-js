// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { SmsClient, SendRequest, SendOptions } from "../src/smsClient";
import { record, Recorder, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";

if (isNode) {
  dotenv.config();
}

const recorderConfiguration: RecorderEnvironmentSetup = {
  replaceableVariables: {
    AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
    AZURE_PHONE_NUMBER: "+18005551234"
  },
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^/',]*)/, "$1endpoint"),
    (recording: string): string =>
      recording.replace(/"messageId"\s?:\s?"[^"]*"/g, `"messageId":"Sanitized"`)
  ],
  queryParametersToSkip: []
};

describe("SmsClient", async () => {
  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderConfiguration);
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("sends a SMS message to multiple numbers", async () => {
    const connectionString = process.env[
      "AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING"
    ] as string;

    const fromNumber = process.env["AZURE_PHONE_NUMBER"] as string;
    const toNumber = process.env["AZURE_PHONE_NUMBER"] as string;

    const smsClient = new SmsClient(connectionString);
    const sendRequest: SendRequest = {
      from: fromNumber,
      to: [toNumber],
      message: "test message"
    };
    const options: SendOptions = {
      enableDeliveryReport: true,
      tag: "LIVE_TEST"
    }; //hmm, how do we test this in event grid?
    const sendResponse = await smsClient.send(sendRequest, options);
    const sendResults = sendResponse.value;
    for (const sendResult of sendResults) {
      assert.equal(sendResult.httpStatusCode, 202);
      assert.isString(sendResult.messageId);
    }
  });

  it("sends a SMS message with a tag", async () => {
    const connectionString = process.env[
      "AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING"
    ] as string;

    const fromNumber = process.env["AZURE_PHONE_NUMBER"] as string;
    const toNumber = process.env["AZURE_PHONE_NUMBER"] as string;

    const smsClient = new SmsClient(connectionString);
    const sendRequest: SendRequest = {
      from: fromNumber,
      to: [toNumber],
      message: "test message"
    };
    const options: SendOptions = {
      enableDeliveryReport: true,
      tag: "LIVE_TEST"
    };

    const sendResponse = await smsClient.send(sendRequest, options);
    const sendResults = sendResponse.value;
    for (const sendResult of sendResults) {
      assert.equal(sendResult.httpStatusCode, 202);
      assert.isString(sendResult.messageId);
    }
  });
});
