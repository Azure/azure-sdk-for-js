// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SmsClient } from "../../src/smsClient";
import { env, record, Recorder } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import { recorderConfiguration } from "../utils/recordedClient";
import { Context } from "mocha";
import smsClientSuites from "./suites/smsClientSuites";

if (isNode) {
  dotenv.config();
}

describe("SmsClient [Live]", async () => {
  let recorder: Recorder;

  before(async function(this: Context) {
    this.smsClient = new SmsClient(env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING as string);
  });

  beforeEach(async function(this: Context) {
    recorder = record(this, recorderConfiguration);
    recorder.skip(undefined); // only run in live mode
  });

  afterEach(async function(this: Context) {
    await recorder.stop();
  });  

  describe("when sending SMS", smsClientSuites);
});
