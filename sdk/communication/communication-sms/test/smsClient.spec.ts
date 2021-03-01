// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { SmsClient, SmsSendRequest, SmsSendOptions } from "../src/smsClient";
import { env, isPlaybackMode, record, Recorder } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import * as sinon from "sinon";
import { Uuid } from "../src/utils/uuid";
import { recorderConfiguration } from "./utils/recordedClient";

if (isNode) {
  dotenv.config();
}

describe("SmsClient", async () => {
  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderConfiguration);
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

  it("sends a SMS message to multiple recipients", async () => {
    const connectionString = env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING as string;
    const fromNumber = env.AZURE_PHONE_NUMBER as string;
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    const invalidToNumber = "+18332321226444";

    const recipients = [validToNumber, invalidToNumber];

    const smsClient = new SmsClient(connectionString);

    const request: SmsSendRequest = {
      from: fromNumber,
      to: recipients,
      message: "test message"
    };

    const options: SmsSendOptions = {
      enableDeliveryReport: true,
      tag: "SMS_LIVE_TEST"
    };

    const results = await smsClient.send(request, options);
    assert.lengthOf(
      results,
      recipients.length,
      "must return as many results as there were recipients"
    );

    const validNumberResult = results[0];
    assert.equal(validNumberResult.httpStatusCode, 202);
    assert.equal(validNumberResult.to, validToNumber);
    assert.isString(validNumberResult.messageId);
    assert.isTrue(validNumberResult.successful);
    assert.isNull(validNumberResult.errorMessage);

    const invalidNumberResult = results[1];
    assert.equal(invalidNumberResult.httpStatusCode, 400);
    assert.equal(invalidNumberResult.to, invalidToNumber);
    assert.isNull(invalidNumberResult.messageId, "no message id for errors");
    assert.isFalse(invalidNumberResult.successful);
    assert.isNotNull(invalidNumberResult.errorMessage);
  });

  it("throws an exception when sending from a number you don't own", async () => {
    const connectionString = env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING as string;

    const fromNumber = "+18332143356"; //how can we ensure we don't own this? Use a number with inbound only? Is that such a thing?
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    const smsClient = new SmsClient(connectionString);

    const request: SmsSendRequest = {
      from: fromNumber,
      to: [validToNumber],
      message: "test message"
    };

    const options: SmsSendOptions = {
      enableDeliveryReport: true,
      tag: "SMS_LIVE_TEST"
    };
    assert.isTrue(true);

    try {
      await smsClient.send(request, options);
      assert.fail("Should have thrown an error");
    } catch (e) {
      assert.equal(e.statusCode, 401);
    }
  });

  it("throws an exception when sending from a number with invalid format", async () => {
    const connectionString = env.AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING as string;

    const fromNumber = "+183323212219"; //how can we ensure we don't own this? Use a number with inbound only? Is that such a thing?
    const validToNumber = env.AZURE_PHONE_NUMBER as string;
    const smsClient = new SmsClient(connectionString);

    const request: SmsSendRequest = {
      from: fromNumber,
      to: [validToNumber],
      message: "test message"
    };

    const options: SmsSendOptions = {
      enableDeliveryReport: true,
      tag: "SMS_LIVE_TEST"
    };
    assert.isTrue(true);

    try {
      await smsClient.send(request, options);
      assert.fail("Should have thrown an error");
    } catch (e) {
      assert.equal(e.statusCode, 400);
    }
  });
});
