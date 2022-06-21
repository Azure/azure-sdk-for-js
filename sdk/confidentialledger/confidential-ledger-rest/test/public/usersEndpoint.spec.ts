// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConfidentialLedgerRestClient, GetUser200Response } from "../../src";
import { Recorder, env } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("Get user", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerRestClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    client = await createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // TODO: add subLedgerIds test

  it("should obtain user data", async function () {
    // if the ledger in the .env changes, so should this
    const userId = env.USER_ID;
    var result = await client.path("/app/users/{userId}", userId).get();
    assert.equal(result.status, "200");
  
    result = result as GetUser200Response;

    assert.equal(result.body.userId, userId);
  });
});
