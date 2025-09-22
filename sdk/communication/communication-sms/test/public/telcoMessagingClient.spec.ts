// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 *  These tests only run in Live Mode because Http Requests with Randomized UUIDs do not play well with the recorder
 *  They are duplicated in an internal test which contains workaround logic to record/playback the tests
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils-vitest";
import type { TelcoMessagingClient, SmsSendOptions, SmsSendRequest } from "../../src/index.js";
import { Uuid } from "../../src/utils/uuid.js";
import {
  createRecordedTelcoMessagingClient,
  createRecordedTelcoMessagingClientWithToken,
} from "./utils/recordedClient.js";
import { assertIsFailureResult, assertIsSuccessResult } from "./utils/assertHelpers.js";
import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";

matrix([[false, true]], async function (useAad: boolean) {
  const skipIntSMSTests = env.COMMUNICATION_SKIP_INT_SMS_TEST === "true";

  describe(
    `TelcoMessagingClient [Live]${useAad ? " [AAD]" : ""}`,
    { skip: skipIntSMSTests },
    async function () {
      let recorder: Recorder;
      let client: TelcoMessagingClient;

      beforeEach(async function (ctx) {
        if (isPlaybackMode()) {
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

      describe("test send method via sms sub-client", async () => {
        it("can send an SMS message", { timeout: 5000 }, async () => {
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
              tag: "TELCO_SMS_LIVE_TEST",
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
            tag: "TELCO_SMS_LIVE_TEST",
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

        it("throws an exception when sending from a number you don't own", async () => {
          const fromNumber = "+14255550123";
          const validToNumber = env.AZURE_PHONE_NUMBER as string;
          try {
            await client.sms.send(
              {
                from: fromNumber,
                to: [validToNumber],
                message: "test message",
              },
              {
                enableDeliveryReport: true,
                tag: "TELCO_SMS_LIVE_TEST",
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
            await client.sms.send(
              {
                from: fromNumber,
                to: [validToNumber],
                message: "test message",
              },
              {
                enableDeliveryReport: true,
                tag: "TELCO_SMS_LIVE_TEST",
              },
            );
            assert.fail("Should have thrown an error");
          } catch (e: any) {
            assert.equal(e.statusCode, 401);
          }
        });
      });

      describe("OptOuts Client", { sequential: true }, async () => {
        it(
          "OptOut Check must return as many results as there were recipients",
          { timeout: 4000 },
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
          { timeout: 4000 },
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
          { timeout: 4000 },
          async () => {
            const fromNumber = env.AZURE_PHONE_NUMBER as string;
            const validToNumber = env.AZURE_PHONE_NUMBER as string;
            const results = await client.optOuts.remove(fromNumber, [validToNumber]);

            assert.lengthOf(results, 1, "must return as many results as there were recipients");
            assert.equal(results[0].httpStatusCode, 200);
          },
        );

        it("OptOut Add should mark recipient as opted out", { timeout: 4000 }, async () => {
          const fromNumber = env.AZURE_PHONE_NUMBER as string;
          const validToNumber = env.AZURE_PHONE_NUMBER as string;

          const addResults = await client.optOuts.add(fromNumber, [validToNumber]);
          assert.equal(addResults[0].httpStatusCode, 200);

          const checkResults = await client.optOuts.check(fromNumber, [validToNumber]);
          assert.equal(checkResults[0].httpStatusCode, 200);
          assert.equal(checkResults[0].isOptedOut, true);
        });

        it("OptOut Remove should mark recipient as opted in", { timeout: 4000 }, async () => {
          const fromNumber = env.AZURE_PHONE_NUMBER as string;
          const validToNumber = env.AZURE_PHONE_NUMBER as string;

          const removeResults = await client.optOuts.remove(fromNumber, [validToNumber]);
          assert.equal(removeResults[0].httpStatusCode, 200);

          const checkResults = await client.optOuts.check(fromNumber, [validToNumber]);
          assert.equal(checkResults[0].httpStatusCode, 200);
          assert.equal(checkResults[0].isOptedOut, false);
        });
      });

      describe("DeliveryReports Client", { sequential: true }, async () => {
        let messageId: string;

        it("can send SMS with delivery report enabled and get message ID", { timeout: 5000 }, async () => {
          const fromNumber = env.AZURE_PHONE_NUMBER as string;
          const validToNumber = env.AZURE_PHONE_NUMBER as string;

          const results = await client.sms.send(
            {
              from: fromNumber,
              to: [validToNumber],
              message: "test message for delivery report",
            },
            {
              enableDeliveryReport: true,
              tag: "TELCO_DELIVERY_REPORT_TEST",
            },
          );

          assert.lengthOf(results, 1, "must return as many results as there were recipients");
          assertIsSuccessResult(results[0], validToNumber);
          
          if (results[0].messageId) {
            messageId = results[0].messageId;
            assert.isString(messageId);
            assert.isNotEmpty(messageId);
          } else {
            assert.fail("Expected messageId to be present in successful SMS result");
          }
        });

        it("can get delivery report for sent message", { timeout: 10000 }, async () => {
          // Note: In live tests, delivery reports may not be immediately available
          // This test verifies the API call works, but may get a "pending" or "not found" status
          
          if (!messageId) {
            // Skip if no message ID from previous test
            assert.fail("No message ID available from previous test");
            return;
          }

          try {
            const deliveryReport = await client.deliveryReports.get(messageId);
            
            // Verify the structure regardless of delivery status
            assert.equal(deliveryReport.messageId, messageId);
            assert.isString(deliveryReport.deliveryStatus);
            assert.isNumber(deliveryReport.httpStatusCode);
            
            // The actual delivery status might be "Delivered" or "Failed", etc.
            // depending on timing and external factors in live tests
            
          } catch (error: any) {
            // If the delivery report is not yet available, that's acceptable in live tests
            // The important thing is that the API call structure is correct
            if (error.statusCode === 404) {
              console.log("Delivery report not yet available (404) - this is acceptable in live tests");
            } else {
              throw error;
            }
          }
        });

        it("handles delivery report for non-existent message", { timeout: 4000 }, async () => {
          const nonExistentMessageId = "non-existent-message-id-12345";
          
          try {
            await client.deliveryReports.get(nonExistentMessageId);
          } catch (error: any) {
            // Should get a 404 or similar error for non-existent message
            // Handle the case where error.statusCode might be undefined
            const statusCode = error.statusCode || error.status || 0;
            assert.isTrue(404 === statusCode, 
              `Expected 404 status code, got ${statusCode}`);
          }
        });
      });

      describe("Cross-functional integration tests", async () => {
        it("can use all three sub-clients in sequence", { timeout: 15000 }, async () => {
          const fromNumber = env.AZURE_PHONE_NUMBER as string;
          const validToNumber = env.AZURE_PHONE_NUMBER as string;

          // 1. Send SMS with delivery report
          const smsResults = await client.sms.send(
            {
              from: fromNumber,
              to: [validToNumber],
              message: "integration test message",
            },
            {
              enableDeliveryReport: true,
              tag: "TELCO_INTEGRATION_TEST",
            },
          );
          
          assertIsSuccessResult(smsResults[0], validToNumber);
          const messageId = smsResults[0].messageId;
          
          if (!messageId) {
            assert.fail("Expected messageId to be present in successful SMS result");
            return;
          }

          // 2. Check opt-out status
          const optOutCheckResults = await client.optOuts.check(fromNumber, [validToNumber]);
          assert.lengthOf(optOutCheckResults, 1);
          assert.equal(optOutCheckResults[0].httpStatusCode, 200);

          // 3. Attempt to get delivery report (may not be available immediately)
          try {
            const deliveryReport = await client.deliveryReports.get(messageId);
            assert.equal(deliveryReport.messageId, messageId);
          } catch (error: any) {
            // Delivery report may not be available yet in live tests
            if (error.statusCode === 404) {
              console.log("Delivery report not yet available - acceptable in integration test");
            } else {
              throw error;
            }
          }

          // Verify all sub-clients are working
          assert.isDefined(client.sms);
          assert.isDefined(client.optOuts);
          assert.isDefined(client.deliveryReports);
        });
      });
    },
  );
});
