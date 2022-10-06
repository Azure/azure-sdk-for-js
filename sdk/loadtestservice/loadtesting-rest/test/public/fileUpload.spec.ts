// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder, createClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { AzureLoadTestingClient } from "../../src";
import { createReadStream } from "fs";

describe("File Upload", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const readStream = createReadStream("./sample.jmx");

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should upload the test file", async () => {
    const result = await client.path("/loadtests/{testId}/files/{fileId}", "abc", "xyz12365").put({
      contentType: "multipart/form-data",
      body: {
        file: readStream,
      },
    });

    assert.include(["201"], result.status);
  });
});
