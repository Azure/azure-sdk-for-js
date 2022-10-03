// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 *  These tests only run in Live Mode because Http Requests with Randomized UUIDs do not play well with the recorder
 *  They are duplicated in an internal test which contains workaround logic to record/playback the tests
 */

import { matrix } from "@azure/test-utils";
import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecordedSmsClient, createRecordedSmsClientWithToken } from "./utils/recordedClient";
import { Context } from "mocha";
import sendSmsSuites from "./suites/smsClient.send";
import { SmsClient } from "../../src";
import sinon from "sinon";
import { Uuid } from "../../src/utils/uuid";

matrix([[true, false]], async function (useAad: boolean) {
  describe(`SmsClient [Live]${useAad ? " [AAD]" : ""}`, async () => {
    let recorder: Recorder;
    let client: SmsClient;

    before(function (this: Context) {
      const skipIntSMSTests = env.COMMUNICATION_SKIP_INT_SMS_TEST === "true";
      if (skipIntSMSTests) {
        this.skip();
      }
    });

    beforeEach(async function (this: Context) {
      if (isPlaybackMode()) {
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

    describe("test send method", sendSmsSuites);
  });
});
