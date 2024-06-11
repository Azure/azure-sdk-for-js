// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { DocumentTranslationClient } from "../../src";
import { ONE_TEST_DOCUMENTS, createDocumentTranslationClient, createSourceContainer, createTargetContainer, startRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("CancelTranslation tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it.only("cancel translation", async () => {
    const sourceUrl = await createSourceContainer(ONE_TEST_DOCUMENTS);
    console.log(sourceUrl);

    const targetURL = await createTargetContainer(ONE_TEST_DOCUMENTS);
    console.log(targetURL);
    assert.isTrue(targetURL !== null);

    const response = await client.path("/document/formats").get();
    assert.equal(response.status, "200");
  });
  
});
