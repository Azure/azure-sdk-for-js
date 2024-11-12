// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 *  These tests only run in Live Mode because Http Requests with Randomized UUIDs do not play well with the recorder
 *  They are duplicated in an internal test which contains workaround logic to record/playback the tests
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils-vitest";
import type { SmsClient } from "../../src/index.js";
import { Uuid } from "../../src/utils/uuid.js";
import sendSmsSuites from "./suites/smsClient.send.js";
import {
  createRecordedSmsClient,
  createRecordedSmsClientWithToken,
} from "./utils/recordedClient.js";
import { describe, vi, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async function (useAad: boolean) {
  const skipIntSMSTests = env.COMMUNICATION_SKIP_INT_SMS_TEST === "true";

  describe(
    `SmsClient [Live]${useAad ? " [AAD]" : ""}`,
    { skip: skipIntSMSTests },
    async function () {
      let recorder: Recorder;
      let client: SmsClient;

      beforeEach(async function (ctx) {
        if (isPlaybackMode()) {
          vi.spyOn(Uuid, "generateUuid").mockReturnValue("sanitized");
          vi.spyOn(Date, "now").mockReturnValue(0);
        }
        if (useAad) {
          ({ client, recorder } = await createRecordedSmsClientWithToken(ctx));
        } else {
          ({ client, recorder } = await createRecordedSmsClient(ctx));
        }
      });

      afterEach(async function (ctx) {
        if (!ctx.task.pending) {
          await recorder.stop();
        }
        if (isPlaybackMode()) {
          vi.restoreAllMocks();
        }
      });

      describe("test send method", () => {
        sendSmsSuites(client);
      });
    },
  );
});
