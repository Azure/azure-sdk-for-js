import { assert } from "chai";
import { SmsSendRequest, SmsSendOptions, SmsSendResult } from "../../../src/smsClient";
import { env } from "@azure/test-utils-recorder";
import { Context } from "mocha";

export default function suites () {
    // helper functions
    const expectSuccessResult = (actualSmsResult: SmsSendResult, expectedRecipient: string): void => {
      assert.equal(actualSmsResult.httpStatusCode, 202);
      assert.equal(actualSmsResult.to, expectedRecipient);
      assert.isString(actualSmsResult.messageId);
      assert.isTrue(actualSmsResult.successful);
      assert.notExists(actualSmsResult.errorMessage, "no error message for success");
  };

  const expectFailureResult = (
      actualSmsResult: SmsSendResult,
      expectedRecipient: string,
      expectedErrorMessage: string
  ): void => {
      assert.equal(actualSmsResult.httpStatusCode, 400);
      assert.equal(actualSmsResult.to, expectedRecipient);
      assert.notExists(actualSmsResult.messageId, "no message id for errors");
      assert.isFalse(actualSmsResult.successful);
      assert.equal(actualSmsResult.errorMessage, expectedErrorMessage);
  };

  it("can send an SMS message", async function (this: Context) {
      const fromNumber = env.AZURE_PHONE_NUMBER as string;
      const validToNumber = env.AZURE_PHONE_NUMBER as string;
      const results = await this.smsClient.send({
        from: fromNumber,
        to: [validToNumber],
        message: "test message"
      });
  
      assert.lengthOf(results, 1, "must return as many results as there were recipients");
      expectSuccessResult(results[0], validToNumber);
    });
  
    it("can send an SMS message with options passed in", async function (this: Context) {
      const fromNumber = env.AZURE_PHONE_NUMBER as string;
      const validToNumber = env.AZURE_PHONE_NUMBER as string;
      const results = await this.smsClient.send(
        {
          from: fromNumber,
          to: [validToNumber],
          message: "test message"
        },
        {
          enableDeliveryReport: true,
          tag: "SMS_LIVE_TEST"
        }
      );
  
      assert.lengthOf(results, 1, "must return as many results as there were recipients");
      expectSuccessResult(results[0], validToNumber);
    });
  
    // This runs in live mode only
    it("sends a new message each time send is called", async function(this: Context) {
      const fromNumber = env.AZURE_PHONE_NUMBER as string;
      const validToNumber = env.AZURE_PHONE_NUMBER as string;
  
      const sendRequest: SmsSendRequest = {
        from: fromNumber,
        to: [validToNumber],
        message: "test message"
      };
      const options: SmsSendOptions = {
        enableDeliveryReport: true,
        tag: "SMS_LIVE_TEST"
      };
  
      const firstResults = await this.smsClient.send(sendRequest, options);
      const secondResults = await this.smsClient.send(sendRequest, options);
  
      expectSuccessResult(firstResults[0], validToNumber);
      expectSuccessResult(secondResults[0], validToNumber);
      assert.notEqual(firstResults[0].messageId, secondResults[0].messageId);
    });
  
    it("can send an SMS message to multiple recipients", async function (this: Context) {
      const fromNumber = env.AZURE_PHONE_NUMBER as string;
      const validToNumber = env.AZURE_PHONE_NUMBER as string;
      const invalidToNumber = "+1425555012345"; // invalid number that's too long
      const recipients = [validToNumber, invalidToNumber];
  
      const results = await this.smsClient.send({
        from: fromNumber,
        to: recipients,
        message: "test message"
      });
  
      assert.lengthOf(
        results,
        recipients.length,
        "must return as many results as there were recipients"
      );
  
      expectSuccessResult(results[0], validToNumber);
      expectFailureResult(results[1], invalidToNumber, "Invalid To phone number format.");
    });
  
    it("throws an exception when sending from a number you don't own", async function (this: Context) {
      const fromNumber = "+14255550123";
      const validToNumber = env.AZURE_PHONE_NUMBER as string;
      try {
        await this.smsClient.send(
          {
            from: fromNumber,
            to: [validToNumber],
            message: "test message"
          },
          {
            enableDeliveryReport: true,
            tag: "SMS_LIVE_TEST"
          }
        );
        assert.fail("Should have thrown an error");
      } catch (e) {
        assert.equal(e.statusCode, 404);
      }
    });
  
    it("throws an exception when sending from an invalid number", async function (this: Context) {
      const fromNumber = "+1425555012345"; // invalid number that's too long
      const validToNumber = env.AZURE_PHONE_NUMBER as string;
      try {
        await this.smsClient.send(
          {
            from: fromNumber,
            to: [validToNumber],
            message: "test message"
          },
          {
            enableDeliveryReport: true,
            tag: "SMS_LIVE_TEST"
          }
        );
        assert.fail("Should have thrown an error");
      } catch (e) {
        assert.equal(e.statusCode, 400);
      }
    });
}