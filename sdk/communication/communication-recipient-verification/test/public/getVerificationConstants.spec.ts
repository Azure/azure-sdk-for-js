// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "mocha";
import type { Recorder } from "@azure-tools/test-recorder";
import type { RecipientVerificationClient } from "../../src/index.js";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient.js";

describe(`RecipientVerificationClient - Get verification constants`, function () {
  let recorder: Recorder;
  let client: RecipientVerificationClient;

  beforeEach(async function (ctx) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (ctx) {
    if (!ctx.task.pending) {
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
