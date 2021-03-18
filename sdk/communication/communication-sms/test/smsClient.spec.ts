// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { SmsClient, SmsSendRequest, SmsSendOptions, SmsSendResult } from "../src/smsClient";
import { env, isPlaybackMode, record, Recorder } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import * as sinon from "sinon";
import { Uuid } from "../src/utils/uuid";
import { recorderConfiguration } from "./utils/recordedClient";

if (isNode) {
  dotenv.config();
}

describe("SmsClient [Playback/Live]", async () => {
  let recorder: Recorder;
  let smsClient: SmsClient;

  beforeEach(async function() {
    recorder = record(this, recorderConfiguration);
    smsClient = new SmsClient(env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING as string);
    if (isPlaybackMode()) {
      sinon.stub(Uuid, "generateUuid").returns("sanitized");
      sinon.stub(Date, "now").returns(0);
    }
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
    if (isPlaybackMode()) {
      sinon.restore();
    }
  });

  //helper functions
  const expectSuccessResult = (actualSmsResult: SmsSendResult, expectedRecipient: string) => {
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
  ) => {
    assert.equal(actualSmsResult.httpStatusCode, 400);
    assert.equal(actualSmsResult.to, expectedRecipient);
    assert.notExists(actualSmsResult.messageId, "no message id for errors");
    assert.isFalse(actualSmsResult.successful);
    assert.equal(actualSmsResult.errorMessage, expectedErrorMessage);
  };

  it("can send an SMS message", async () => {
    const fromNumber = env.AZURE_PHONE_NUMBER as string;
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    const results = await smsClient.send({
      from: fromNumber,
      to: [validToNumber],
      message: "test message"
    });

    assert.lengthOf(results, 1, "must return as many results as there were recipients");
    expectSuccessResult(results[0], validToNumber);
  });

  it("can send an SMS message with options passed in", async () => {
    const fromNumber = env.AZURE_PHONE_NUMBER as string;
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    const results = await smsClient.send(
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

  it("sends a new message each time send is called", async function() {
    if (isPlaybackMode()) {
      this.skip();
    }
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

    const firstResults = await smsClient.send(sendRequest, options);
    const secondResults = await smsClient.send(sendRequest, options);

    expectSuccessResult(firstResults[0], validToNumber);
    expectSuccessResult(secondResults[0], validToNumber);
    assert.notEqual(firstResults[0].messageId, secondResults[0].messageId);
  });

  it("can send an SMS message to multiple recipients", async () => {
    const fromNumber = env.AZURE_PHONE_NUMBER as string;
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    const invalidToNumber = "+1425555012345"; //invalid number that's too long
    const recipients = [validToNumber, invalidToNumber];

    const results = await smsClient.send({
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

  it("throws an exception when sending from a number you don't own", async () => {
    const fromNumber = "+14255550123";
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    try {
      await smsClient.send(
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

  it("throws an exception when sending from an invalid number", async () => {
    const fromNumber = "+1425555012345"; //invalid number that's too long
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    try {
      await smsClient.send(
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
});
