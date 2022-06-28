// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConfidentialLedgerClient, isUnexpected } from "../../src";
import { Recorder, env } from "@azure-tools/test-recorder";
import { createClient, createRecorder } from "./utils/recordedClient";

import { Context } from "mocha";
import { assert } from "chai";

describe("Get user", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    client = await createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should obtain user data", async function () {
    // if the ledger in the .env changes, so should this
    const userId = env.USER_ID;
    var result = await client.path("/app/users/{userId}", userId).get();
    assert.equal(result.status, "200");

    if (isUnexpected(result)) {
      throw result.body;
    }

    assert.equal(result.body.userId, userId);
  });
});
