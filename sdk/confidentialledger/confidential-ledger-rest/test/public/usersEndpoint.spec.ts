// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ConfidentialLedgerClient, isUnexpected } from "../../src";
import { Recorder, env } from "@azure-tools/test-recorder";
import { createClient, createRecorder } from "./utils/recordedClient";

import { Context } from "mocha";
import { assert } from "chai";

describe("Get user", function () {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should obtain user data", async function () {
    // If using a test app, it needs to be the oid.
    const userId = env.AZURE_CLIENT_OID;
    if (!userId) {
      this.skip();
    }
    const result = await client.path("/app/users/{userId}", userId).get();
    assert.equal(result.status, "200");

    if (isUnexpected(result)) {
      throw result.body;
    }

    assert.equal(result.body.userId, userId);
  });
});
