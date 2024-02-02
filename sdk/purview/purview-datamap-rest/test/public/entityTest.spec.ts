// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { createClient } from "./utils/recordedClient";
import { createFileFromStream } from "../../src/index";
import fs from "fs";


describe("purview datamap entity test", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Import entity business metadata ", async function () {
	const client = await createClient(recorder);
   
	const response = await client.path("/atlas/v2/entity/businessmetadata/import").post({
	contentType: "multipart/form-data",
	body: {
		file: createFileFromStream(() => fs.createReadStream("test/public/template_2.csv"), "template_2.csv"),
	}
	});
	assert.strictEqual(response.status, "200");

  });
});
