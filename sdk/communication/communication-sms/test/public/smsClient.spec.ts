// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 *  These tests only run in Live Mode because Http Requests with Randomized UUIDs do not play well with the recorder
 *  They are duplicated in an internal test which contains workaround logic to record/playback the tests
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils";
import type { Context } from "mocha";
import sinon from "sinon";
import type { SmsClient } from "../../src/index.js";
import { Uuid } from "../../src/utils/uuid.js";
import sendSmsSuites from "./suites/smsClient.send.js";
import { createRecordedSmsClient, createRecordedSmsClientWithToken } from "./utils/recordedClient.js";

matrix([[true, false]], async function (useAad: boolean) {
  describe(`SmsClient [Live]${useAad ? " [AAD]" : ""}`, async function () {
    let recorder: Recorder;
    let client: SmsClient;

    before(function (ctx) {
      const skipIntSMSTests = env.COMMUNICATION_SKIP_INT_SMS_TEST === "true";
      if (skipIntSMSTests) {
        ctx.skip();
      }
    });

    beforeEach(async function (ctx) {
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

    afterEach(async function (ctx) {
      if (!ctx.task.pending) {
        await recorder.stop();
      }
      if (isPlaybackMode()) {
        sinon.restore();
      }
    });

    describe("test send method", sendSmsSuites);
  });
});
