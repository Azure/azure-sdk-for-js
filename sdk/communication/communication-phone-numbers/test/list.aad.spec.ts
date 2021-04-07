// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import {
  canCreateRecordedClientWithToken,
  createRecordedClientWithToken
} from "./utils/recordedClient";

describe("PhoneNumbersClient - lists [AAD]", function() {
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  before(function(this: Context) {
    if (!canCreateRecordedClientWithToken()) {
      this.skip();
    }
  });

  beforeEach(function(this: Context) {
    const recordedClient = createRecordedClientWithToken(this);
    ({ client, recorder } = recordedClient!);
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can list all purchased phone numbers", async function() {
    let all = 0;
    for await (const purchased of client.listPurchasedPhoneNumbers()) {
      assert.match(purchased.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
      all++;
    }

    assert.isTrue(all > 0);
  }).timeout(20000);

  it("can skip a phone number", async function() {
    let all = 0;
    let countWhenSkipped = 0;

    for await (const purchased of client.listPurchasedPhoneNumbers()) {
      assert.match(purchased.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
      all++;
    }
    assert.isTrue(all > 0);

    for await (const purchased of client.listPurchasedPhoneNumbers({ skip: 1 })) {
      assert.match(purchased.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
      countWhenSkipped++;
    }

    assert.isTrue(countWhenSkipped > 0);
    assert.equal(countWhenSkipped, all - 1);
  }).timeout(20000);

  // TODO: revisit when service returns nextLink
  it("can list by page", async function() {
    for await (const page of client.listPurchasedPhoneNumbers().byPage()) {
      assert.isArray(page);

      for (const purchased of page) {
        assert.match(purchased.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
      }
    }
  }).timeout(20000);
});
