// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder, testPollingOptions } from "../utils/recorderUtils.js";
import DocumentIntelligence from "../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { ASSET_PATH, makeTestUrl } from "../utils/utils.js";
import type { AnalyzeOperationOutput, DocumentIntelligenceClient } from "../../../src/index.js";
import { getLongRunningPoller, isUnexpected } from "../../../src/index.js";
import path from "node:path";
import fs from "node:fs";
import { getEndpoint } from "../../utils/injectables.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { buildClassifier } from "../utils/buildClassifier.js";

describe("classifiers", () => {
  let recorder: Recorder;
  let client: DocumentIntelligenceClient;
  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    await recorder.setMatcher("BodilessMatcher");
    client = DocumentIntelligence(
      getEndpoint(),
      createTestCredential(),
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });
  it("build classifier", async () => {
    const classifier = await buildClassifier(client, recorder);

    assert.containsAllKeys(classifier.docTypes, ["foo", "bar"]);
  });

  it("analyze from PNG file stream", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
    const { classifierId } = await buildClassifier(client, recorder);
    const base64Source = fs.readFileSync(filePath, { encoding: "base64" });

    const initialResponse = await client
      .path("/documentClassifiers/{classifierId}:analyze", classifierId)
      .post({
        contentType: "application/json",
        body: {
          base64Source,
        },
      });

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
    const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

    assert.isNotEmpty(analyzeResult?.documents);
    assert.oneOf(analyzeResult?.documents![0].docType, ["foo", "bar"]);

    // Additionally check that the pages aren't empty and that there are some common fields set
    assert.isNotEmpty(analyzeResult?.pages);
    assert.ok(analyzeResult?.pages![0].pageNumber);
    assert.isDefined(analyzeResult?.pages![0].angle);
    assert.ok(analyzeResult?.pages![0].height);
    assert.ok(analyzeResult?.pages![0].width);
    assert.ok(analyzeResult?.pages![0].unit);
  });

  it("analyze from PNG file URL", async () => {
    const url = makeTestUrl("/Invoice_1.pdf");
    const { classifierId } = await buildClassifier(client, recorder);

    const initialResponse = await client
      .path("/documentClassifiers/{classifierId}:analyze", classifierId)
      .post({
        contentType: "application/json",
        body: {
          urlSource: url,
        },
      });

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    const response = await getLongRunningPoller(client, initialResponse, testPollingOptions);
    const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

    assert.isNotEmpty(analyzeResult?.documents);
    assert.oneOf(analyzeResult?.documents![0].docType, ["foo", "bar"]);
  });

  it("get & delete classifiers from the account", async () => {
    const { classifierId } = await buildClassifier(client, recorder);
    await client.path("/documentClassifiers/{classifierId}", classifierId).get();

    // Delete the custom classifier we created
    if (classifierId) {
      await client.path("/documentClassifiers/{classifierId}", classifierId).delete();
    }

    // Try to get the classifier and assert that it's gone
    try {
      await client.path("/documentClassifiers/{classifierId}", classifierId).get();
      assert.fail("Expected error while accessing a deleted classifier");
    } catch (error: any) {
      assert.ok(error);
    }
  });
});
