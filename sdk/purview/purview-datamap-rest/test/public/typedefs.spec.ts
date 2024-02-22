// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { createRecorder } from "./utils/recordedClient";

describe("purview datamap typedefs test", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available typedefs sources", async () => {
	const client = await createClient(recorder);
    const result = await client.path("/atlas/v2/types/typedefs").get();

    
	assert.strictEqual(result.status, "200");

  });
}).timeout(60000000000);
