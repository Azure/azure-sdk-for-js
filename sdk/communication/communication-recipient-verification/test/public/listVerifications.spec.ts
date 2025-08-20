// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { RecipientVerificationClient } from "@azure-tools/communication-recipient-verification";
import { createRecordedClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe(`RecipientVerificationClient - List all verifications`, () => {
  let recorder: Recorder;
  let client: RecipientVerificationClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedClient(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("get list of all verifications", { timeout: 30000 }, async () => {
    // print all verifications
    for (const verification of await client.getVerifications()) {
      assert.isNotNull(verification.immutableId);
    }
  });
});
