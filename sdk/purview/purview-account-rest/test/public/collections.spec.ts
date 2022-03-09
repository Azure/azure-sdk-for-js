// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PurviewAccountRestClient } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("List collections", () => {
  let recorder: Recorder;
  let client: PurviewAccountRestClient;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available collections", async () => {
    const result = await client.path("/collections").get();

    if (result.status !== "200") {
      assert.fail(`GET "/collections" failed with ${result.status}`);
    }

    assert.isDefined(result.body.count);
    // assert(client);
  });
});
