// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 *  These tests only run in Live Mode because Http Requests with Randomized UUIDs do not play well with the recorder
 *  They are duplicated in an internal test which contains workaround logic to record/playback the tests
 */

import { record, Recorder, env } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import {
  createSmsClient,
  createSmsClientWithToken,
  recorderConfiguration
} from "./utils/recordedClient";
import { Context } from "mocha";
import sendSmsSuites from "./suites/smsClient.send";
import { matrix } from "./utils/matrix";

if (isNode) {
  dotenv.config();
}

matrix([[true, false]], async function(useAad) {
  describe(`SmsClient [Live]${useAad ? " [AAD]" : ""}`, async () => {
    let recorder: Recorder;

    beforeEach(async function(this: Context) {
      const skipSMSTests = env.COMMUNICATION_SKIP_INT_SMS_TESTS === "true";
      if (skipSMSTests) {
        this.skip();
      }

      recorder = record(this, recorderConfiguration);
      recorder.skip(
        undefined,
        "A UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
      );

      if (useAad) {
        this.smsClient = createSmsClientWithToken();
      } else {
        this.smsClient = createSmsClient();
      }
    });

    afterEach(async function(this: Context) {
      await recorder.stop();
    });

    describe("test send method", sendSmsSuites);
  });
});
