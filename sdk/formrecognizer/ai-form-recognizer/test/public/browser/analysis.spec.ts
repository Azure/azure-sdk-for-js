// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DocumentAnalysisClient } from "../../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecordedClient, testPollingOptions } from "../../utils/recordedClients.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("analysis (browser)", { timeout: 60000 }, () => {
  let client: DocumentAnalysisClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    ({ recorder, client } = await createRecordedClient(ctx, DocumentAnalysisClient, true));
  });

  afterEach(async () => {
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
});
