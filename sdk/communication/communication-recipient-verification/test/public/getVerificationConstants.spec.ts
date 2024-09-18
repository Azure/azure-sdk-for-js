// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { RecipientVerificationClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";

describe(`RecipientVerificationClient - Get verification constants`, function () {
  let recorder: Recorder;
  let client: RecipientVerificationClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("get verification constants", async function () {
    const verificationConstants = await client.getVerificationConstants();
    assert.isNotNull(verificationConstants.currentNumberOfVerifications);
    assert.isNotNull(verificationConstants.maxRetriesAllowed);
    assert.isNotNull(verificationConstants.maxVerificationsAllowed);
  }).timeout(30000);
});
