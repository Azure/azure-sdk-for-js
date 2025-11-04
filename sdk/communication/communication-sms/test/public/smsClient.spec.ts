// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 *  These tests only run in Live Mode because Http Requests with Randomized UUIDs do not play well with the recorder
 *  They are duplicated in an internal test which contains workaround logic to record/playback the tests
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils-vitest";
import type { SmsClient, SmsSendOptions, SmsSendRequest } from "../../src/index.js";
import { Uuid } from "../../src/utils/uuid.js";
import {
  createRecordedSmsClient,
  createRecordedSmsClientWithToken,
} from "./utils/recordedClient.js";
import { assertIsFailureResult, assertIsSuccessResult } from "./utils/assertHelpers.js";
import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";

matrix([[false, true]], async function (useAad: boolean) {
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

      afterEach(async function () {
        await recorder.stop();
        if (isPlaybackMode()) {
          vi.restoreAllMocks();
        }
      });

      describe("test send method", async () => {
        it("can send an SMS message", { timeout: 10000 }, async () => {
          const fromNumber = env.AZURE_PHONE_NUMBER as string;
          const validToNumber = env.AZURE_PHONE_NUMBER as string;

          const results = await client.send({
            from: fromNumber,
            to: [validToNumber],
            message: "test message",
          });

          assert.lengthOf(results, 1, "must return as many results as there were recipients");
          assertIsSuccessResult(results[0], validToNumber);
        });

        it("can send an SMS message with options passed in", { timeout: 10000 }, async () => {
          const fromNumber = env.AZURE_PHONE_NUMBER as string;
          const validToNumber = env.AZURE_PHONE_NUMBER as string;

          // Test basic options without messagingConnect first (messagingConnect needs valid partner)
          const results = await client.send(
            {
              from: fromNumber,
              to: [validToNumber],
              message: "test message",
            },
            {
              enableDeliveryReport: true,
              tag: "SMS_LIVE_TEST",
              deliveryReportTimeoutInSeconds: 300,
            },
          );

          assert.lengthOf(results, 1, "must return as many results as there were recipients");
          assertIsSuccessResult(results[0], validToNumber);
        });

        it("sends a new message each time send is called", { timeout: 10000 }, async () => {
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

          const firstResults = await client.send(sendRequest, options);
          const secondResults = await client.send(sendRequest, options);

          assertIsSuccessResult(firstResults[0], validToNumber);
          assertIsSuccessResult(secondResults[0], validToNumber);
          assert.notEqual(firstResults[0].messageId, secondResults[0].messageId);
        });

        it("can send an SMS message to multiple recipients", { timeout: 10000 }, async () => {
          const fromNumber = env.AZURE_PHONE_NUMBER as string;
          const validToNumber = env.AZURE_PHONE_NUMBER as string;
          const invalidToNumber = "+1425555012345"; // invalid number that's too long
          const recipients = [validToNumber, invalidToNumber];

          const results = await client.send({
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

        it("throws an exception when sending from a number you don't own", async () => {
          const fromNumber = "+14255550123";
          const validToNumber = env.AZURE_PHONE_NUMBER as string;
          try {
            await client.send(
              {
                from: fromNumber,
                to: [validToNumber],
                message: "test message",
              },
              {
                enableDeliveryReport: true,
                tag: "SMS_LIVE_TEST",
              },
            );
            assert.fail("Should have thrown an error");
          } catch (e: any) {
            assert.equal(e.statusCode, 401);
          }
        });

        it("throws an exception when sending from an invalid number", async () => {
          const fromNumber = "+1425555012345"; // invalid number that's too long
          const validToNumber = env.AZURE_PHONE_NUMBER as string;
          try {
            await client.send(
              {
                from: fromNumber,
                to: [validToNumber],
                message: "test message",
              },
              {
                enableDeliveryReport: true,
                tag: "SMS_LIVE_TEST",
              },
            );
            assert.fail("Should have thrown an error");
          } catch (e: any) {
            assert.equal(e.statusCode, 401);
          }
        });
      });

      describe("test getDeliveryReport method", async () => {
        it("can get delivery report for a message", { timeout: 10000 }, async () => {
          const fromNumber = env.AZURE_PHONE_NUMBER as string;
          const validToNumber = env.AZURE_PHONE_NUMBER as string;

          // Send a message first
          const sendResults = await client.send(
            {
              from: fromNumber,
              to: [validToNumber],
              message: "test message for delivery report",
            },
            {
              enableDeliveryReport: true,
              tag: "DELIVERY_REPORT_TEST",
            },
          );

          assert.lengthOf(sendResults, 1, "must return as many results as there were recipients");
          assertIsSuccessResult(sendResults[0], validToNumber);

          const messageId = sendResults[0].messageId;
          assert.isString(messageId, "messageId should be a string");
          assert.isDefined(messageId, "messageId should be defined");

          // Try to get delivery report
          // Note: It may return 404 if the report is not available yet
          try {
            const deliveryReport = await client.getDeliveryReport(messageId!);

            assert.isObject(deliveryReport, "delivery report should be returned");
            assert.equal(deliveryReport.messageId, messageId, "messageId should match");
            assert.isString(deliveryReport.from, "from should be a string");
            assert.isString(deliveryReport.to, "to should be a string");
            assert.isString(deliveryReport.deliveryStatus, "deliveryStatus should be a string");
            assert.include(
              ["Pending", "Delivered", "Failed", "Unknown"],
              deliveryReport.deliveryStatus,
              "deliveryStatus should be a valid status",
            );
          } catch (e: any) {
            // 404 is acceptable if delivery report is not available yet
            if (e.statusCode === 404) {
              console.log(
                "Delivery report not found (404) - may not be available yet or not enabled",
              );
            } else {
              throw e;
            }
          }
        });

        it("throws 404 for non-existent GUID message ID", async () => {
          const nonExistentMessageId = "00000000-0000-0000-0000-000000000000";

          try {
            await client.getDeliveryReport(nonExistentMessageId);
            assert.fail("Should have thrown an error for non-existent message");
          } catch (e: any) {
            assert.equal(e.statusCode, 404, "Should return 404 for non-existent GUID");
          }
        });

        it("throws 400 for invalid (non-GUID) message ID", async () => {
          const invalidMessageId = "not-a-valid-guid";

          try {
            await client.getDeliveryReport(invalidMessageId);
            assert.fail("Should have thrown an error for invalid message ID");
          } catch (e: any) {
            assert.equal(e.statusCode, 400, "Should return 400 for invalid message ID format");
          }
        });
      });

      describe("Opt Outs Client", { sequential: true }, async () => {
        it(
          "OptOut Check must return as many results as there were recipients",
          { timeout: 10000 },
          async () => {
            const fromNumber = env.AZURE_PHONE_NUMBER as string;
            const validToNumber = env.AZURE_PHONE_NUMBER as string;
            const results = await client.optOuts.check(fromNumber, [validToNumber]);

            assert.lengthOf(results, 1, "must return as many results as there were recipients");
            assert.equal(results[0].httpStatusCode, 200);
          },
        );

        it(
          "OptOut Add must return as many results as there were recipients",
          { timeout: 10000 },
          async () => {
            const fromNumber = env.AZURE_PHONE_NUMBER as string;
            const validToNumber = env.AZURE_PHONE_NUMBER as string;
            const results = await client.optOuts.add(fromNumber, [validToNumber]);

            assert.lengthOf(results, 1, "must return as many results as there were recipients");
            assert.equal(results[0].httpStatusCode, 200);
          },
        );

        it(
          "OptOut Remove must return as many results as there were recipients",
          { timeout: 10000 },
          async () => {
            const fromNumber = env.AZURE_PHONE_NUMBER as string;
            const validToNumber = env.AZURE_PHONE_NUMBER as string;
            const results = await client.optOuts.remove(fromNumber, [validToNumber]);

            assert.lengthOf(results, 1, "must return as many results as there were recipients");
            assert.equal(results[0].httpStatusCode, 200);
          },
        );

        it("OptOut Add should mark recipient as opted out", { timeout: 10000 }, async () => {
          const fromNumber = env.AZURE_PHONE_NUMBER as string;
          const validToNumber = env.AZURE_PHONE_NUMBER as string;

          const addResults = await client.optOuts.add(fromNumber, [validToNumber]);
          assert.equal(addResults[0].httpStatusCode, 200);

          const checkResults = await client.optOuts.check(fromNumber, [validToNumber]);
          assert.equal(checkResults[0].httpStatusCode, 200);
          assert.equal(checkResults[0].isOptedOut, true);
        });

        it("OptOut Remove should mark recipient as opted in", { timeout: 10000 }, async () => {
          const fromNumber = env.AZURE_PHONE_NUMBER as string;
          const validToNumber = env.AZURE_PHONE_NUMBER as string;

          const removeResults = await client.optOuts.remove(fromNumber, [validToNumber]);
          assert.equal(removeResults[0].httpStatusCode, 200);

          const checkResults = await client.optOuts.check(fromNumber, [validToNumber]);
          assert.equal(checkResults[0].httpStatusCode, 200);
          assert.equal(checkResults[0].isOptedOut, false);
        });
      });
    },
  );
});
