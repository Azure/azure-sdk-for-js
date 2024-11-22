// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient.js";
import { assert } from "chai";
import type { Context } from "mocha";
import { createClient } from "./utils/recordedClient.js";
import { isUnexpected } from "../../src/isUnexpected.js";

describe("purview datamap glossary test", () => {
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should get glossary", async () => {
    const client = await createClient(recorder);
    const result = await client.path("/atlas/v2/glossary").get();

    assert.strictEqual(isUnexpected(result), false);
  });
}).timeout(60000000000);
