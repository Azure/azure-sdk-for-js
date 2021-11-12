// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { PurviewAccountRestClient } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";

describe("Get account info", () => {
  let recorder: Recorder;
  let client: PurviewAccountRestClient;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should get the account info", async () => {
    const result = await client.path("/").get();

    if (result.status !== "200") {
      assert.fail(`GET "/" failed with ${result.status}`);
    }

    assert.isDefined(result.body);
  });
});
