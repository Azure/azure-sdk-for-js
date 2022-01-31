// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { DocumentTranslatorClient } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient } from "./utils/recordedClient";

describe("List Document Formats", () => {
  let recorder: Recorder;
  let client: DocumentTranslatorClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available document formats", async () => {
    const result = await client.path("/documents/formats").get();
    if (result.status !== "200") {
      assert.fail(`GET "/documents/formats" failed with ${result.status}`);
    }

    assert.isTrue(result.body.value.length > 0);
  });
});
