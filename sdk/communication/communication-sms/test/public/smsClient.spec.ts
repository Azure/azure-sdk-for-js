// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { record, Recorder } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import { createCredential, createSmsClient, createSmsClientWithToken, recorderConfiguration } from "./utils/recordedClient";
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
      recorder = record(this, recorderConfiguration);
      recorder.skip(
        undefined,
        "A UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
      );

      if (useAad) {
        const token = createCredential() || this.skip();
        this.smsClient = createSmsClientWithToken(token);
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
