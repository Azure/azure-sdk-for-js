// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient - lists", function() {
  let recorder: Recorder;
  let client: PhoneNumbersClient;
  let all = 0;

  beforeEach(function() {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can list all purchased phone numbers", async function() {
    for await (const purchased of client.listPurchasedPhoneNumbers()) {
      assert.match(purchased.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
      all++;
    }

    assert.isTrue(all > 0);
  }).timeout(10000);

  it("can skip a phone number", async function() {
    let countWhenSkipped = 0;
    for await (const purchased of client.listPurchasedPhoneNumbers({ skip: 1 })) {
      assert.match(purchased.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
      countWhenSkipped++;
    }

    assert.isTrue(countWhenSkipped > 0);
    assert.isTrue(countWhenSkipped < all);
  }).timeout(10000);

  it("can list by page", async function() {
    for await (const page of client.listPurchasedPhoneNumbers().byPage()) {
      assert.isArray(page);

      for (const purchased of page) {
        assert.match(purchased.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
      }
    }
  }).timeout(10000);
});
