// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Recorder } from "@azure/test-utils-recorder";
import { PhoneNumberAdministrationClient } from "../src";
import { createRecordedPhoneNumberAdministrationClient } from "./utils/recordedClient";

xdescribe("PhoneNumberAdministrationClient [Playback/Live]", function() {
  let recorder: Recorder;
  let client: PhoneNumberAdministrationClient;

  beforeEach(function() {
    ({ client, recorder } = createRecordedPhoneNumberAdministrationClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("successfully updates the capabilities for a list of phone numbers", async function() {
    const { capabilitiesUpdateId } = await client.updatePhoneNumbersCapabilities({
      "+17771234567": { add: ["Calling"] }
    });
    assert.isString(capabilitiesUpdateId);
  });
});
