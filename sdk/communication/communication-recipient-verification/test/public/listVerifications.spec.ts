// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "mocha";
import type { Recorder } from "@azure-tools/test-recorder";
import type { RecipientVerificationClient } from "../../src/index.js";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient.js";

describe(`RecipientVerificationClient - List all verifications`, function () {
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

  it("get list of all verifications", async function () {
    // print all verifications
    for (const verification of await client.getVerifications()) {
      assert.isNotNull(verification.immutableId);
    }
  }).timeout(30000);
});
