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

  it("can list all acquired phone numbers", async function() {
    for await (const acquired of client.listPhoneNumbers()) {
      assert.match(acquired.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
      all++;
    }

    assert.isTrue(all > 0);
  });

  it("can skip a phone number", async function() {
    let countWhenSkipped = 0;
    for await (const acquired of client.listPhoneNumbers({ skip: 1 })) {
      assert.match(acquired.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
      countWhenSkipped++;
    }

    assert.isTrue(countWhenSkipped > 0);
    assert.isTrue(countWhenSkipped < all);
  });

  // TODO: revisit when service returns nextLink
  it("can list by page", async function() {
    for await (const page of client.listPhoneNumbers().byPage()) {
      assert.isArray(page);

      for (const acquired of page) {
        assert.match(acquired.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
      }
    }
  });
});
