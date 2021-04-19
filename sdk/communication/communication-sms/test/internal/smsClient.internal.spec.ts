// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * ###WORKAROUND###
 *  This duplicates the public SmsClient.spec.ts tests, but with additional logic to enable recording/playback.
 *  This is a workaround because Http Requests with Randomized UUIDs do not play well with the recorder
 *  These tests will be skipped in Live Mode since the public tests run in live mode only.
 */

import { isLiveMode, isPlaybackMode, record, Recorder } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import * as sinon from "sinon";
import { Uuid } from "../../src/utils/uuid";
import {
  createCredential,
  createSmsClient,
  createSmsClientWithToken,
  recorderConfiguration
} from "../public/utils/recordedClient";
import { Context } from "mocha";
import sendSmsSuites from "../public/suites/smsClient.send";
import { matrix } from "../public/utils/matrix";

if (isNode) {
  dotenv.config();
}

matrix([[true, false]], async function(useAad) {
  describe(`SmsClient [Playback/Record]${useAad ? " [AAD]" : ""}`, async () => {
    let recorder: Recorder;

    beforeEach(async function(this: Context) {
      recorder = record(this, recorderConfiguration);

      if (isLiveMode()) {
        this.skip();
      } else if (isPlaybackMode()) {
        sinon.stub(Uuid, "generateUuid").returns("sanitized");
        sinon.stub(Date, "now").returns(0);
      }

      if (useAad) {
        const token = createCredential() || this.skip();
        this.smsClient = createSmsClientWithToken(token);
      } else {
        this.smsClient = createSmsClient();
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

    describe("when sending SMS", sendSmsSuites);
  });
});
