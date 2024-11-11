// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * ###WORKAROUND###
 *  This duplicates the public SmsClient.spec.ts tests, but with additional logic to enable recording/playback.
 *  This is a workaround because Http Requests with Randomized UUIDs do not play well with the recorder
 *  These tests will be skipped in Live Mode since the public tests run in live mode only.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils-vitest";
import type { SmsClient } from "../../src/index.js";
import { Uuid } from "../../src/utils/uuid.js";
import sendSmsSuites from "../public/suites/smsClient.send.js";
import {
  createRecordedSmsClient,
  createRecordedSmsClientWithToken,
} from "../public/utils/recordedClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async function (useAad: boolean) {
  describe(`SmsClient [Playback/Record]${useAad ? " [AAD]" : ""}`, async function () {
    let recorder: Recorder;
    let client: SmsClient;

    beforeEach(async function (ctx) {
      if (isLiveMode()) {
        ctx.skip();
      } else if (isPlaybackMode()) {
        
                      vi.spyOn(Uuid, "generateUuid")
                      .mockReturnValue("sanitized")
                    ;
        
                      vi.spyOn(Date, "now")
                      .mockReturnValue(0)
                    ;
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
        vi.restoreAllMocks();
      }
    });

    describe("when sending SMS", sendSmsSuites);
  });
});
