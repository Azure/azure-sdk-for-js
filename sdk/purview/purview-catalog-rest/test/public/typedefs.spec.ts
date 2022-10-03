// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PurviewCatalogClient } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient } from "./utils/recordedClient";
import { Context } from "mocha";

describe("purview catalog tepedefs test", () => {
  let recorder: Recorder;
  let client: PurviewCatalogClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available typedefs sources", async () => {
    const result = await client.path("/atlas/v2/types/typedefs").get();

    // console.dir(result);
    if (result.status !== "200") {
      assert.fail(`GET "/atlas/v2/types/typedefs" failed with ${result.status}`);
    }

    assert.isDefined(result.body.entityDefs?.length);
  });
}).timeout(60000000000);
