// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { DocumentAnalysisClient, PrebuiltModels } from "../../../src";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecordedClient, testPollingOptions } from "../../utils/recordedClients";

describe("analysis (browser)", () => {
  let client: DocumentAnalysisClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    ({ recorder, client } = await createRecordedClient(
      this.currentTest,
      DocumentAnalysisClient,
      true
    ));
  });

  afterEach(async function () {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("recognizes content from a url", async () => {
    const testingContainerUrl: string = assertEnvironmentVariable(
      "FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL"
    );
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/Invoice_1.pdf?${urlParts[1]}`;

    const poller = await client.beginExtractLayout(url, testPollingOptions);
    const { pages } = await poller.pollUntilDone();

    assert.ok(pages && pages.length > 0, `Expected non-empty pages but got ${pages}`);
  });

  it("recognizes receipt from a url", async () => {
    const testingContainerUrl: string = assertEnvironmentVariable(
      "FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL"
    );
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/contoso-allinone.jpg?${urlParts[1]}`;

    const poller = await client.beginAnalyzeDocument(
      PrebuiltModels.Receipt,
      url,
      testPollingOptions
    );
    const { documents: receipts } = await poller.pollUntilDone();

    assert.ok(
      receipts && receipts.length > 0,
      `Expected at least one receipt, but got ${receipts}`
    );
    const receipt = receipts![0];
    assert.equal(receipt.docType, "receipt.retailMeal");
  });
}).timeout(60000);
