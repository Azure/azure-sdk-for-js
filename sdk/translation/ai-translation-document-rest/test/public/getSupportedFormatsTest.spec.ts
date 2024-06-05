// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { DocumentTranslationClient, isUnexpected } from "../../src";
import { createDocumentTranslationClient, startRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("GetSupportedFormats tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("all formats", async () => {
    const response = await client.path("/document/formats").get();
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const fileFormatTypes = response.body;
    fileFormatTypes.value.forEach(fileFormatType => {
      assert.isTrue(fileFormatType.format !== null);
      assert.isTrue(fileFormatType.contentTypes !== null);
      assert.isTrue(fileFormatType.fileExtensions !== null);
    });
    
  });
});
