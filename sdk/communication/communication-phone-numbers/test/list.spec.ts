// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient - lists", function() {
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  beforeEach(function(this: Context) {
    ({ client, recorder } = createRecordedClient(this));
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
});
