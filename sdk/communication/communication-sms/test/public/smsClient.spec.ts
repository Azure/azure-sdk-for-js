// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SmsClient } from "../../src";
import { env, record, Recorder } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import { createCredential, recorderConfiguration } from "./utils/recordedClient";
import { Context } from "mocha";
import sendSmsSuites from "./suites/smsClient.send";
import { matrix } from "./utils/matrix";
import { parseConnectionString } from "@azure/communication-common";

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

      const connectionString = env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING as string;
      if (useAad) {
        const token = createCredential() || this.skip();
        const { endpoint } = parseConnectionString(connectionString);
        this.smsClient = new SmsClient(endpoint, token);
      } else {
        this.smsClient = new SmsClient(connectionString);
      }
    });

    afterEach(async function(this: Context) {
      await recorder.stop();
    });

    describe("test send method", sendSmsSuites);
  });
});
