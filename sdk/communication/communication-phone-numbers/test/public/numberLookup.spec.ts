// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PhoneNumbersClient } from "@azure/communication-phone-numbers";
import { createRecordedClient } from "./utils/recordedClient.js";
import { getPhoneNumber } from "./utils/testPhoneNumber.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe(`PhoneNumbersClient - look up phone number`, () => {
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedClient(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can look up a phone number", { timeout: 60000 }, async () => {
    const phoneNumbers = [getPhoneNumber()];
    const operatorInformation = await client.searchOperatorInformation(phoneNumbers);

    const resultPhoneNumber = operatorInformation.values
      ? operatorInformation.values[0].phoneNumber
      : "";
    assert.strictEqual(resultPhoneNumber, phoneNumbers[0]);
  });

  it("errors if multiple phone numbers are requested", { timeout: 60000 }, async () => {
    const phoneNumbers = [getPhoneNumber(), getPhoneNumber()];
    try {
      await client.searchOperatorInformation(phoneNumbers);
    } catch (error: any) {
      assert.strictEqual(error.code, "BadRequest");
      assert.strictEqual(error.message, "Can only accept one phoneNumber");
    }
  });

  it("respects includeAdditionalOperatorDetails option", { timeout: 60000 }, async () => {
    const phoneNumbers = [getPhoneNumber()];

    let operatorInformation = await client.searchOperatorInformation(phoneNumbers, {
      includeAdditionalOperatorDetails: false,
    });
    let resultPhoneNumber = operatorInformation.values
      ? operatorInformation.values[0].phoneNumber
      : "";
    assert.strictEqual(resultPhoneNumber, phoneNumbers[0]);
    assert.isNotNull(
      operatorInformation.values ? operatorInformation.values[0].nationalFormat : null,
    );
    assert.isNotNull(
      operatorInformation.values ? operatorInformation.values[0].internationalFormat : null,
    );
    assert.isNull(operatorInformation.values ? operatorInformation.values[0].isoCountryCode : null);
    assert.isNull(operatorInformation.values ? operatorInformation.values[0].numberType : null);
    assert.isNull(
      operatorInformation.values ? operatorInformation.values[0].operatorDetails : null,
    );

    operatorInformation = await client.searchOperatorInformation(phoneNumbers, {
      includeAdditionalOperatorDetails: true,
    });
    resultPhoneNumber = operatorInformation.values ? operatorInformation.values[0].phoneNumber : "";
    assert.strictEqual(resultPhoneNumber, phoneNumbers[0]);
    assert.isNotNull(
      operatorInformation.values ? operatorInformation.values[0].nationalFormat : null,
    );
    assert.isNotNull(
      operatorInformation.values ? operatorInformation.values[0].internationalFormat : null,
    );
    assert.isNotNull(
      operatorInformation.values ? operatorInformation.values[0].isoCountryCode : null,
    );
    assert.isNotNull(operatorInformation.values ? operatorInformation.values[0].numberType : null);
    assert.isNotNull(
      operatorInformation.values ? operatorInformation.values[0].operatorDetails : null,
    );
  });
});
