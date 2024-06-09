// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { RecipientVerificationClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";

describe(`RecipientVerificationClient - List all verifications`, function () {
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

  it("get list of all verifications", async function () {
    // print all verifications
    for (const verification of await client.getVerifications()) {
      assert.isNotNull(verification.immutableId);
    }
  }).timeout(30000);
});
