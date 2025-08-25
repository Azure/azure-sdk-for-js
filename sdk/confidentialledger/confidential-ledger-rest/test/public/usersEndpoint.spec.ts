// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfidentialLedgerClient } from "@azure-rest/confidential-ledger";
import { isUnexpected } from "@azure-rest/confidential-ledger";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Get user", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should obtain user data", { skip: !env.AZURE_CLIENT_OID }, async () => {
    // If using a test app, it needs to be the oid.
    const userId = env.AZURE_CLIENT_OID;
    const result = await client.path("/app/users/{userId}", userId!).get();
    assert.equal(result.status, "200");

    if (isUnexpected(result)) {
      throw result.body;
    }

    assert.equal(result.body.userId, userId);
  });

  it("should list all user data", { skip: !env.AZURE_CLIENT_OID }, async () => {
    // If using a test app, it needs to be the oid.
    const userId = env.AZURE_CLIENT_OID;
    const result = await client.path("/app/users").get();
    assert.equal(result.status, "200");

    if (isUnexpected(result)) {
      throw result.body;
    }

    assert.equal(result.body.ledgerUsers?.length, 1);
    assert.isNotNull(result.body.ledgerUsers);
    assert.equal(result.body.ledgerUsers![0].userId, userId);
  });
});
