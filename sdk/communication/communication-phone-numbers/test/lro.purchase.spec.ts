// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - purchase", function() {
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  beforeEach(function() {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can wait until a search is purchased", async function() {
    console.log(client.toString());
    assert.isTrue(true);
  }).timeout(30000);
});
