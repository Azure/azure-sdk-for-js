// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PurviewCatalogClient } from "../../src";
import { Recorder } from "@azure/test-utils-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("List typedefs sources", () => {
  let recorder: Recorder;
  let client: PurviewCatalogClient;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available typedefs sources", async () => {
    const result = await client.path("/atlas/v2/types/typedefs").get();

    if (result.status !== "200") {
      assert.fail(`GET "/atlas/v2/types/typedefs" failed with ${result.status}`);
    }

    assert.equal(result.body.entityDefs?.length, 334);
  });
});
