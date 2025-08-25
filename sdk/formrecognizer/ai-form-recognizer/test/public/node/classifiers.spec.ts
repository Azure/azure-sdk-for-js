// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import {
  authMethods,
  createRecorder,
  getRandomNumber,
  makeCredential,
  testPollingOptions,
} from "../../utils/recordedClients.js";
import type { DocumentClassifierDetails } from "@azure/ai-form-recognizer";
import {
  DocumentModelAdministrationClient,
  DocumentAnalysisClient,
} from "@azure/ai-form-recognizer";
import path from "node:path";
import fs from "node:fs";
import { ASSET_PATH, makeTestUrl } from "../../utils/etc.js";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { getEndpoint, getTrainingContainerSasUrl } from "../../utils/injectables.js";

const containerSasUrl = (): string => getTrainingContainerSasUrl();

/*
 * Run the entire battery of tests using both AAD and API Key.
 *
 * Note: Neural builds are currently disabled, as they take prohibitively long to complete for the live testing
 * environment.
 */
describe.each(authMethods)(`[%s] document classifiers`, (authMethod) => {
  let recorder: Recorder;
  let client: DocumentAnalysisClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    await recorder.setMatcher("BodilessMatcher");
    client = new DocumentAnalysisClient(
      getEndpoint(),
      makeCredential(authMethod),
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  let _classifier: DocumentClassifierDetails;
  let _classifierId: string;

  const customClassifierDescription = "Custom classifier description";

  // We only want to create the model once, but because of the recorder's
  // precedence, we have to create it in a test, so one test will end up
  // recording the entire creation and the other tests will still be able
  // to use it.
  async function requireClassifier(): Promise<DocumentClassifierDetails> {
    if (!_classifier) {
      const trainingClient = new DocumentModelAdministrationClient(
        getEndpoint(),
        makeCredential(authMethod),
        recorder.configureClientOptions({}),
      );
      _classifierId = recorder.variable(
        "customClassifierId",
        `customClassifier${getRandomNumber()}`,
      );

      const poller = await trainingClient.beginBuildDocumentClassifier(
        _classifierId,
        {
          // TODO: use a different container for each test
          foo: {
            azureBlobSource: {
              containerUrl: containerSasUrl(),
            },
          },
          bar: {
            azureBlobSource: {
              containerUrl: containerSasUrl(),
            },
          },
        },
        { ...testPollingOptions, description: customClassifierDescription },
      );

      _classifier = await poller.pollUntilDone();

      assert.ok(_classifier.classifierId);
    }

    return _classifier;
  }

  it("build classifier", async () => {
    const classifier = await requireClassifier();

    assert.containsAllKeys(classifier.docTypes, ["foo", "bar"]);
    assert.equal(classifier.classifierId, _classifierId);
    assert.equal(classifier.description, customClassifierDescription);
  });

  it("analyze from PNG file stream", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
    const stream = fs.createReadStream(filePath);

    const { classifierId } = await requireClassifier();

    const poller = await client.beginClassifyDocument(classifierId, stream, testPollingOptions);

    const result = await poller.pollUntilDone();

    assert.isNotEmpty(result.documents);
    assert.oneOf(result.documents![0].docType, ["foo", "bar"]);

    // Additionally check that the pages aren't empty and that there are some common fields set
    assert.isNotEmpty(result.pages);
    assert.ok(result.pages![0].pageNumber);
    assert.isDefined(result.pages![0].angle);
    assert.ok(result.pages![0].height);
    assert.ok(result.pages![0].width);
    assert.ok(result.pages![0].unit);
  });

  it("analyze from PNG file URL", async () => {
    const url = makeTestUrl("/Invoice_1.pdf");

    const { classifierId } = await requireClassifier();

    const poller = await client.beginClassifyDocumentFromUrl(classifierId, url, testPollingOptions);

    const result = await poller.pollUntilDone();

    assert.oneOf(result.documents?.[0].docType, ["foo", "bar"]);
  });

  it("get & delete classifiers from the account", async () => {
    const trainingClient = new DocumentModelAdministrationClient(
      getEndpoint(),
      makeCredential(authMethod),
      recorder.configureClientOptions({}),
    );
    await trainingClient.getDocumentClassifier(_classifierId);

    // Delete the custom classifier we created
    if (_classifierId) {
      await trainingClient.deleteDocumentClassifier(_classifierId);
    }

    // Try to get the classifier and assert that it's gone
    await expect(
      (async function () {
        await trainingClient.getDocumentClassifier(_classifierId);
      })(),
    ).rejects.toThrow();
  });
});
