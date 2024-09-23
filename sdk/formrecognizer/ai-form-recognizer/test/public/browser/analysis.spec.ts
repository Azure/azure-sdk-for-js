// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { Context } from "mocha";

import { DocumentAnalysisClient } from "../../../src";
import { assertEnvironmentVariable, Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient, testPollingOptions } from "../../utils/recordedClients";

describe("analysis (browser)", () => {
  let client: DocumentAnalysisClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    ({ recorder, client } = await createRecordedClient(
      this.currentTest,
      DocumentAnalysisClient,
      true,
    ));
  });

  afterEach(async function () {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("recognizes receipt from a url", async () => {
    const testingContainerUrl: string = assertEnvironmentVariable(
      "FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL",
    );
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/contoso-allinone.jpg?${urlParts[1]}`;

    const poller = await client.beginAnalyzeDocumentFromUrl(
      "prebuilt-receipt",
      url,
      testPollingOptions,
    );
    const { documents: receipts } = await poller.pollUntilDone();

    assert.ok(
      receipts && receipts.length > 0,
      `Expected at least one receipt, but got ${receipts}`,
    );
    const receipt = receipts![0];
    assert.equal(receipt.docType, "receipt.retailMeal");
  });
}).timeout(60000);
