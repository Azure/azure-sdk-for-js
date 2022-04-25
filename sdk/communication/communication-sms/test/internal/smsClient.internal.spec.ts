// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * ###WORKAROUND###
 *  This duplicates the public SmsClient.spec.ts tests, but with additional logic to enable recording/playback.
 *  This is a workaround because Http Requests with Randomized UUIDs do not play well with the recorder
 *  These tests will be skipped in Live Mode since the public tests run in live mode only.
 */

import { matrix } from "@azure/test-utils";
import { isLiveMode, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import * as sinon from "sinon";
import { Uuid } from "../../src/utils/uuid";
import {
  createRecordedSmsClient,
  createRecordedSmsClientWithToken,
} from "../public/utils/recordedClient";
import { Context } from "mocha";
import sendSmsSuites from "../public/suites/smsClient.send";
import { SmsClient } from "../../src";

matrix([[true, false]], async function (useAad: boolean) {
  describe(`SmsClient [Playback/Record]${useAad ? " [AAD]" : ""}`, async () => {
    let recorder: Recorder;
    let client: SmsClient;

    beforeEach(async function (this: Context) {
      if (isLiveMode()) {
        this.skip();
      } else if (isPlaybackMode()) {
        sinon.stub(Uuid, "generateUuid").returns("sanitized");
        sinon.stub(Date, "now").returns(0);
      }

      if (useAad) {
        ({ client, recorder } = await createRecordedSmsClientWithToken(this));
      } else {
        ({ client, recorder } = await createRecordedSmsClient(this));
      }
      this.smsClient = client;
    });

    afterEach(async function (this: Context) {
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
