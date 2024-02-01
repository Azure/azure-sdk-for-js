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

  it("Should create a glossary", async () => {
	const client = await createClient(recorder);
	const glossaryName = "jsTesting-1";
    const glossary = await client.path("/atlas/v2/glossary").post({
      body: {
        name: glossaryName,
        shortDescription: "Example Short Description",
        longDescription: "Example Long Description",
        language: "en",
        usage: "Example Glossary",
      },
    });

    console.log("created glossary: ", glossary);
    assert.strictEqual(glossary.status, "200");
  });

}).timeout(60000000000);
