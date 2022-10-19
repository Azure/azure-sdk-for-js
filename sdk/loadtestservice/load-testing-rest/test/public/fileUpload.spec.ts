// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { AzureLoadTestingClient } from "../../src";
import * as fs from "fs";
import { isNode } from "@azure/core-util";

describe("File Upload", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  let readStream: fs.ReadStream;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    if (!isNode || isPlaybackMode()) {
      this.skip();
    }
    client = createClient(recorder);
    readStream = fs.createReadStream("./test/public/sample.jmx");
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
