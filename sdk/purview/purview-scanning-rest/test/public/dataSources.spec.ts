// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PurviewScanningRestClient } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("List data sources", () => {
  let recorder: Recorder;
  let client: PurviewScanningRestClient;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available data sources", async () => {
    const result = await client.path("/datasources").get();

    if (result.status !== "200") {
      assert.fail(`GET "/datasources" failed with ${result.status}`);
    }

    assert.isDefined(result.body.value?.length);
  });
});
