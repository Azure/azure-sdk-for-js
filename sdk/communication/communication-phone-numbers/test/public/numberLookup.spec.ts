// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient } from "../../src";
import { createRecordedClient } from "./utils/recordedClient";
import { getPhoneNumber } from "./utils/testPhoneNumber";

describe(`PhoneNumbersClient - look up phone number`, function () {
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can look up a phone number", async function (this: Context) {
    const phoneNumbers = [getPhoneNumber()];
    const operatorInformation = await client.searchOperatorInformation(phoneNumbers);

    const resultPhoneNumber = operatorInformation.values
      ? operatorInformation.values[0].phoneNumber
      : "";
    assert.strictEqual(resultPhoneNumber, phoneNumbers[0]);
  }).timeout(60000);

  it("errors if multiple phone numbers are requested", async function () {
    const phoneNumbers = [getPhoneNumber(), getPhoneNumber()];
    try {
      await client.searchOperatorInformation(phoneNumbers);
    } catch (error: any) {
      assert.strictEqual(error.code, "BadRequest");
      assert.strictEqual(error.message, "Can only accept one phoneNumber");
    }
  }).timeout(60000);

  it("respects includeAdditionalOperatorDetails option", async function (this: Context) {
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
  }).timeout(60000);
});
