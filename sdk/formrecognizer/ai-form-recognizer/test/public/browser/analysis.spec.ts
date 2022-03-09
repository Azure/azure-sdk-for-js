// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { AzureKeyCredential, PrebuiltModels, DocumentAnalysisClient } from "../../../src";
import { env, Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient, testEnv, testPollingOptions } from "../../utils/recordedClients";

describe("FormRecognizerClient browser only", () => {
  let client: DocumentAnalysisClient;
  let recorder: Recorder;
  const apiKey = new AzureKeyCredential(testEnv.FORM_RECOGNIZER_API_KEY);

  beforeEach(function (this: Context) {
    ({ recorder, client } = createRecordedClient(this, DocumentAnalysisClient, apiKey));
  });

  afterEach(async function () {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("recognizes content from a url", async () => {
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/Invoice_1.pdf?${urlParts[1]}`;

    const poller = await client.beginExtractLayout(url, testPollingOptions);
    const { pages } = await poller.pollUntilDone();

    assert.ok(pages && pages.length > 0, `Expected non-empty pages but got ${pages}`);
  });

  it("recognizes receipt from a url", async () => {
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/contoso-allinone.jpg?${urlParts[1]}`;

    const poller = await client.beginAnalyzeDocuments(
      PrebuiltModels.Receipt,
      url,
      testPollingOptions
    );
    const { documents: receipts } = await poller.pollUntilDone();

    assert.ok(receipts && receipts.length > 0, `Expect no-empty pages but got ${receipts}`);
    const receipt = receipts![0];
    assert.equal(receipt.docType, "prebuilt:receipt");
  });
}).timeout(60000);
