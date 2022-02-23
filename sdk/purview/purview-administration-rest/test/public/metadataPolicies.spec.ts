// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PurviewMetadataPolicies } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createMetadataClient } from "./utils/recordedClient";
import { Context } from "mocha";

describe("List Metadata", () => {
  let recorder: Recorder;
  let client: PurviewMetadataPolicies.Client.PurviewMetadataPoliciesRestClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createMetadataClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available metdataPolicies", async () => {
    const result = await client.path("/metadataPolicies").get();

    if (result.status !== "200") {
      console.log(result.request.url);
      assert.fail(`GET "/metadataPolicies" failed with ${result.status}`);
    }

    assert.isDefined(result.body.values.length);
  });
});
