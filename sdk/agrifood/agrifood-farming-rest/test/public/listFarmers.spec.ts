// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { FarmBeatsRestClient } from "../../src";
import { Recorder } from "@azure/test-utils-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("List farmers", () => {
  let recorder: Recorder;
  let client: FarmBeatsRestClient;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all farmers", async () => {
    const result = await client.path("/farmers").get();

    if (result.status !== "200") {
      assert.fail(`GET "/farmers" failed with ${result.status}`);
    }

    assert.isDefined(result.body.value?.length);
  });
});
