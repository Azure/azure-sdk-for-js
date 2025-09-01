// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * ###WORKAROUND###
 *  This duplicates the public TelcoMessagingClient.spec.ts tests, but with additional logic to enable recording/playback.
 *  This is a workaround because Http Requests with Randomized UUIDs do not play well with the recorder
 *  These tests will be skipped in Live Mode since the public tests run in live mode only.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils-vitest";
import type { TelcoMessagingClient, SmsSendOptions, SmsSendRequest } from "../../src/index.js";
import { Uuid } from "../../src/utils/uuid.js";
import {
  createRecordedTelcoMessagingClient,
  createRecordedTelcoMessagingClientWithToken,
} from "../public/utils/recordedClient.js";
import { assertIsFailureResult, assertIsSuccessResult } from "../public/utils/assertHelpers.js";
import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";

matrix([[false, true]], async function (useAad: boolean) {
  describe(`TelcoMessagingClient [Playback/Record]${useAad ? " [AAD]" : ""}`, async () => {
    let recorder: Recorder;
    let client: TelcoMessagingClient;

    beforeEach(async function (ctx) {
      if (isLiveMode()) {
        ctx.skip();
      } else if (isPlaybackMode()) {
        vi.spyOn(Uuid, "generateUuid").mockReturnValue("sanitized");
        vi.spyOn(Date, "now").mockReturnValue(0);
      }

      if (useAad) {
        ({ client, recorder } = await createRecordedTelcoMessagingClientWithToken(ctx));
      } else {
        ({ client, recorder } = await createRecordedTelcoMessagingClient(ctx));
      }
    });

    afterEach(async function () {
      await recorder.stop();
      if (isPlaybackMode()) {
        vi.restoreAllMocks();
      }
    });

    describe("when sending SMS via sms sub-client", async () => {
      it("can send an SMS message", { timeout: 4000 }, async () => {
        const fromNumber = env.AZURE_PHONE_NUMBER as string;
        const validToNumber = env.AZURE_PHONE_NUMBER as string;

        const results = await client.sms.send({
          from: fromNumber,
          to: [validToNumber],
          message: "test message",
        });

        assert.lengthOf(results, 1, "must return as many results as there were recipients");
        assertIsSuccessResult(results[0], validToNumber);
      });

      it("can send an SMS message with options passed in", { timeout: 4000 }, async () => {
        const fromNumber = env.AZURE_PHONE_NUMBER as string;
        const validToNumber = env.AZURE_PHONE_NUMBER as string;

        const results = await client.sms.send(
          {
            from: fromNumber,
            to: [validToNumber],
            message: "test message",
          },
          {
            enableDeliveryReport: true,
            tag: "SMS_LIVE_TEST",
            deliveryReportTimeoutInSeconds: 300,
            messagingConnect: {
              apiKey: "test_api_key",
              partner: "test_partner",
            },
          },
        );

        assert.lengthOf(results, 1, "must return as many results as there were recipients");
        assertIsSuccessResult(results[0], validToNumber);
      });

      it("sends a new message each time send is called", { timeout: 4000 }, async () => {
        const fromNumber = env.AZURE_PHONE_NUMBER as string;
        const validToNumber = env.AZURE_PHONE_NUMBER as string;

        const sendRequest: SmsSendRequest = {
          from: fromNumber,
          to: [validToNumber],
          message: "test message",
        };
        const options: SmsSendOptions = {
          enableDeliveryReport: true,
          tag: "SMS_LIVE_TEST",
        };

        const firstResults = await client.sms.send(sendRequest, options);
        const secondResults = await client.sms.send(sendRequest, options);

        assertIsSuccessResult(firstResults[0], validToNumber);
        assertIsSuccessResult(secondResults[0], validToNumber);
        assert.notEqual(firstResults[0].messageId, secondResults[0].messageId);
      });

      it("can send an SMS message to multiple recipients", { timeout: 4000 }, async () => {
        const fromNumber = env.AZURE_PHONE_NUMBER as string;
        const validToNumber = env.AZURE_PHONE_NUMBER as string;
        const invalidToNumber = "+1425555012345"; // invalid number that's too long
        const recipients = [validToNumber, invalidToNumber];

        const results = await client.sms.send({
          from: fromNumber,
          to: recipients,
          message: "test message",
        });

        assert.lengthOf(
          results,
          recipients.length,
          "must return as many results as there were recipients",
        );

        assertIsSuccessResult(results[0], validToNumber);
        assertIsFailureResult(results[1], invalidToNumber, "Unknown country code.");
      });

      it("throws an exception when sending from a number you don't own", { timeout: 4000 }, async () => {
        const fromNumber = "+14255551234";
        const validToNumber = env.AZURE_PHONE_NUMBER as string;

        try {
          await client.sms.send({
            from: fromNumber,
            to: [validToNumber],
            message: "test message",
          });
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 401);
        }
      });

      it("throws an exception when sending from an invalid number", { timeout: 4000 }, async () => {
        const fromNumber = "+1425555123"; // invalid number that's too short
        const validToNumber = env.AZURE_PHONE_NUMBER as string;

        try {
          await client.sms.send({
            from: fromNumber,
            to: [validToNumber],
            message: "test message",
          });
          assert.fail("Should have thrown an error");
        } catch (e: any) {
          assert.equal(e.statusCode, 401);
        }
      });
    });

    describe("Opt Outs Client", async () => {
      it("OptOut Check must return as many results as there were recipients", { timeout: 4000 }, async () => {
        const fromNumber = env.AZURE_PHONE_NUMBER as string;
        const phoneNumber1 = env.AZURE_PHONE_NUMBER as string;
        const phoneNumber2 = "+14255550123";
        const recipients = [phoneNumber1, phoneNumber2];

        const results = await client.optOuts.check(fromNumber, recipients);

        assert.lengthOf(
          results,
          recipients.length,
          "must return as many results as there were recipients",
        );
      });

      it("OptOut Add must return as many results as there were recipients", { timeout: 4000 }, async () => {
        const fromNumber = env.AZURE_PHONE_NUMBER as string;
        const phoneNumber1 = env.AZURE_PHONE_NUMBER as string;
        const phoneNumber2 = "+14255550123";
        const recipients = [phoneNumber1, phoneNumber2];

        const results = await client.optOuts.add(fromNumber, recipients);

        assert.lengthOf(
          results,
          recipients.length,
          "must return as many results as there were recipients",
        );
      });

      it("OptOut Remove must return as many results as there were recipients", { timeout: 4000 }, async () => {
        const fromNumber = env.AZURE_PHONE_NUMBER as string;
        const phoneNumber1 = env.AZURE_PHONE_NUMBER as string;
        const phoneNumber2 = "+14255550123";
        const recipients = [phoneNumber1, phoneNumber2];

        const results = await client.optOuts.remove(fromNumber, recipients);

        assert.lengthOf(
          results,
          recipients.length,
          "must return as many results as there were recipients",
        );
      });

      it("OptOut Add should mark recipient as opted out", { timeout: 4000 }, async () => {
        const fromNumber = env.AZURE_PHONE_NUMBER as string;
        const phoneNumber = "+14255550123";

        await client.optOuts.add(fromNumber, [phoneNumber]);

        const results = await client.optOuts.check(fromNumber, [phoneNumber]);
        assert.lengthOf(results, 1, "must return as many results as there were recipients");
        assert.equal(results[0].httpStatusCode, 200);
        assert.isTrue(results[0].isOptedOut);
      });

      it("OptOut Remove should mark recipient as opted in", { timeout: 4000 }, async () => {
        const fromNumber = env.AZURE_PHONE_NUMBER as string;
        const phoneNumber = "+14255550123";

        await client.optOuts.remove(fromNumber, [phoneNumber]);

        const results = await client.optOuts.check(fromNumber, [phoneNumber]);
        assert.lengthOf(results, 1, "must return as many results as there were recipients");
        assert.equal(results[0].httpStatusCode, 200);
        assert.isFalse(results[0].isOptedOut);
      });
    });
  });
});
