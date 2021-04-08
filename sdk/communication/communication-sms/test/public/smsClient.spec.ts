// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SmsClient } from "../../src/smsClient";
import { env, record, Recorder } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import { recorderConfiguration } from "./utils/recordedClient";
import { Context } from "mocha";
import sendSmsSuites from "./suites/smsClient.send";

if (isNode) {
  dotenv.config();
}

describe("SmsClient [Live]", async () => {
  let recorder: Recorder;

  beforeEach(async function(this: Context) {
    recorder = record(this, recorderConfiguration);
    recorder.skip(
      undefined,
      "A UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    this.smsClient = new SmsClient(env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING as string);
  });

  afterEach(async function(this: Context) {
    await recorder.stop();
  });

  describe("test send method", sendSmsSuites);
});
