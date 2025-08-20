// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { RecipientVerificationClient } from "@azure-tools/communication-recipient-verification";
import { createRecordedClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe(`RecipientVerificationClient - Get verification constants`, () => {
  let recorder: Recorder;
  let client: RecipientVerificationClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedClient(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("get verification constants", { timeout: 30000 }, async () => {
    const verificationConstants = await client.getVerificationConstants();
    assert.isNotNull(verificationConstants.currentNumberOfVerifications);
    assert.isNotNull(verificationConstants.maxRetriesAllowed);
    assert.isNotNull(verificationConstants.maxVerificationsAllowed);
  });
});
