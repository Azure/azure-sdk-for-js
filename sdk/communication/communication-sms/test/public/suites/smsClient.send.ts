// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { SmsSendRequest, SmsSendOptions } from "../../../src";
import { env } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { assertIsFailureResult, assertIsSuccessResult } from "../utils/assertHelpers";

export default function testCases(): void {
  it("can send an SMS message", async function (this: Context) {
    const fromNumber = env.AZURE_PHONE_NUMBER as string;
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    const results = await this.smsClient.send({
      from: fromNumber,
      to: [validToNumber],
      message: "test message",
    });

    assert.lengthOf(results, 1, "must return as many results as there were recipients");
    assertIsSuccessResult(results[0], validToNumber);
  }).timeout(4000);

  it("can send an SMS message with options passed in", async function (this: Context) {
    const fromNumber = env.AZURE_PHONE_NUMBER as string;
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    const results = await this.smsClient.send(
      {
        from: fromNumber,
        to: [validToNumber],
        message: "test message",
      },
      {
        enableDeliveryReport: true,
        tag: "SMS_LIVE_TEST",
      }
    );

    assert.lengthOf(results, 1, "must return as many results as there were recipients");
    assertIsSuccessResult(results[0], validToNumber);
  }).timeout(4000);

  it("sends a new message each time send is called", async function (this: Context) {
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

    const firstResults = await this.smsClient.send(sendRequest, options);
    const secondResults = await this.smsClient.send(sendRequest, options);

    assertIsSuccessResult(firstResults[0], validToNumber);
    assertIsSuccessResult(secondResults[0], validToNumber);
    assert.notEqual(firstResults[0].messageId, secondResults[0].messageId);
  }).timeout(4000);

  it("can send an SMS message to multiple recipients", async function (this: Context) {
    const fromNumber = env.AZURE_PHONE_NUMBER as string;
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    const invalidToNumber = "+1425555012345"; // invalid number that's too long
    const recipients = [validToNumber, invalidToNumber];

    const results = await this.smsClient.send({
      from: fromNumber,
      to: recipients,
      message: "test message",
    });

    assert.lengthOf(
      results,
      recipients.length,
      "must return as many results as there were recipients"
    );

    assertIsSuccessResult(results[0], validToNumber);
    assertIsFailureResult(results[1], invalidToNumber, "Invalid To phone number format.");
  }).timeout(4000);

  it("throws an exception when sending from a number you don't own", async function (this: Context) {
    const fromNumber = "+14255550123";
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    try {
      await this.smsClient.send(
        {
          from: fromNumber,
          to: [validToNumber],
          message: "test message",
        },
        {
          enableDeliveryReport: true,
          tag: "SMS_LIVE_TEST",
        }
      );
      assert.fail("Should have thrown an error");
    } catch (e: any) {
      assert.equal(e.statusCode, 401);
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
          message: "test message",
        },
        {
          enableDeliveryReport: true,
          tag: "SMS_LIVE_TEST",
        }
      );
      assert.fail("Should have thrown an error");
    } catch (e: any) {
      assert.equal(e.statusCode, 400);
    }
  });
}
