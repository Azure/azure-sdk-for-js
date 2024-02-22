// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Recorder } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient";
import { assert } from "chai";
import { Context } from "mocha";
import { createClient } from "./utils/recordedClient";

describe("purview datamap glossary test", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should get glossary", async () => {
    const client = await createClient(recorder);
    const result = await client.path("/atlas/v2/glossary").get();

    console.log("returned result: ", result);
    assert.strictEqual(result.status, "200");
  });
}).timeout(60000000000);
